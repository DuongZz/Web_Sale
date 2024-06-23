import { StatusCodes } from "http-status-codes";
import { createOrderService } from "~/services/orderService/createOrderService";

export const createOrderController = async (req, res, next) => {
  try {
    const order = await createOrderService(req);
    res.status(StatusCodes.OK).json({ message: "Order created", order: order });
  } catch (error) {
    next(error);
  }
};
