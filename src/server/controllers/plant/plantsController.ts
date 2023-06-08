import "../../../loadEnvironment.js";
import createDebug from "debug";
import { type NextFunction, type Request, type Response } from "express";
import Plant from "../../../database/models/Plant.js";
import CustomError from "../../../CustomError/CustomError.js";
import { type CustomRequest } from "../../types.js";

const debug = createDebug(
  "sandRose-api:server:controllers:plant:plantsController.js"
);

export const getPlants = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const plants = await Plant.find().limit(10).exec();
    res.status(200).json({ plants });
  } catch (error) {
    error.message = "Database error connection";
    debug(error);
    next(error);
  }
};

export const deletePlant = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idPlant } = req.params;

    const plantRemoved = await Plant.findByIdAndDelete(idPlant).exec();

    if (!plantRemoved) {
      const error = new CustomError(404, "Plant not found");

      throw error;
    }

    res.status(200).json({ message: "Plant removed" });
  } catch (error: unknown) {
    next(error);
  }
};
