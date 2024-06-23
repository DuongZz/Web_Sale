import { findOrderById, updateOrder } from "~/models/orderModel";
import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";
import { createWarrantyService } from "./createWarrantyCardService";
import { transporter } from "~/config/configEmail";
import { env } from "~/config/environment";
import { findProductById } from "~/models/productModel";

export const updateStatusOrderService = async (req) => {
  try {
    const { id, status, isPaided } = req.body;
    const order = await findOrderById(id);
    if (!order) throw new ApiError(StatusCodes.NOT_FOUND, "Not Found Order");

    const detailedProducts = await Promise.all(
      order.product.map(async (item) => {
        const product = await findProductById(item.productId);
        return {
          ...item,
          name: product.name,
          price: product.price,
        };
      })
    );
    order.product = detailedProducts;

    // status  === completed
    if (status === "completed") await createWarrantyService(order);

    //status === rejected
    if (order.status === "rejected")
      await Promise.all(
        order.product.map(async (item) => {
          await getProductFromStorage(item.productId, -item.quantity);
        })
      );

    // Định dạng thông tin đơn hàng cho email
    const orderDetails = order.product
      .map(
        (item) => `
      Product: ${item.name}
      Quantity: ${item.quantity}
      Price: ${item.price}
    `
      )
      .join("\n");

    const mailOptions = {
      from: env.SENDER_EMAIL,
      to: order.email,
      subject: "Order updated",
      text: `Your order status has been updated to ${status}. \nOrder detail: ${orderDetails}`,
    };

    await updateOrder(id, {
      status: status,
      updateAt: Date.now(),
      isPaided: isPaided,
    });
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw error;
  }
};
