import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: number;
      };
    }
  }
}

interface DecodedToken {
  userId: number;
}

export const protectRoute = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  const token = authHeader.split(" ")[1] as string;

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as unknown as DecodedToken;

    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
