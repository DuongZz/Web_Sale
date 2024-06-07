import { findProductById, updateProduct } from "~/models/productModel";

export const deleteProductService = async (req) => {
  try {
    const id = req.params.id;
    const product = await findProductById(id);
    if (!product) throw new ApiError(StatusCodes.NOT_FOUND, "Banner not found");
    await updateProduct({ _id: product._id }, { $set: { _destroy: true } });
  } catch (error) {
    throw error;
  }
};
