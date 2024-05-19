import request from "supertest";
import express from "express";
import routes from "../../routes/authRoute.js";
import AuthService from "../../services/authService.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { jest } from "@jest/globals";

// Mock the AuthService
jest.mock("../../services/authService.js");

const app = express();
app.use(express.json());
app.use("/api", routes);

describe("AuthController login", () => {
  let validUser;
  let validToken;

  beforeAll(async () => {
    validUser = {
      id: "1",
      email: "test@example.com",
      password: await bcrypt.hash("password123", 10),
    };

    validToken = jwt.sign(
      { id: validUser.id, email: validUser.email },
      process.env.JSON_SECRET || "default_secret",
      { expiresIn: 86400 }
    );

    AuthService.prototype.login = jest
      .fn()
      .mockImplementation(({ email, password }) => {
        if (
          email === validUser.email &&
          bcrypt.compareSync(password, validUser.password)
        ) {
          return { accessToken: validToken };
        } else {
          throw new Error("Usuário ou senha inválidos");
        }
      });
  });

  it("deve fazer login com sucesso e retornar um token", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: validUser.email, password: "password123" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("accessToken", validToken);
  });

  it("deve falhar ao fazer login com senha inválida", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: validUser.email, password: "wrongpassword" });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "Usuário ou senha inválidos"
    );
  });

  it("deve falhar ao fazer login com email não cadastrado", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "notregistered@example.com", password: "password123" });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "Usuário ou senha inválidos"
    );
  });
});
