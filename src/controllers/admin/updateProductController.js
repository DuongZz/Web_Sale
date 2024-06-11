import { StatusCodes } from "http-status-codes";
import { updateProductService } from "~/services/adminService/updateProductService";

export const updateProductController = async (req, res, next) => {
  try {
    const product = await updateProductService(req);

    res.status(StatusCodes.OK).json({
      message: "Update product successfully",
      product,
    });
  } catch (error) {
    next(error);
  }
};
