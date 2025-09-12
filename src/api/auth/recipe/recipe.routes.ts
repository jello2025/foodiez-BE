import { Router } from "express";
import { getRecipeById, createRecipe } from "./recipe.controller";
import upload from "../../../middlewares/multer";
export const recipeRouter = Router();

recipeRouter.post("/create", upload.single("image"), createRecipe);
recipeRouter.get("/:recipeId", getRecipeById);
