import mongoose from "mongoose";
import { recipeSchema } from "./OldRecipe.js";

const userSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    user_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    user_img: { type: String, required: false },
    recipes: [recipeSchema],
  },
  { versionKey: false }
);

const user = mongoose.model("users", userSchema);

export { user, userSchema };
