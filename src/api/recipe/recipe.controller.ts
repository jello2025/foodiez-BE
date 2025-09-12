import { Request, Response, NextFunction } from "express";
import Recipe from "../../models/Recipe";
export const createRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const imagePath = req.file ? req.file.path : null;
    const newRecipe = await Recipe.create({ ...req.body, image: imagePath });
    res.status(201).json(newRecipe);
  } catch (err) {
    next(err);
  }
};

export const getRecipeById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { recipeId } = req.params;
  try {
    const foundRecipe = await Recipe.findById(recipeId);
    if (foundRecipe) {
      return res.status(200).json(foundRecipe);
    } else {
      return res.status(404).json({ message: "recipe not found" });
    }
  } catch (err) {
    next(err);
  }
};
