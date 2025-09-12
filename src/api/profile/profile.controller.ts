import { Request, Response, NextFunction } from "express";
import User from "../../models/User";

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
