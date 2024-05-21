import { StatusCodes } from "http-status-codes";
import { getBannersService } from "~/services/banner/getBannersService";

export const getBannersController = async (req, res, next) => {
  try {
    const banner = await getBannersService(req)

    res.status(StatusCodes.CREATED).json({
      message: "Get Banners successfully",
      length: banner.length,
      banner,
    });
  } catch (error) {
    next(error);
  }
}