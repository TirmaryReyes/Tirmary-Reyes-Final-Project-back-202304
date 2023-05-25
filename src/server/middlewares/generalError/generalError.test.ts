import { type NextFunction, type Response, type Request } from "express";
import generalError from "./generalError.js";
import CustomError from "../../../CustomError/CustomError.js";

beforeEach(() => {
  jest.clearAllMocks();
});

type CustomResponse = Pick<Response, "status" | "json">;

const res: CustomResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const req = {};
const next = jest.fn();

describe("Given a generalErrorMiddleware middleware", () => {
  describe("When it is called and receives an unknow error", () => {
    test("Then it should response with an statusCode 500 and a 'General Error' messsage", () => {
      const error = new Error();
      const statusCode = 500;
      const expectedMessage = "General Error";

      generalError(
        error as CustomError,
        req as Request,
        res as Response,
        next as NextFunction
      );
      expect(res.status).toHaveBeenCalledWith(statusCode);
      expect(res.json).toHaveBeenCalledWith({ message: expectedMessage });
    });

    describe("When it receives an error with a 404 status code and the message 'Endpoint not found'", () => {
      test("Then it should call a response with the status code 404 and the message 'Endpoint not found'", () => {
        const error = new CustomError(404, "Endpoint not found");
        const expectedStatusCode = 404;
        const message = "Endpoint not found";

        generalError(
          error,
          req as Request,
          res as Response,
          next as NextFunction
        );

        expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
        expect(res.json).toHaveBeenCalledWith({ message });
      });
    });
  });
});
