import { StatusCodes } from "http-status-codes";
import { createBannerService } from "~/services/adminService/createBannerService";

export const createBannerController = async (req, res, next) => {
  try {
    const newBanner = await createBannerService(req)

    res.status(StatusCodes.CREATED).json({
      message: "Created Banner successfully",
      newBanner,
    });
  } catch (error) {
    next(error);
  }
}