import { Router } from "express";
import { loginUser } from "../../controllers/user/userController.js";
import paths from "../../utils/paths.js";
import loginValidation from "../../../schemas/loginSchema.js";

const userRouters = Router();

userRouters.post(paths.login, loginValidation, loginUser);

export default userRouters;
