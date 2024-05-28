import { StatusCodes } from "http-status-codes";
import { createOrder, findOrderById } from "~/models/orderModel";
import { findUserById, pushOrder, updateUser } from "~/models/userModel";
import ApiError from "~/utils/ApiError";

export const createOrderService = async (req) => {
  try {
    const { userId, name, email, phone, address, totalAmount, cart } = req.body;
    let user;
    if (userId) {
      user = await findUserById(userId);
      if (!user) throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
    }
    // check còn hàng không
    const product = cart.map((item) => ({
      productId: item.product._id,
      quantity: item.quantity,
    }));
    const createdOrder = await createOrder({
      userId,
      name,
      email,
      phone,
      address,
      totalAmount,
      product,
    });

    // update order in user
    if (user) pushOrder(userId, createdOrder.insertedId);
    //update hàng
    return await findOrderById(createdOrder.insertedId);
  } catch (error) {
    throw error;
  }
};
