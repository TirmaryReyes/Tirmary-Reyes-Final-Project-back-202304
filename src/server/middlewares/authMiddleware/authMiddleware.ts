import { type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";
import CustomError from "../../../CustomError/CustomError.js";
import { type CustomRequest } from "../../types.js";

export const auth = (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.header("Authorization");

    if (!authorizationHeader?.includes("Bearer")) {
      const error = new CustomError(401, "Missing token");

      throw error;
    }

    const token = authorizationHeader.replace("Bearer ", "");

    const payload = jwt.verify(token, process.env.JWT_SECRET!);

    const userId = payload.sub as string;

    req.userId = userId;

    next();
  } catch (error: unknown) {
    const customError =
      (error as Error).name === "JsonWebTokenError"
        ? new CustomError(401, "Invalid token")
        : error;
    next(customError);
  }
};
