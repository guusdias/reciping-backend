require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
const port = 3000;

const mongURI = process.env.DB_URL;

mongoose
  .connect(mongURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

const Recipe = mongoose.model("Recipe", {
  title: String,
  description: String,
  ingredients: String,
  instructions: String,
  img_url: String,
  user_id: String,
});

app.get("/", async (req, res) => {
  const films = await Film.find()
  res.send("Hello World!");
});

app.post("/", async (req, res) => {
  try {
    const recipes = new Recipe({
      title: req.body.title,
      description: req.body.description,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      img_url: req.body.img_url,
      user_id: req.body.user_id,
    });

    const savedRecipe = await recipes.save();
    res.send(savedRecipe);
  } catch (error) {
    console.error("Error saving recipe:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});