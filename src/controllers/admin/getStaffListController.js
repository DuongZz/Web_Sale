import { StatusCodes } from "http-status-codes";
import { getStaffListService } from "~/services/adminService/getStaffListService";

export const getStaffListController = async (req, res, next) => {
  try {
    const  staffList = await getStaffListService(req)
    res.status(StatusCodes.OK).json({
      message: "Get Staff List successfully",
      length: staffList.length,
      staffList,
    });
  } catch (error) {
    next(error);
  }
}