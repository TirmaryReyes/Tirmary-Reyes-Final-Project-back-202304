import express from "express";
import cors from "cors";
import morgan from "morgan";
import notFoundError from "./middlewares/notFoundErrorMiddleware/notFoundErrorMiddleware.js";
import generalError from "./middlewares/generalError/generalError.js";
import pingController from "./controllers/pingController/pingController.js";
import path from "./paths/paths.js";

export const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS;

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(options));

app.disable("x-powered-by");

app.use(morgan("dev"));

app.use(express.json());

app.get(path.pingController, pingController);

app.use(notFoundError);

app.use(generalError);
