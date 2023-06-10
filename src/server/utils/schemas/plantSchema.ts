import { Joi } from "express-validation";
import { type PlantStructure } from "../../types";

export const createPlantSchema = {
  body: Joi.object<PlantStructure>({
    name: Joi.string().required(),
    image: Joi.string().required(),
    type: Joi.string().required(),
    size: Joi.string().required(),
    hasFlowers: Joi.string().required(),
    environment: Joi.string().required(),
    description: Joi.string().required(),
  }),
};
