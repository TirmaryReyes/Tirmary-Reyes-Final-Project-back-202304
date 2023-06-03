import { type NextFunction, type Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  type UserCredentialsStructure,
  type UserCredentialsRequest,
  type UserCredentials,
} from "../../types.js";
import { loginUser } from "./userController.js";
import User from "../../../database/models/User";
import { Types } from "mongoose";
import CustomError from "../../../CustomError/CustomError";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a loginUser controller", () => {
  const userCredentials: UserCredentials = {
    username: "admin",
    password: "admin",
  };

  const req: Partial<UserCredentialsRequest> = {
    body: userCredentials,
  };

  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const mockToken = "token";

  jwt.sign = jest.fn().mockReturnValue(mockToken);
  const next = jest.fn();

  describe("When it receives a valid username and password in the request", () => {
    const mockedUser: UserCredentialsStructure = {
      _id: new Types.ObjectId().toString(),
      username: "admin",
      password: "admin",
    };

    User.findOne = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockedUser),
    });

    bcrypt.compare = jest.fn().mockResolvedValue(true);

    test("Then it should send a response with status code 200 and a token", async () => {
      const expectedStatus = 200;

      await loginUser(
        req as UserCredentialsRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the response's json method with the token", async () => {
      await loginUser(
        req as UserCredentialsRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({ token: mockToken });
    });
  });

  describe("When it receives a request with wrong credentials", () => {
    test("then it should call the received next function with a 401 status code and a 'Wrong credentials' message", async () => {
      const error = new CustomError(401, "Wrong credentials");

      User.findOne = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(undefined),
      });

      bcrypt.compare = jest.fn().mockResolvedValue(false);

      await loginUser(
        req as UserCredentialsRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
