import { body, query } from "express-validator";

export const createElectricityProvidersValidator = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name is required"),
  body("country")
    .isString()
    .withMessage("Country must be a string")
    .notEmpty()
    .withMessage("Country is required"),
  body("marketShare")
    .isFloat({ min: 0, max: 100 })
    .withMessage("Market share must be a number between 0 and 100")
    .notEmpty()
    .withMessage("Market share is required"),
  body("renewableEnergyPercentage")
    .isFloat({ min: 0, max: 100 })
    .withMessage(
      "Renewable energy percentage must be a number between 0 and 100"
    )
    .notEmpty()
    .withMessage("Renewable energy percentage is required"),
  body("yearlyRevenue")
    .isNumeric()
    .withMessage("Yearly revenue must be a number")
    .notEmpty()
    .withMessage("Yearly revenue is required"),
];

export const updateElectricityProvidersValidator = [
  body("marketShare")
    .isFloat({ min: 0, max: 100 })
    .withMessage("Market share must be a number between 0 and 100")
    .notEmpty()
    .withMessage("Market share is required"),
  body("renewableEnergyPercentage")
    .isFloat({ min: 0, max: 100 })
    .withMessage(
      "Renewable energy percentage must be a number between 0 and 100"
    )
    .notEmpty()
    .withMessage("Renewable energy percentage is required"),
  body("yearlyRevenue")
    .isNumeric()
    .withMessage("Yearly revenue must be a number")
    .notEmpty()
    .withMessage("Yearly revenue is required"),
];
