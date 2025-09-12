import { Router } from "express";
import { getRecipeById, createRecipe } from "./recipe.controller";

export const recipeRouter = Router();

recipeRouter.post("/create", createRecipe);
recipeRouter.get("/:recipeId", getRecipeById);
