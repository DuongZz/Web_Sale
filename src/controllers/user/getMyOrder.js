import { StatusCodes } from "http-status-codes";
import { findOrdersByUserId } from "~/models/orderModel";

export const getMyOrder = async (req, res, next) => {
  try {
    if (req.user) {
      const myOrder = await findOrdersByUserId(req.user.id);
      //update lại json trả về
      res.status(StatusCodes.OK).json({
        message: "Get your order successfully",
        myOrder,
      });
    }
  } catch (error) {
    next(error);
  }
};
