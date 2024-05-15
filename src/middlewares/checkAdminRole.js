import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";

export const checkAdminRole = async (req, res, next) => {
  if (req.user.role === "admin") {
    next();
  } else {
    next(new ApiError(StatusCodes.FORBIDDEN, "Access denied. You're not an admin"))
  }
};
