import { StatusCodes } from "http-status-codes";
import { createStaffService } from "~/services/adminService/createStaffService";

export const createStaffController = async (req, res, next) => {
  try {
    const newStaff = await createStaffService(req);
    res.status(StatusCodes.CREATED).json({
      message: "Staff account created successfully",
      staff: newStaff,
    });
  } catch (error) {
    next(error);
  }
};
