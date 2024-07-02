import { ApiError } from "../error/ApiError.js";

export default (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json(err);
  }
  return res
    .status(500)
    .json({ status: 500, message: { error: "Internal Server Error !" } });
};
