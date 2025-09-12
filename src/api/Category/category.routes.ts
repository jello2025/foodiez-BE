import { Router } from "express";
import {
  getAllCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
  createCategory,
} from "./category.controller";

export const categoryRouter = Router();

categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:categoryId", getCategoryById);
categoryRouter.put("/:categoryId", updateCategoryById);
categoryRouter.post("/", createCategory);
categoryRouter.delete("/:categoryId", deleteCategoryById);
