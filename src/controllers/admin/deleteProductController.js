import { StatusCodes } from "http-status-codes";
import { deleteProductService } from "~/services/adminService/deleteProductService";

export const deleteProductController = async (req, res, next) => {
  try {
    await deleteProductService(req);

    res.status(StatusCodes.NO_CONTENT).json();
  } catch (error) {
    next(error);
  }
};
