import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as db from "../db/queries.js";
import { generateRefreshToken } from "../utils/generateRefreshToken.js";
import { asyncHandler } from "../utils/asyncHandler.js";

type SignupBody = {
  email: string;
  name?: string;
};

type LoginBody = {
  email: string;
};

export const postSignup = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
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

    res.status(201).json({ user: createdUser });
  },
);

export const postLogin = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
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

    await db.storeRefreshToken(user.id, refreshToken, expiresAt);

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/api/auth", // subject to change
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ accessToken });
  },
);

export const postRefresh = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const refreshToken = req.cookies.refresh_token;

    if (!refreshToken) {
      res.status(401).json({ message: "Refresh token missing" });
      return;
    }

    const oldRefreshToken = await db.findToken(refreshToken);

    if (!oldRefreshToken || oldRefreshToken.expiresAt < new Date()) {
      if (oldRefreshToken) await db.deleteRefreshToken(oldRefreshToken.token);
      res.status(401).json({ message: "Invalid or expired refresh token" });
      return;
    }

    if (oldRefreshToken.revokedAt) {
      await db.revokeAllUserRefreshToken(oldRefreshToken.userId);

      res.clearCookie("refresh_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/api/auth", // subject to change
      });

      res.status(401).json({ message: "Suspicious activity detected" });
      return;
    }

    await db.revokeRefreshToken(oldRefreshToken.token);

    const newAccessToken = jwt.sign(
      { userId: oldRefreshToken.userId },
      process.env.JWT_SECRET as string,
      { expiresIn: "15m" },
    );

    const newRefreshToken = generateRefreshToken();
    const newExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await db.storeRefreshToken(
      oldRefreshToken.userId,
      newRefreshToken,
      newExpiresAt,
    );

    res.cookie("refresh_token", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/api/auth",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ accessToken: newAccessToken });
  },
);

export const deleteLogout = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const refreshToken = req.cookies.refresh_token;

    if (refreshToken) {
      await db.deleteRefreshToken(refreshToken);
    }

    res.clearCookie("refresh_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/api/auth", // subject to change
    });

    res.status(200).json({ message: "success" });
  },
);
