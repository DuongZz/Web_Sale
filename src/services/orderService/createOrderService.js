import { StatusCodes } from "http-status-codes";
import { createOrder, findOrderById } from "~/models/orderModel";
import { findProductById, getProductFromStorage } from "~/models/productModel";
import { findUserById, pushOrder } from "~/models/userModel";
import ApiError from "~/utils/ApiError";

export const createOrderService = async (req) => {
  try {
    const { userId, name, email, phone, address, totalAmount, cart } = req.body;
    let user;
    let body = {
      name,
      email,
      phone,
      address,
      totalAmount,
    };
    if (userId) {
      user = await findUserById(userId);
      if (!user) throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
      body.userId = userId;
    }

    const product = cart.map((item) => ({
      productId: item.product._id,
      quantity: item.quantity,
    }));

    body.product = product;

    // check còn hàng không
    await Promise.all(
      product.map(async (item) => {
        const product = await findProductById(item.productId);
        if (!product)
          throw new ApiError(StatusCodes.NOT_FOUND, "Product not found");
        if (product.quantity < item.quantity) {
          throw new ApiError(
            StatusCodes.NOT_FOUND,
            `${product?.name} not enough`
          );
        }
      })
    );

    const createdOrder = await createOrder(body);

    // update order in user
    if (user) pushOrder(userId, createdOrder.insertedId);
    //update hàng
    // await Promise.all(
    //   product.map(async (item) => {
    //     getProductFromStorage(item.productId, item.quantity);
    //   })
    // );
    return await findOrderById(createdOrder.insertedId);
  } catch (error) {
    throw error;
  }
};
