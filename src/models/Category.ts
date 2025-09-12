import { Schema, model } from "mongoose";

export const CategorySchema = new Schema({
  name: { type: String, required: true },
  recipe: [{ type: Schema.ObjectId, ref: "Recipe" }],
});

const Category = model("Category", CategorySchema);

export default Category;
