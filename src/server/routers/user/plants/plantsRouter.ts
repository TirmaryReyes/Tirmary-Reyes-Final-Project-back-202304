import { Router } from "express";
import {
  addPlants,
  deletePlant,
  getPlants,
} from "../../../controllers/plant/plantsController.js";
import { validate } from "express-validation";
import { createPlantSchema } from "../../../utils/schemas/plantSchema.js";

const plantsRouter = Router();

plantsRouter.get("/", getPlants);
plantsRouter.delete("/:idPlant", deletePlant);
plantsRouter.post(
  "/add",
  validate(createPlantSchema, {}, { abortEarly: false }),
  addPlants
);

export default plantsRouter;
