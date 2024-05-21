import { StatusCodes } from "http-status-codes";
import { postProductService } from "~/services/adminService/postProductService";

export const postProductController = async (req, res, next) => {
  try {
    const newProduct = await postProductService(req);

    res.status(StatusCodes.CREATED).json({
      message: "Created Product successfully",
      newProduct: newProduct,
    });
  } catch (error) {
    next(error);
  }
};
