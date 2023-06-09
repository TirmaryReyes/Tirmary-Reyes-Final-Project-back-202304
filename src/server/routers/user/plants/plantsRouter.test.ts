import "../../../../loadEnvironment.js";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import connectToDataBase from "../../../../database/connectToDatabase.js";
import mongoose from "mongoose";
import Plant from "../../../../database/models/Plant.js";
import { app } from "../../../app.js";
import paths from "../../../utils/paths.js";
import { tokenMock } from "../../../../mocks/userMocks.js";
import { plantsMocks } from "../../../../mocks/plantsMocks.js";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectToDataBase(server.getUri());
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

afterEach(async () => {
  await Plant.deleteMany();
});

describe("Given a GET '/plants' endpoint", () => {
  beforeEach(async () => {
    await Plant.create(plantsMocks);
  });

  describe("When it receives a request with a valid token", () => {
    test("The it should return a status code 200, along with a collection of plants", async () => {
      const expectedStatusCode = 200;

      const response = await request(app)
        .get(paths.plants)
        .set("Authorization", `Bearer ${tokenMock}`)
        .expect(expectedStatusCode);

      expect(response.body.plants).toHaveLength(2);
    });
  });
});

describe("Given a DELETE '/:id endpoint'", () => {
  beforeEach(async () => {
    await Plant.create(plantsMocks);
  });

  describe("When it receives a valid id is included in the request", () => {
    test("Then it should respond with the method's status code set to '200' and the method's JSON containing the message 'Plant removed'", async () => {
      const expectedStatusCode = 200;
      const expectedMessage = "Plant removed";

      const plant = await Plant.find().exec();
      const response = await request(app)
        .delete(`/plants/${plant[0]._id.toString()}`)
        .set("Authorization", `Bearer ${tokenMock}`)
        .expect(expectedStatusCode);

      expect(response.body.message).toBe(expectedMessage);
    });
  });
});
