import express from "express";
import cors from "cors";
import morgan from "morgan";

export const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS;

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(options));

app.disable("x-powered-by");

app.use(morgan("dev"));

app.use(express.json());
