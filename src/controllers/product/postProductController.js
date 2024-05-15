import { postProductService } from "~/services/product/postProductService";

export const postProductController = async (req, res) => {
  try {
    const newProduct = await postProductService(req);

    res.status(201).json({
      status: "Success",
      newProduct: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
