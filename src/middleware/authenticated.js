import { verify, decode } from "jsonwebtoken";

export default async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send("Access token nao informado");
  }

  const [, accessToken] = token.split(" ");

  try {
    verify(accessToken, process.env.JSON_SECRET);

    const { id, email } = await decode(accessToken);

    req.userId = id;
    req.userEmail = email;

    return next();
  } catch (error) {
    res.status(401).send("Usuario não autorizado");
  }
};
