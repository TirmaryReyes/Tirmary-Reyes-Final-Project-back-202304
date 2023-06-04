import "../../../loadEnvironment.js";
import createDebug from "debug";
import { type NextFunction, type Request, type Response } from "express";
import Plant from "../../../database/models/Plant.js";

const debug = createDebug(
  "sandRose-api:server:controllers:plant:plantsController.js"
);

const getPlants = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const plants = await Plant.find().limit(10).exec();
    res.status(200).json({ plants });
  } catch (error) {
    error.message = "Database error connection";
    debug(error);
    next(error);
  }
};

export default getPlants;
