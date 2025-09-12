import { Schema, model } from "mongoose";

export const IngredientSchema = new Schema({
  name: { type: String, required: true },
  recipe: [{ type: Schema.ObjectId, ref: "Recipe" }],
  amount: { type: String, required: true },
});
