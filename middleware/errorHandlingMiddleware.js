import { ApiError } from "../error/ApiError.js";

export default (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json(err);
  }
  return res.status(500).json({ message: " Internal Server Error !" });
};
