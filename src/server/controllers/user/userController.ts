import bcrypt from "bcryptjs";
import jwt, { type JwtPayload } from "jsonwebtoken";
import User from "../../../database/models/User.js";
import { type CustomRequest } from "../../types";
import CustomError from "../../../CustomError/CustomError.js";
import { type NextFunction, type Response } from "express";

export const loginUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, username } = req.body;

    const user = await User.findOne({ username }).exec();

    if (!user || !(await bcrypt.compare(password, user.password))) {
      const error = new CustomError(401, "Wrong credentials");
      throw error;
    }

    const tokenPayload: JwtPayload = {
      sub: user._id.toString(),
      name: username,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!);

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
