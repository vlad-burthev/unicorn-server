import { Router } from "express";
import { userRouter } from "./userRouter.js";
import { chekAuthMiddleware } from "../middleware/checkAuthMiddleware.js";
import { electricityProvidersRouter } from "./electricityProvidersRouter.js";

export const mainRouter = Router();

mainRouter.use("/user", userRouter);
mainRouter.use(
  "/electricity_providers",
  chekAuthMiddleware,
  electricityProvidersRouter
);
