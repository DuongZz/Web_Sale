import { updateStatusOrderService } from "~/services/orderService/updateStatusOderService";
import { StatusCodes } from "http-status-codes";

export const updateStatusOrderController = async (req, res, next) => {
  try {
    const order = await updateStatusOrderService(req);
    res.status(StatusCodes.OK).json({ message: "Order updated", order: order });
  } catch (error) {
    next(error);
  }
};
