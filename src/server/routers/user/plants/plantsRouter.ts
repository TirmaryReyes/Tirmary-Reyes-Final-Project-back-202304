import { Router } from "express";
import getPlants from "../../../controllers/plant/plantsController.js";

const plantsRouter = Router();

plantsRouter.get("/", getPlants);

export default plantsRouter;
