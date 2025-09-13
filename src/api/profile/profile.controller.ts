import { Request, Response, NextFunction } from "express";
import User from "../../models/User";

interface AuthRequest extends Request {
  userId?: string;
}

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { profileId } = req.params;
  try {
    const foundProfile = await User.findById(profileId);
    if (foundProfile) {
      return res.status(200).json(foundProfile);
    } else {
      return next({
        status: 404,
        message: "user not found",
      });
    }
  } catch (err) {
    next(err);
  }
};

export const getMe = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
