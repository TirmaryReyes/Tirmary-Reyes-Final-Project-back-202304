import { Joi, validate } from "express-validation";
import { type UserCredentials } from "../server/types";

const loginSchema = {
  body: Joi.object<UserCredentials>({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const loginValidation = validate(loginSchema, {}, { abortEarly: false });

export default loginValidation;
