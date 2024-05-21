import { findProductBySlug } from "~/models/productModel";
export const getInfoProductService = async (req) => {
  try {
    const { slug } = req.params;
    const { mainProduct, relatedProducts } = await findProductBySlug(slug);
    return { mainProduct, relatedProducts };
  } catch (error) {
    throw new Error(error);
  }
};
