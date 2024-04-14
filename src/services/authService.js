import { user } from "../models/User.js";
import pkg from "bcryptjs";
const { compare } = pkg;
import sla from "jsonwebtoken";
const { sign } = sla;
import psw from "../config/jsonSecret.js";

class AuthService {
  async login(dto) {
    const userMain = await user.findOne({
      attributes: ["id", "email", "password"],
      where: {
        email: dto.email,
      },
    });

    if (!userMain) {
      throw new Error("user não cadastrado");
    }

    const samePwd = await compare(dto.password, userMain.password);

    if (!samePwd) {
      throw new Error("user ou senha invalido");
    }

    const accessToken = sign(
      {
        id: userMain.id,
        email: userMain.email,
      },
      pwd.secret,
      {
        expiresIn: 86400,
      }
    );

    return { accessToken };
  }
}

export default AuthService;
