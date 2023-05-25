import { type NextFunction, type Response, type Request } from "express";
import CustomError from "../../../CustomError/CustomError.js";

const notFoundError = (req: Request, resp: Response, next: NextFunction) => {
  const error = new CustomError(404, "Endpoint not found");

  next(error);
};

export default notFoundError;
