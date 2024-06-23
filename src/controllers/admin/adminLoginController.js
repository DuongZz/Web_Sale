
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
} from "~/utils/generateToken";
import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";
import { env } from "~/config/environment";
import { findStaffByUserName, updateStaff } from "~/models/staffModel";

export const login = async (req, res, next) => {
  try {
    const {username, password } = req.body;

    const user = await findStaffByUserName(username)
    if (!user) {
      return next(new ApiError(StatusCodes.NOT_FOUND, "Staff not found"))
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return next(new ApiError(StatusCodes.UNAUTHORIZED, "Wrong password"))
    }
    if (user && validPassword) {
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      await updateStaff({_id: user._id},{
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
