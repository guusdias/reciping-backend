import { recipe } from "../models/Recipe.js";
import { user } from "../models/User.js";
import bcrypt from "bcryptjs";

class UserController {
  static async addRecipe(req, res) {
    try {
      const userId = req.params.id;
      const newRecipe = req.body;

      const userFound = await user.findById(userId);

      if (!userFound) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      userFound.recipes.push(newRecipe);
      await userFound.save();

      res.status(201).json({
        message: "Receita adicionada com sucesso",
        recipes: userFound.recipes,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha ao adicionar receita` });
    }
  }

  static async updateRecipe(req, res) {
    try {
      const userId = req.params.userId;
      const recipeId = req.params.recipeId;
      const updatedRecipe = req.body;

      const userFound = await user.findById(userId);

      if (!userFound) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      const recipeIndex = userFound.recipes.findIndex((r) =>
        r._id.equals(recipeId)
      );

      if (recipeIndex === -1) {
        return res.status(404).json({ message: "Receita não encontrada" });
      }

      userFound.recipes[recipeIndex] = {
        ...userFound.recipes[recipeIndex]._doc,
        ...updatedRecipe,
      };
      await userFound.save();

      res.status(200).json({
        message: "Receita atualizada com sucesso",
        recipes: userFound.recipes,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha ao atualizar receita` });
    }
  }

  static async deleteRecipe(req, res) {
    try {
      const userId = req.params.userId;
      const recipeId = req.params.recipeId;

      const userFound = await user.findById(userId);

      if (!userFound) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      userFound.recipes = userFound.recipes.filter(
        (r) => !r._id.equals(recipeId)
      );
      await userFound.save();

      res.status(200).json({
        message: "Receita excluída com sucesso",
        recipes: userFound.recipes,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha ao excluir receita` });
    }
  }

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

  static async getRecipesByUser(req, res) {
    try {
      const userId = req.params.id;

      const userFound = await user.findById(userId).select("recipes");

      if (!userFound) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      const recipes = userFound.recipes;

      res.status(200).json({ recipes: recipes });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao obter receitas" });
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

  static async getAllRecipes(req, res) {
    try {
      const usersWithRecipes = await user.find({});

      const allRecipes = usersWithRecipes.map((user) => user.recipes).flat();

      if (allRecipes.length === 0) {
        return res.status(200).json({ recipes: [] });
      }

      const mappedRecipes = allRecipes.map((recipe) => {
        return {
          ...recipe,
        };
      });

      res.status(200).json({ recipes: mappedRecipes });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao obter receitas" });
    }
  }

  static async registerUser(req, res) {
    const newUser = req.body;

    try {
      const existingUser = await user.findOne({ email: newUser.email });
      if (existingUser) {
        return res.status(400).json({ message: "Usuário já existe" });
      }

      const createdRecipe = await recipe.create(newUser.recipes);

      const fullUser = {
        ...newUser,
        recipes: createdRecipe._id,
      };

      const hashedPassword = await bcrypt.hash(fullUser.password, 10);
      fullUser.password = hashedPassword;

      const createdUser = await user.create(fullUser);
      res
        .status(201)
        .json({ message: "User criado com sucesso", user: createdUser });
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha ao cadastrar usuário` });
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
