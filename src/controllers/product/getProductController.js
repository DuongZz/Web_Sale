import { StatusCodes } from "http-status-codes";
import { filterProductService } from "~/services/product/getProductService";

export const getProductController = async (req, res, next) => {
  try {
    const filterProduct = await filterProductService(req);
    res.status(StatusCodes.OK).json({
      mesage: "getProduct successfully",
      length: filterProduct.length,
      filterProduct,
    });
  } catch (error) {
    next(error);
  }
};
