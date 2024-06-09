import { user } from "../models/User.js";
import sla from "jsonwebtoken";
const { sign } = sla;
import bcrypt from "bcryptjs";

class AuthService {
  async login(dto) {
    const usuarios = await user.find({
      email: dto.email,
    });

    if (usuarios.length === 0) {
      throw new Error("Usuário não cadastrado" + usuarios);
    }

    const usuario = usuarios[0];

    const samePwd = await bcrypt.compare(dto.password, usuario.password);

    if (dto.password == usuario.password) {
      console.log("tá certo");
    }

    if (!samePwd) {
      throw new Error(+" Usuário ou senha inválidos");
    }

    const accessToken = sign(
      {
        id: usuario.id,
        email: usuario.email,
      },
      process.env.JSON_SECRET,
      {
        expiresIn: 86400,
      }
    );

    return { accessToken };
  }
}

export default AuthService;
