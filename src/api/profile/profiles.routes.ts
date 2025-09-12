import { Router } from "express";
import { getUserById } from "./profile.controller";

export const profileRouter = Router();

profileRouter.get("/:profileId", getUserById);
