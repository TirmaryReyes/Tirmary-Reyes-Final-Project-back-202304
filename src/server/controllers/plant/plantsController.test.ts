import { type NextFunction, type Response, type Request } from "express";
import Plant from "../../../database/models/Plant.js";
import { type CustomRequest } from "../../types.js";
import { plantsMocks } from "../../../mocks/plantsMocks.js";
import { getPlants } from "./plantsController.js";

describe("Given a getPlant controller", () => {
  const req = {};
  const next = jest.fn();
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  describe("When it recevies a request with a userId and a response", () => {
    Plant.find = jest.fn().mockReturnValue({
      limit: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(plantsMocks),
    });

    test("Then it should call the response status method with '200'", async () => {
      const expectedStatus = 200;

      await getPlants(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });

  describe("When it receives a next fuction and a rejected error", () => {
    test("Then it should call that next function with that error", async () => {
      const expectedError = new Error("Database error connection");

      Plant.find = jest.fn().mockReturnValue({
        limit: jest.fn().mockReturnThis(),
        exec: jest.fn().mockRejectedValue(expectedError),
      });

      await getPlants(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
