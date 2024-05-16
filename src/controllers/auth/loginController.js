import { findUserByEmail, updateUser } from "~/models/userModel";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
} from "~/utils/generateToken";
import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";

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
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
      }, {})

      res.cookie("refreshToken", refreshToken, {
        httpOnly: false,
        secure: false,
        path: "/",
        sameSite: "strict",
      });

      res.cookie("accessToken", accessToken, {
        httpOnly: false,
        secure: false,
        path: "/",
        sameSite: "strict",
      });

      res.status(StatusCodes.OK).json({
        message: "Login successful",
      });
    }
  } catch (error) {
    next(error);
  }
};
