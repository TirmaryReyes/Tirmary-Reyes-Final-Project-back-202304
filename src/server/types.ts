import { type Request } from "express";
import { type Types } from "mongoose";
export interface UserCredentials {
  username: string;
  password: string;
}

export type UserCredentialsStructure = {
  _id: string;
} & UserCredentials;

export interface UserDbStructure extends UserCredentials {
  _id: Types.ObjectId;
}

export type UserCredentialsRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  UserCredentials
>;

export interface PlantStateStructure {
  _id: Types.ObjectId;
  name: string;
  image: string;
  type: string;
  size: string;
  hasFlowers: boolean;
  environment: string;
  user: Types.ObjectId;
  description: string;
}

export interface CustomRequest extends Request {
  userId: string;
}
