import { type NextFunction, type Response, type Request } from "express";
import CustomError from "../../../CustomError/CustomError.js";
import notFoundError from "./notFoundErrorMiddleware.js";

type CustomResponse = Pick<Response, "status" | "json">;

const res: CustomResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const req = {};
const next = jest.fn();

describe("Given a notFoundError middleware", () => {
  describe("When it's called", () => {
    test("Then it should call the next function, with a status code 404 and a 'EndPoint not found' message", () => {
      const customError = new CustomError(404, "Endpoint not found");

      notFoundError(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(customError);
    });
  });
});
