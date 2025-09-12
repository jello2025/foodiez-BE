import { Request, Response, NextFunction } from "express";
import Ingredient from "../../models/Ingredient";

export const getAllIngredients = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ingredients = await Ingredient.find().populate("recipe");
    res.status(200).json(ingredients);
  } catch (err) {
    next(err);
  }
};

export const getIngredientById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { ingredientId } = req.params;
  try {
    const foundIngredient = await Ingredient.findById(ingredientId).populate(
      "recipe"
    );
    if (foundIngredient) {
      return res.status(200).json(foundIngredient);
    } else {
      return res.status(404).json({ message: "couldnt find ingredient" });
    }
  } catch (err) {
    next(err);
  }
};

export const createIngredient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newIngredient = await Ingredient.create(req.body);
    res.status(201).json(newIngredient);
  } catch (err) {
    next(err);
  }
};

export const updateIngredientById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { ingredientId } = req.params;
  try {
    const foundIngredient = await Ingredient.findById(ingredientId);
    if (foundIngredient) {
      await Ingredient.updateOne(req.body);
      res.status(204).end();
    } else {
      return res.status(404).json({ message: "couldnt find ingredient" });
    }
  } catch (err) {
    next(err);
  }
};

export const deleteIngredientById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { ingredientId } = req.params;
  try {
    const foundIngredient = await Ingredient.findById(ingredientId);
    if (foundIngredient) {
      await Ingredient.deleteOne();
      res.status(204).end();
    } else {
      return res.status(404).json({ message: "couldnt find ingredient" });
    }
  } catch (err) {
    next(err);
  }
};
