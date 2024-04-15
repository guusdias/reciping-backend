import { recipe } from "../models/Recipe.js";
import { user } from "../models/User.js";
import bcrypt from "bcryptjs";

class UserController {
  static async listingUsers(req, res) {
    try {
      const userList = await user.find({});
      res.status(200).json(userList);
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - falha na requisição` });
    }
  }

  static async listingUserByID(req, res) {
    try {
      const id = req.params.id;
      const foundUser = await user.findById(id);
      res.status(200).json(foundUser);
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - falha na requisição do user` });
    }
  }

  static async registerUser(req, res) {
    const newUser = req.body;
    try {
      const foundRecipe = await recipe.findById(newUser.recipes);
      const fullUser = { ...newUser, recipes: { ...foundRecipe._doc } };

      const hashedPassword = await bcrypt.hash(fullUser.password, 10);
      fullUser.password = hashedPassword;

      const createdUser = await user.create(fullUser);
      res
        .status(201)
        .json({ message: "user criado com sucesso", user: createdUser });
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha ao cadastrar user` });
    }
  }

  static async updateUser(req, res) {
    try {
      const id = req.params.id;
      await user.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "user atualizado" });
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - falha na requisição do user` });
    }
  }

  static async deleteUser(req, res) {
    try {
      const id = req.params.id;
      await user.findByIdAndDelete(id);
      res.status(200).json({ message: "user deletado" });
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - falha na requisição do user` });
    }
  }
}

export default UserController;
