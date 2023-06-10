import { Router } from "express";
import {
  addPlants,
  deletePlant,
  getPlants,
} from "../../../controllers/plant/plantsController.js";
import { validate } from "express-validation";
import { createPlantSchema } from "../../../utils/schemas/plantSchema.js";
import { auth } from "../../../middlewares/authMiddleware/authMiddleware.js";

const plantsRouter = Router();

plantsRouter.get("/", getPlants);
plantsRouter.delete("/:idPlant", deletePlant);
plantsRouter.post(
  "/add",
  auth,
  validate(createPlantSchema, {}, { abortEarly: false }),
  addPlants
);

export default plantsRouter;
