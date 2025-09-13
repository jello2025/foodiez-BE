import { Schema, model } from "mongoose";

const RecipeSchema = new Schema({
  name: { type: String, required: true },
  instructions: { type: String, required: true },
  prepTime: { type: String, required: true },
  serving: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String },
  ingredient: [{ type: Schema.ObjectId, ref: "Ingredient" }],
  category: { type: Schema.ObjectId, ref: "Category" },
  user: { type: Schema.ObjectId, ref: "User" },
});

const Recipe = model("Recipe", RecipeSchema);

export default Recipe;
