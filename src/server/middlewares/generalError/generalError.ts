import createDebug from "debug";
import type CustomError from "../../../CustomError/CustomError.js";
import { type NextFunction, type Request, type Response } from "express";
import chalk from "chalk";

const debug = createDebug("sandRose-api:server:middlewares:errorMiddlewares");

const generalError = (
  error: CustomError,
  req: Request,
  res: Response,
  _nex: NextFunction
) => {
  debug(`Error: ${chalk.red(error.statusCode)}`);

  const statusCode = error.statusCode || 500;

  const message = error.statusCode ? error.message : "General Error";
  res.status(statusCode).json({ message });
};

export default generalError;
