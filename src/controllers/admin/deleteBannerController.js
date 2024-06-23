import { StatusCodes } from "http-status-codes";
import { deleteBannerService } from "~/services/adminService/deleteBannerService";

export const deleteBannerController = async (req, res, next) => {
  try {
    await deleteBannerService(req);

    res.status(StatusCodes.NO_CONTENT).json();
  } catch (error) {
    next(error);
  }
};
