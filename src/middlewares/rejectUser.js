import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";

export const rejectUser = async (req, res, next) => {
  if (req.user.role === "user") {
    next(new ApiError(StatusCodes.FORBIDDEN, "Access denied. You're not an admin"))
  } else {
    next()
  }
};
