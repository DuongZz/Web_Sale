import { StatusCodes } from "http-status-codes";
import { getWarranty } from "~/models/warrantyCard";

export const getWarrantyController = async (req, res, next) => {
  try {
    const warrantyList = await getWarranty();
    res.status(StatusCodes.OK).json({
      message: "Get Warranty List successfully",
      length: warrantyList.length,
      warrantyList,
    });
  } catch (error) {
    next(error);
  }
};
