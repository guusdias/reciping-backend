import express from "express";
import recipes from "./recipeRoute.js";
import users from "./userRoutes.js"

const routes = (app) => {
  app
    .route("/")
    .get((req, res) => res.status(200).send("welcome to our recipes hub!!"));

  app.use(express.json(), recipes, users);
};

export default routes;
