import { StatusCodes } from "http-status-codes";
import { getInfoProductService } from "~/services/product/getInfoProductService";

export const getInfoProductController = async (req, res, next) => {
  try {
    const productInfo = await getInfoProductService(req);
    res.status(StatusCodes.OK).json(productInfo);
  } catch (error) {
    next(error);
  }
};
