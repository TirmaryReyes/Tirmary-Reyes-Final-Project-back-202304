import { Router } from "express";
import {
  deletePlant,
  getPlants,
} from "../../../controllers/plant/plantsController.js";
import { auth } from "../../../middlewares/authMiddleware/authMiddleware.js";

const plantsRouter = Router();

plantsRouter.get("/", getPlants);
plantsRouter.delete("/:idPlant", auth, deletePlant);

export default plantsRouter;
