import { validationResult } from "express-validator";
import { User } from "../schemas/userSchema.js";
import { ApiError } from "../error/ApiError.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();

const generateJwt = (email) => {
  return jwt.sign({ email }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

export const registration = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.badRequest({ error: errors.array() }));
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return next(
        ApiError.badRequest({ error: "User with same email exists" })
      );
    }

    const hashPassword = bcrypt.hashSync(password, 5);

    const newUser = new User({ email, password: hashPassword });

    await newUser.save();

    const token = generateJwt(newUser.email);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 3600000 * 24,
    });

    return res.status(200).json(existingUser.email);
  } catch (error) {
    return next(ApiError.internal(error.message));
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.unauthorized({ error: errors.array() }));
    }
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return next(ApiError.unauthorized({ error: "Wrong password or email" }));
    }

    let comparePassword = bcrypt.compareSync(password, existingUser.password);
    if (!comparePassword) {
      return next(ApiError.unauthorized("Wrong password or email"));
    }

    const token = generateJwt(existingUser.email);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 3600000 * 24,
    });

    return res.status(200).json(existingUser.email);
  } catch (error) {
    return next(ApiError.internal(error.message));
  }
};

export const checkAuth = async (req, res, next) => {
  try {
    const token = generateJwt(req.user.email);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 3600000 * 24,
    });
    return res.status(200).json(req.user.email);
  } catch (error) {
    return next(ApiError.internal(error.message));
  }
};
