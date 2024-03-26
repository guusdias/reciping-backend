import express from "express";
import RecipeController from "../controllers/recipeController.js";

const routes = express.Router();

routes.get("/recipes", RecipeController.listingRecipies);
routes.get("/recipes/search", RecipeController.listingRecipiesByIngredients);
routes.get("/recipes/:id", RecipeController.listingRecipeByID);
routes.post("/recipes", RecipeController.registerRecipe);
routes.put("/recipes/:id", RecipeController.updateRecipe);
routes.delete("/recipes/:id", RecipeController.deleteRecipe);

export default routes;
