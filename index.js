import { configDotenv } from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { mainRouter } from "./routes/router.js";
import errorHandlingMiddleware from "./middleware/errorHandlingMiddleware.js";
import cookieParser from "cookie-parser";

configDotenv();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api", mainRouter);
app.use(errorHandlingMiddleware);

const start = async () => {
  try {
    await mongoose.connect(process.env.CONNECT_STRING);
    app.listen(PORT, () => {
      console.log("[Server] start on PORT:", PORT);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
