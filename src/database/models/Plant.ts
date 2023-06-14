import { Schema, Types, model } from "mongoose";
import User from "./User.js";

const plantSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  hasFlowers: {
    type: Boolean,
    required: true,
  },
  environment: {
    type: String,
    required: true,
  },
  user: {
    type: Types.ObjectId,
    ref: User,
  },
});

const Plant = model("Plant", plantSchema, "plants");

export default Plant;
