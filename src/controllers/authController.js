import AuthService from "../services/authService.js";

const auth = new AuthService();

class AuthController {
  static async login(req, res) {
    const { email, password } = req.body;
    console.log("Recebendo login:", email);

    try {
      const login = await auth.login({ email, password });
      res.status(200).send(login);
    } catch (error) {
      console.error("Erro na autenticação:", error.message);
      res.status(401).json({ message: error.message });
    }
  }
}

export default AuthController;
