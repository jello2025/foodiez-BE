import { Router } from "express";
import {
  getAllIngredients,
  getIngredientById,
  updateIngredientById,
  createIngredient,
  deleteIngredientById,
} from "./ingredient.controller";

export const ingredientRouter = Router();

ingredientRouter.get("/", getAllIngredients);
ingredientRouter.get("/:ingredientId", getIngredientById);
ingredientRouter.post("/", createIngredient);
ingredientRouter.put("/:ingredientId", updateIngredientById);
ingredientRouter.delete("/:ingredientId", deleteIngredientById);
