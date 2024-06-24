import { StatusCodes } from "http-status-codes";
import { env } from "~/config/environment";
import jwt from "jsonwebtoken";
import ApiError from "~/utils/ApiError";

export const googleLogin = async (req, res, next) => {
  try {
    const { accessToken, refreshToken } = req.body;
    if (!accessToken || !refreshToken)
      return next(
        new ApiError(
          StatusCodes.UNAUTHORIZED,
          "Missing access token or refresh token"
        )
      );
    jwt.verify(accessToken, env.SECRET_ACCESS_TOKEN);

    jwt.verify(refreshToken, env.SECRET_REFRESH_TOKEN);

    res.cookie("refreshToken", refreshToken, {
      path: "/",
      sameSite: "None",
      secure: true,
      httpOnly: true,
      partitioned: true,
    });

    res.cookie("accessToken", accessToken, {
      path: "/",
      sameSite: "None",
      secure: env.COOKIE_IS_USE_SECURE,
      httpOnly: true,
      partitioned: true,
    });

    res.status(StatusCodes.OK).json({ message: "ok" });
  } catch (error) {
    next(error);
  }
};
