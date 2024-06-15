import { StatusCodes } from "http-status-codes";
import { findProductById } from "~/models/productModel";
import { createWarrantyCard } from "~/models/warrantyCard";
import ApiError from "~/utils/ApiError";

export const createWarrantyService = async (order) => {
  try {
    const product = await Promise.all(
      order.product.map(async (product) => {
        const findedProduct = await findProductById(product.productId);
        if (!findedProduct)
          throw new ApiError(StatusCodes.NOT_FOUND, "Product not found");
        return {
          productId: findedProduct._id.toString(),
          name: findedProduct.name,
          quantity: product.quantity,
        };
      })
    );
    const initialData = {
      name: order.name,
      email: order.email,
      phone: order.phone,
      address: order.address,
      orderId: order._id.toString(),
      products: product,
    };
    console.log(initialData);
    await createWarrantyCard(initialData);
  } catch (error) {
    throw error;
  }
};
