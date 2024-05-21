import { StatusCodes } from "http-status-codes";
import { updateBannerService } from "~/services/adminService/updateBannerService";


export const updateBannerController = async (req, res, next) => {
  try {
    const banner = await updateBannerService(req);

    res.status(StatusCodes.OK).json({
      message: "Update Banner successfully",
      banner,
    });
  } catch (error) {
    next(error);
  }
}