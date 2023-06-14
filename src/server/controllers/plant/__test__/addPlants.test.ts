import { type Response, type NextFunction } from "express";
import Plant from "../../../../database/models/Plant.js";
import { plantAddedMock } from "../../../../mocks/plantsMocks.js";
import { type CustomRequest } from "../../../types";
import { addPlants } from "../plantsController.js";
import CustomError from "../../../../CustomError/CustomError.js";

describe("Given a addPlant controller", () => {
  const next = jest.fn();

  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const req: Partial<CustomRequest> = {
    userId: "647083660ca1f98975830b0b",
    body: plantAddedMock,
  };

  describe("When it receives a request with a valid plant on the body, a response and a next function", () => {
    test("Then it should call the status response method with status code 201 and a json response with the plant added", async () => {
      const expectedStatus = 201;

      Plant.create = jest.fn().mockResolvedValue(plantAddedMock);

      await addPlants(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith({ plant: plantAddedMock });
    });

    describe("When it receives a request with a user id and a new plant but the process fails", () => {
      test("Then it should call the received next function with a custom error 400 with the message 'Plant could not be added'", async () => {
        const expectedStatus = 400;
        const expectedMessage = "Bad Request";

        const expectedCustomError = new CustomError(
          expectedStatus,
          expectedMessage
        );

        Plant.create = jest.fn().mockResolvedValue(undefined);

        await addPlants(
          req as CustomRequest,
          res as Response,
          next as NextFunction
        );

        expect(next).toHaveBeenCalledWith(expectedCustomError);
      });
    });
  });
});
