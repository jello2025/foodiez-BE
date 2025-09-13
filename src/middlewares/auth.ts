import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

interface AuthRequest extends Request {
  userId?: string;
}

export function authorize(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: "No token provided" });

  const [scheme, token] = header.split(" ");
  if (scheme !== "Bearer" || !token)
    return res.status(401).json({ message: "Invalid auth format" });

  try {
    const payload = jwt.verify(token, env.JWT_SECRET!) as { id: string };
    req.userId = payload.id; // attach userId to request
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
