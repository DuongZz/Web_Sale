import { findAllProduct } from "~/models/productModel";

export const findAllProductsService = async () => {
  try {
    const product = await findAllProduct();
    return product;
  } catch (error) {
    throw error;
  }
};
