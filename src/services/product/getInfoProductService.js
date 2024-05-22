import { findProductBySlug } from "~/models/productModel";
export const getInfoProductService = async (req) => {
  try {
    const { slug } = req.params;
    const { mainProduct, relatedProducts, promotionPolicy } =
      await findProductBySlug(slug);
    return { mainProduct, relatedProducts, promotionPolicy };
  } catch (error) {
    throw new Error(error);
  }
};
