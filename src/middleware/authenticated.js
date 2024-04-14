import { verify, decode } from "jsonwebtoken";
import psw from "../config/jsonSecret.js";

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send("Access token nao informado");
  }

  const [, accessToken] = token.split(" ");

  try {
    verify(accessToken, pwd.secret);

    const { id, email } = await decode(accessToken);

    req.usuarioId = id;
    req.usuarioEmail = email;

    return next();
  } catch (error) {
    res.status(401).send("Usuario não autorizado");
  }
};
