import { type NextFunction, type Response } from "express";
import Plant from "../../../../database/models/Plant.js";
import { plantsMocks } from "../../../../mocks/plantsMocks.js";
import { type CustomRequest } from "../../../types";
import { getPlant } from "../plantsController.js";
import CustomError from "../../../../CustomError/CustomError.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a getPlant controller", () => {
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

  describe("When it receives a request with the a valid plant id", () => {
    Plant.findById = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(plantsMocks[0]),
    });

    test("Then it should call the response status method with status code 200", async () => {
      const expectedStatus = 200;

      await getPlant(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the response method json with a list of one plant", async () => {
      const expectPlant = plantsMocks[0];

      await getPlant(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({ plant: expectPlant });
    });
  });

  describe("When it receives a request with a invalid plant id", () => {
    test("Then it should call the next function with the error 404 and the message 'Plant not found'", async () => {
      const expectedStatus = 404;
      const expectedMessage = "Plant not found";

      const expectedCustomError = new CustomError(
        expectedStatus,
        expectedMessage
      );

      Plant.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await getPlant(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(expectedCustomError);
    });
  });
});
