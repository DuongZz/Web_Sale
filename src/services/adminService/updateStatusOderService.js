import { findOrderById, updateOrder } from "~/models/orderModel";
import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";
import { createWarrantyService } from "./createWarrantyCardService";

export const updateStatusOrderService = async (req) => {
  try {
    const { id, status, isPaided } = req.body;
    const order = await findOrderById(id);
    console.log("🚀 ~ updateStatusOrderService ~ order:", order);
    if (!order) throw new ApiError(StatusCodes.NOT_FOUND, "Not Found Order");
    // status  === completed
    if (status === "completed") await createWarrantyService(order);

    //status === rejected
    if (order.status === "rejected")
      await Promise.all(
        order.product.map(async (item) => {
          console.log("🚀 ~ order.product.map ~ item:", item);
          await getProductFromStorage(item.productId, -item.quantity);
        })
      );

    await updateOrder(id, {
      status: status,
      updateAt: Date.now(),
      isPaided: isPaided,
    });
  } catch (error) {
    throw error;
  }
};
