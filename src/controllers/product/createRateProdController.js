import { StatusCodes } from "http-status-codes";
import { createRateProdService } from "~/services/product/createRateProdService";

export const createRateProdController = async (req, res, next) => {
  try {
    const rate = await createRateProdService(req);
    res.status(StatusCodes.OK).json(rate);
  } catch (error) {
    next(error);
  }
};
