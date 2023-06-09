import { Router } from "express";
import { auth } from "../../../middlewares/authMiddleware/authMiddleware";
import {
  deletePlant,
  getPlants,
} from "../../../controllers/plant/plantsController";

const plantsRouter = Router();

plantsRouter.get("/", getPlants);
plantsRouter.delete("/:idPlant", auth, deletePlant);

export default plantsRouter;
