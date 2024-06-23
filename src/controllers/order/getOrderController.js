import { StatusCodes } from "http-status-codes";
import { cloneDeep } from "lodash";
import { getAllOrder } from "~/models/orderModel";

export const getOrderController = async (req, res, next) => {
  try {
    const order = await getAllOrder();
    const resOrders = cloneDeep(order);
    resOrders.forEach((item) => {
      item.product.forEach((product) => {
        product.detail = item.products.filter(
          (prod) => product.productId.toString() === prod._id.toString()
        )[0];
        delete product.productId;
      });
      delete item.products;
    });
    res.status(StatusCodes.OK).json({
      message: "Get order!",
      length: resOrders.length,
      resOrders: resOrders,
    });
  } catch (error) {
    next(error);
  }
};
