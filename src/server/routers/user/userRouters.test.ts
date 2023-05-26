import "../../../loadEnvironment.js";
import { MongoMemoryServer } from "mongodb-memory-server";
import jwt from "jsonwebtoken";
import request from "supertest";
import mongoose from "mongoose";
import connectToDataBase from "../../../database/connectToDatabase";
import { type UserDbStructure, type UserCredentials } from "../../types";
import { app } from "../../app";
import User from "../../../database/models/User.js";
import paths from "../../utils/paths.js";

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
  await User.deleteMany();
});

const mockUser: UserCredentials = {
  username: "pedro",
  password: "pedro",
};

const mockUserHashed: UserCredentials = {
  username: "pedro",
  password: "$2y$10$iEWfJjSdn7FdK7w24ASOweMUCAQ3sDFgRlZQGtxV00I7Ss2yLVRku",
};

describe("Given a POST '/user/login endpoint'", () => {
  describe("When it receives a request with a username 'pedro' and a password 'pedro'", () => {
    let newUser: UserDbStructure;

    beforeAll(async () => {
      newUser = await User.create(mockUserHashed);
    });

    test("Then it should response with a status 200 and a token", async () => {
      const expectedStatus = 200;

      const response: { body: { token: string } } = await request(app)
        .post(`${paths.user}${paths.login}`)
        .send(mockUser)
        .expect(expectedStatus);

      const payload = jwt.verify(response.body.token, process.env.JWT_SECRET!);
      const userId = payload.sub as string;

      expect(userId).toBe(newUser._id.toString());
    });
  });
});
