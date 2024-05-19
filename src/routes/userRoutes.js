import express from "express";
import UserController from "../controllers/userController.js";

const routes = express.Router();

routes.get("/user", UserController.listingUsers);
routes.get("/user/:id", UserController.listingUserByID);
routes.post("/user", UserController.registerUser);
routes.put("/user/:id", UserController.updateUser);
routes.delete("/user/:id", UserController.deleteUser);
routes.get("/user/:id/recipes", UserController.getRecipesByUser);

export default routes;
