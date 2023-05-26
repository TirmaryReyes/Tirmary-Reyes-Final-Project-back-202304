import { type Request } from "express";
export interface UserCredentials {
  name: string;
  username: string;
  password: string;
}

export interface UserCredentialsStructure extends UserCredentials {
  _id: string;
}

export type CustomRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  UserCredentials
>;
