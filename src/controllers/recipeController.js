import { recipe } from "../models/Recipe.js";

class RecipeController {
  static async listingRecipies(req, res) {
    try {
      const recipiesList = await recipe.find({});
      res.status(200).json(recipiesList);
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - falha na requisição` });
    }
  }

  static async listingRecipeByID(req, res) {
    try {
      const id = req.params.id;
      const foundRecipe = await recipe.findById(id);
      res.status(200).json(foundRecipe);
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - falha na requisição da receita` });
    }
  }

  static async registerRecipe(req, res) {
    try {
      const newRecipe = await recipe.create(req.body);
      res
        .status(201)
        .json({ message: "criada com sucesso", recipe: newRecipe });
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - falha ao cadastrar receita` });
    }
  }

  static async updateRecipe(req, res) {
    try {
      const id = req.params.id;
      await recipe.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "receita atualizada" });
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - falha na requisição da receita` });
    }
  }

  static async deleteRecipe(req, res) {
    try {
      const id = req.params.id;
      await recipe.findByIdAndDelete(id);
      res.status(200).json({ message: "receita deletada" });
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - falha na requisição da receita` });
    }
  }

  static async listingRecipiesByIngredients() {
    const ingredient = req.query.ingredients;
    try {
      const recipeByIngredient = await recipe.find({
        mainIngredient: ingredient,
      });
      res.status(200).json(recipeByIngredient);
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na busca` });
    }
  }
}

export default RecipeController;
