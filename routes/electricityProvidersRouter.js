import { Router } from "express";
import {
  createElectricityProvider,
  deleteElectricityProvider,
  getAllElectricityProvider,
  getOneElectricityProvider,
  updateElectricityProvider,
} from "../controllers/electricityProvidersController.js";
import {
  createElectricityProvidersValidator,
  updateElectricityProvidersValidator,
} from "../dto/electricityProvidersDto.js";

export const electricityProvidersRouter = Router();

electricityProvidersRouter.post(
  "/create",
  createElectricityProvidersValidator,
  createElectricityProvider
);
electricityProvidersRouter.get("/get_all", getAllElectricityProvider);
electricityProvidersRouter.get("/get_one/:id", getOneElectricityProvider);
electricityProvidersRouter.post("/delete/:id", deleteElectricityProvider);
electricityProvidersRouter.post(
  "/update/:id",
  updateElectricityProvidersValidator,
  updateElectricityProvider
);
