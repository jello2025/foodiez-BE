import { Request, Response, NextFunction } from "express";
import User from "../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../../config/env";
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      next({
        status: 400,
        message: "missing creds",
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      username,
    });

    const payload = { userId: newUser._id, email: email, username: username };
    const secret = env.JWT_SECRET;
    const options = { expiresIn: env.JWT_EXP } as jwt.SignOptions;
    const token = jwt.sign(payload, secret as string, options);

    res.status(201).json({
      username: username,
      email: email,
      password: hashedPassword,
      token: token,
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      next({
        status: 400,
        message: "missing creds",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return next({
        status: 404,
        message: "couldnt find user",
      });
    }

    const isMatch = await bcrypt.compare(password, user?.password as string);

    if (!isMatch) {
      next({
        status: 400,
        message: "invalid creds",
      });
    }

    const payload = { userId: user._id, email: email, username: username };
    const secret = env.JWT_SECRET;
    const options = { expiresIn: env.JWT_EXP } as jwt.SignOptions;
    const token = jwt.sign(payload, secret as string, options);
    res.status(200).json({
      token: token,
    });
  } catch (err) {
    next(err);
  }
};
