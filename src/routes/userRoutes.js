import express from "express";
import UserController from "../controllers/userController.js";

const routes = express.Router();

routes.get("/user", UserController.listingUsers);
routes.get("/user/:id", UserController.listingUserByID);
routes.get("/user/:id/recipes", UserController.getRecipesByUser);
routes.get("/user/recipes/all", UserController.getAllRecipes);
routes.post("/user", UserController.registerUser);
routes.put("/user/:id", UserController.updateUser);
routes.delete("/user/:id", UserController.deleteUser);

export default routes;
