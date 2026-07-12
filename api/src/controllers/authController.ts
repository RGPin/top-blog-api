import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as db from "../db/queries.js";
import { generateRefreshToken } from "../lib/generateRefreshToken.js";

type SignupBody = {
  email: string;
  name?: string;
};

type LoginBody = {
  email: string;
};

const postSignup = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as SignupBody;
    const name = body.name?.trim() || undefined;
    const email = body.email?.trim();

    if (!email) {
      res.status(400).json({ message: "Email is required" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ message: "Invalid email format" });
      return;
    }

    const existingUser = await db.findUserByEmail(email);

    if (existingUser) {
      res.status(400).json({ message: "User with this email already exists." });
      return;
    }

    const createdUser = await db.createUser(email, name);

    res.status(201).json({
      message: "success",
      user: createdUser,
    });
  } catch (error) {
    console.error("postSignup failed: ", { error });
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const postLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as LoginBody;
    const email = body.email?.trim();

    if (!email) {
      res.status(400).json({ message: "Email is required" });
      return;
    }

    const user = await db.findUserByEmail(email);

    if (!user) {
      res.status(400).json({ message: "Invalid email" });
      return;
    }

    const accessToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "15m" },
    );

    const refreshToken = generateRefreshToken();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const storedToken = await db.storeRefreshToken(
      user.id,
      refreshToken,
      expiresAt,
    );

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/api/auth/refresh", // subject to change
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "success",
      accessToken,
      user,
    });
  } catch (error) {
    console.error("postLogin failed: ", { error });
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const postRefresh = async (req: Request, res: Response): Promise<void> => {
  try {
    const refreshToken = req.cookies.refresh_token;

    if (!refreshToken) {
      res.status(401).json({ message: "Refresh token missing" });
      return;
    }

    const storedToken = await db.findToken(refreshToken);

    if (!storedToken || storedToken.expiresAt < new Date()) {
      if (storedToken) await db.deleteRefreshToken(storedToken.id);

      res.status(401).json({ message: "Invalid or expired refresh token" });
      return;
    }

    const newAccessToken = jwt.sign(
      { userId: storedToken.userId },
      process.env.JWT_SECRET as string,
      { expiresIn: "15m" },
    );

    res.status(200).json({
      message: "success",
      accessToken: newAccessToken,
    });
  } catch (error) {
    console.error("postRefresh failed: ", { error });
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteLogout = async (req: Request, res: Response): Promise<void> => {
  try {
    const refreshToken = req.cookies.refresh_token;

    if (refreshToken) {
      await db.deleteRefreshToken(refreshToken);
    }

    res.clearCookie("refresh_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/api/auth/refresh", // subject to change
    });

    res.status(200).json({ message: "success" });
  } catch (error) {
    console.error("deleteLogout failed: ", { error });
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { postSignup, postLogin, deleteLogout, postRefresh };
