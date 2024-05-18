import { StatusCodes } from "http-status-codes";
import { deleteServiceService } from "~/services/adminService/deleteStaffService";

export const deleteStaffController = async (req, res, next) => {
  try {
    await deleteServiceService(req);

    res.status(StatusCodes.NO_CONTENT).json();
  } catch (error) {
    next(error);
  }
}