import { user } from "../models/User.js";
import jwt from "jsonwebtoken";
const { sign } = jwt;
import bcrypt from "bcryptjs";

class AuthService {
  async login(dto) {
    console.log("Iniciando processo de login para:", dto.email);

    const usuarios = await user.find({ email: dto.email });
    console.log("Usuários encontrados:", usuarios);

    if (usuarios.length === 0) {
      throw new Error("Usuário não cadastrado");
    }

    const usuario = usuarios[0];
    console.log("Usuário encontrado:", usuario);

    const samePwd = await bcrypt.compare(dto.password, usuario.password);
    console.log("Comparação de senha:", samePwd);

    if (!samePwd) {
      throw new Error("Usuário ou senha inválidos");
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

    console.log("Token gerado:", accessToken);

    return {
      token: accessToken,
      user: {
        id: usuario.id,
        user_name: usuario.user_name,
        email: usuario.email,
        user_img: usuario.user_img,
      },
    };
  }
}

export default AuthService;
