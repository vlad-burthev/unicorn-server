import { Router } from "express";
import {
  checkAuth,
  login,
  registration,
} from "../controllers/userController.js";
import { userValidator } from "../dto/userDto.js";
import { chekAuthMiddleware } from "../middleware/checkAuthMiddleware.js";

export const userRouter = Router();

userRouter.post("/registration", userValidator, registration);
userRouter.post("/login", userValidator, login);
userRouter.post("/check", chekAuthMiddleware, checkAuth);
