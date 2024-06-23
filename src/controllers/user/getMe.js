import { StatusCodes } from "http-status-codes";
import { findUserById } from "~/models/userModel";

export const getMe = async (req, res, next) => {
  try {
    if (req.user) {
      const user = await findUserById(req.user.id);

      if (user?.refreshToken) delete user.refreshToken;

      res.status(StatusCodes.OK).json({
        message: "Get user information successfully",
        user,
      });
    }
  } catch (error) {
    next(error);
  }
};
