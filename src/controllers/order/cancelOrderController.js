import { StatusCodes } from "http-status-codes";
import { cancelOrderService } from "~/services/orderService/cancelOrderService";

export const cancelOrderController = async (req, res, next) => {
  try {
     await cancelOrderService(req);
    res.status(StatusCodes.OK).json({ message: "Deleted Order" });
  } catch (error) {
    next(error);
  }
};
