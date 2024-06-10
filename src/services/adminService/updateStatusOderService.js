import { findOrderById, updateOrder } from "~/models/orderModel";
import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";

export const updateStatusOrderService = async (req, res, next) => {
  try {
    const { id, status } = req.body;
    const order = await findOrderById(id);
    console.log("🚀 ~ updateStatusOrderService ~ order:", order);
    if (!order) throw new ApiError(StatusCodes.NOT_FOUND, "Not Found Order");

    await updateOrder(id, {
      status: status,
      updateAt: new Date(),
    });
  } catch (error) {
    throw error;
  }
};
