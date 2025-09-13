import { Router } from "express";
import { getUserById, getMe } from "./profile.controller";
import { authorize } from "../../middlewares/auth";
export const profileRouter = Router();

profileRouter.get("/:profileId", getUserById);
profileRouter.get("/me", authorize, getMe);
