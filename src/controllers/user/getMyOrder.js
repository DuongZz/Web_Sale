import { StatusCodes } from "http-status-codes";
import { cloneDeep } from "lodash";
import { findOrdersByUserId } from "~/models/orderModel";

export const getMyOrder = async (req, res, next) => {
  try {
    if (req.user) {
      const myOrder = await findOrdersByUserId(req.user.id);
      //update lại json trả về
      const resOrders = cloneDeep(myOrder);
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
        message: "Get your order successfully",
        resOrders,
      });
    }
  } catch (error) {
    next(error);
  }
};
