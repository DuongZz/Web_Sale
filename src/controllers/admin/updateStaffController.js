import { StatusCodes } from "http-status-codes";
import { updateStaffService } from "~/services/adminService/updateStaffService";


export const updateStaffController = async (req, res, next) => {
  try {
    const staff = await updateStaffService(req);
    
    delete staff.password
    delete staff.refreshToken
    delete staff.orderId

    res.status(StatusCodes.OK).json({
      message: "Update Staff successfully",
      staff,
    });
  } catch (error) {
    next(error);
  }
}