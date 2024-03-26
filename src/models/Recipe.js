import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    title: { type: String, required: true },
    description: { type: String },
    mainIngredient: { type: String, required: true },
    ingredients: { type: String, required: true },
    instructions: { type: String, required: true },
    img_url: { type: String },
  },
  { versionKey: false }
);

const recipe = mongoose.model("recipes", recipeSchema);

export { recipe, recipeSchema };
