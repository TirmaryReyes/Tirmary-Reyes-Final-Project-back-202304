import { type NextFunction, type Response } from "express";
import Plant from "../../../database/models/Plant.js";
import getPlants from "./plantsController.js";
import { type CustomRequest } from "../../types.js";
import { plantMock } from "../../../mocks/plantsMocks.js";

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
      exec: jest.fn().mockResolvedValue(plantMock),
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
});
