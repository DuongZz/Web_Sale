import { StatusCodes } from "http-status-codes";
import { findAllProductsService } from "~/services/product/findAllProductService";
export const findAllProductController = async (req, res, next) => {
  try {
    const allProduct = await findAllProductsService();
    res.status(StatusCodes.OK).json(allProduct);
  } catch (error) {
    next(error);
  }
};
