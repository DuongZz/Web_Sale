import { StatusCodes } from "http-status-codes";
import { findStaffById } from "~/models/staffModel";

export const getMe = async (req, res, next) => {
  try {
    if (req.user) {
      const user = await findStaffById(req.user.id);

      delete user.password;
      delete user.refreshToken;
      delete user.orderId;

      res.status(StatusCodes.OK).json({
        message: "Get user information successfully",
        user,
      });
    }
  } catch (error) {
    next(error);
  }
};
