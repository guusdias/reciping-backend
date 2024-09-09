import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    title: { type: String },
    description: { type: String },
    mainIngredient: { type: String },
    ingredients: { type: String },
    instructions: { type: String },
    img_url: { type: String },
  },
  { versionKey: false }
);

const recipe = mongoose.model("recipes", recipeSchema);

export { recipe, recipeSchema };
