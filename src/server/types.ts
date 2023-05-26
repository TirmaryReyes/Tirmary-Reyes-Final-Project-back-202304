import { type Request } from "express";
export interface UserCredentials {
  username: string;
  password: string;
}

export type UserCredentialsStructure = {
  _id: string;
} & UserCredentials;

export type CustomRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  UserCredentials
>;
