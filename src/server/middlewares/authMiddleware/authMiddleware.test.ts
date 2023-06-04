import { type Response, type Request, type NextFunction } from "express";
import { type CustomRequest } from "../../types";
import { auth } from "./authMiddleware";

describe("Given a authMiddleware middleware", () => {
  describe("When it receives an Authorization header with a valid token and a next function", () => {
    test("Then it should call hte next function", () => {
      const token = "token";

      const req: Pick<Request, "header"> = {
        header: jest.fn().mockReturnValue(`Bearer ${token}`),
      };

      const res = {};
      const next = jest.fn();
      auth(req as CustomRequest, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalled();
    });
  });
});
