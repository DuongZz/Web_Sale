import { StatusCodes } from "http-status-codes";
import { findOrderById, updateOrder } from "~/models/orderModel";
import ApiError from "~/utils/ApiError";
import { getProductFromStorage } from "~/models/productModel";

export const cancelOrderService = async (req) => {
  try {
    const id = req.body.id;
    const order = await findOrderById(id);

    if (!order) throw new ApiError(StatusCodes.NOT_FOUND, "Not Found Order");
    if (order.status === "rejected") {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "Order has already been rejected"
      );
    }
    await updateOrder(id, {
      status: "rejected",
      updateAt: new Date(),
    });
    await Promise.all(
      order.product.map(async (item) => {
        console.log("🚀 ~ order.product.map ~ item:", item);
        await getProductFromStorage(item.productId, -item.quantity);
      })
    );
  } catch (error) {
    throw error;
  }
};
