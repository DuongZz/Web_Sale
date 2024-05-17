import { findUserByEmail, updateUser } from "~/models/userModel";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
} from "~/utils/generateToken";
import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";
import { env } from "~/config/environment";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email)
    if (!user) {
      return next(new ApiError(StatusCodes.NOT_FOUND, "User not found"))
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return next(new ApiError(StatusCodes.UNAUTHORIZED, "Wrong password"))
    }
    if (user && validPassword) {
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      await updateUser({_id: user._id},{
        $set: {
          refreshToken: refreshToken,
        },
      }, {})

      res.cookie("refreshToken", refreshToken, {
        path: "/",
        sameSite: "None",
        secure: env.COOKIE_IS_USE_SECURE,
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

      res.status(StatusCodes.OK).json({
        message: "Login successful",
      });
    }
  } catch (error) {
    next(error);
  }
};
