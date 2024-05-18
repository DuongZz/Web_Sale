import { findAllProduct, findTopSaleProduct } from "~/models/productModel";

export const findAllProductsService = async () => {
  try {
    const product = await findAllProduct();
    const topSale = await findTopSaleProduct();
    return { product, topSale };
  } catch (error) {
    throw error;
  }
};
