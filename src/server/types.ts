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

export type CustomRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  UserCredentials
>;
