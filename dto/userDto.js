import { body } from "express-validator";

export const userValidator = [
  body("email").isEmail().withMessage("Invalid email"),
  body("password").notEmpty().withMessage("Password cannot be empty"),
];
