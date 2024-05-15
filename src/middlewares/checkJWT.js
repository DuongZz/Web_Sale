import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import ApiError from "~/utils/ApiError";

export const checkJWT = (req, res, next) => {
  const token = req.headers.authorization; // sửa thành 'authorization' với chữ 'a' thường
  if (token) {
    const accessToken = token.split(" ")[1];
    jwt.verify(accessToken, process.env.SECRET_ACCESS_TOKEN, (err, user) => {
      if (err) {
        const error = new ApiError(StatusCodes.UNAUTHORIZED, "Invalid token");
        next(error);
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    const error = new ApiError(StatusCodes.UNAUTHORIZED, "Token is missing");
    next(error);
  }
};
