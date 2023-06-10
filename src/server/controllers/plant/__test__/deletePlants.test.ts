import { type NextFunction, type Response } from "express";
import Plant from "../../../../database/models/Plant.js";
import { plantsMocks } from "../../../../mocks/plantsMocks.js";
import { type CustomRequest } from "../../../types";
import { deletePlant } from "../plantsController.js";
import CustomError from "../../../../CustomError/CustomError.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a deletePlant controller", () => {
  const next = jest.fn();

  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const req: Partial<CustomRequest> = {
    params: {
      idPlant: plantsMocks[0]._id.toString(),
    },
  };

  describe("When it receives a request with a valid plant id", () => {
    test("Then it should call the response method status with code 200", async () => {
      const expectedStatus = 200;

      Plant.findByIdAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(plantsMocks[0]),
      });

      await deletePlant(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });

  describe("When it receives a request with an invalid plant id", () => {
    test("Then it should call the next function with the message 'Plant not found'", async () => {
      const req: Partial<CustomRequest> = {
        params: { idPlant: "5" },
      };

      const error = new CustomError(404, "Plant not found");

      Plant.findByIdAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await deletePlant(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
