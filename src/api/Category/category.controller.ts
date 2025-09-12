import { Request, Response, NextFunction } from "express";
import Category from "../../models/Category";

export const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await Category.find().populate("recipe");
    res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
};

export const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { categoryId } = req.params;
  try {
    const foundCategory = await Category.findById(categoryId).populate(
      "recipe"
    );
    if (foundCategory) {
      return res.status(200).json(foundCategory);
    } else {
      return res.status(404).json({ message: "category not found" });
    }
  } catch (err) {
    next(err);
  }
};

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (err) {
    next(err);
  }
};

export const updateCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { categoryId } = req.params;
  try {
    const foundCategory = await Category.findById(categoryId);
    if (foundCategory) {
      await foundCategory.updateOne(req.body);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "category not found" });
    }
  } catch (err) {
    next(err);
  }
};

export const deleteCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { categoryId } = req.params;
  try {
    const foundCategory = await Category.findById(categoryId);
    if (foundCategory) {
      await foundCategory.deleteOne();
      res.status(204).end();
    } else {
      res.status(404).json({ message: "category not found" });
    }
  } catch (err) {
    next(err);
  }
};
