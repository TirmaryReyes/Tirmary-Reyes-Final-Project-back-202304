import jwt from "jsonwebtoken";
import { type Response, type Request, type NextFunction } from "express";
import { type CustomRequest } from "../../types";
import { auth } from "./authMiddleware";
import CustomError from "../../../CustomError/CustomError.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a authMiddleware middleware", () => {
  const mockToken = "token";
  const req: Pick<Request, "header"> = {
    header: jest.fn().mockReturnValue(`Bearer ${mockToken}`),
  };
  const res = {};
  const next = jest.fn();

  describe("When it receives an Authorization header with a valid token and a next function", () => {
    test("Then it should call the next function", () => {
      jwt.verify = jest.fn().mockReturnValue(`Bearer ${mockToken}`);
      auth(req as CustomRequest, res as Response, next as NextFunction);
      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it receives an Authorization header with an Missing token and a next function", () => {
    test("Then it should call the next function with a 'Missing token' error message", () => {
      const req: Pick<Request, "header"> = {
        header: jest.fn().mockReturnValue(mockToken),
      };
      const expectedError = new CustomError(401, "Missing token");
      auth(req as CustomRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it receives an Authorization header with an invalid token and a next function", () => {
    test("Then it should call the next function with a 'Invalid token' error message", () => {
      const expectedError = new CustomError(401, "Invalid token");

      expectedError.name = "JsonWebTokenError";

      jwt.verify = jest.fn().mockImplementation(() => {
        throw expectedError;
      });

      auth(req as CustomRequest, res as Response, next);
      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
