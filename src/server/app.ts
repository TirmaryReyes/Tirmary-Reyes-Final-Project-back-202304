import "../loadEnvironment.js";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import notFoundError from "./middlewares/notFoundErrorMiddleware/notFoundErrorMiddleware.js";
import generalError from "./middlewares/generalError/generalError.js";
import pingController from "./controllers/ping/pingController.js";
import paths from "./utils/paths.js";
import userRouters from "./routers/user/userRouters.js";
import plantsRouter from "./routers/plants/plantsRouter.js";

export const app = express();

const allowedOrigins = [
  process.env.ALLOWED_ORIGINS_DEV!,
  process.env.ALLOWED_ORIGINS_PROD!,
];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(options));

app.disable("x-powered-by");

app.use(morgan("dev"));

app.use(express.json());

app.get(paths.ping, pingController);

app.use(paths.user, userRouters);

app.use(paths.plants, plantsRouter);

app.use(notFoundError);

app.use(generalError);
