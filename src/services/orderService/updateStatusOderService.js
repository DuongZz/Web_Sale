import { findOrderById, updateOrder } from "~/models/orderModel";
import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";

export const updateStatusOrderService = async (req, res, next) => {
  try {
    const id = req.body.id;
    const order = await findOrderById(id);
    if (!order) next(new ApiError(StatusCodes.NOT_FOUND, "Not Found Order"));

    await updateOrder(id, {
      status: req.body.status,
      updateAt: new Date(),
    });
  } catch (error) {
    throw error;
  }
};
