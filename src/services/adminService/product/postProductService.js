import { generateSlug } from "~/utils/generateSlug";
import { v2 as cloudinary } from "cloudinary";
import { createProduct, findProductById } from "~/models/productModel";

export const postProductService = async (req) => {
  try {
    const {
      deviceCode,
      name,
      price,
      stock,
      information,
      techSpecification,
      brand,
      discount,
      typeDevice,
      year,
      sold,
      warranty,
    } = req.body;

    const data = {
      deviceCode,
      name,
      price,
      stock,
      information,
      techSpecification,
      brand,
      discount,
      typeDevice,
      year,
      sold,
      warranty,
      slug: generateSlug(name),
    };
    const images = req.files["image"];

    if (images && images.length > 0) {
      const uploadPromises = images.map((image) =>
        cloudinary.uploader.upload(image.path, {
          folder: "Sale/products",
        })
      );

      const uploadResults = await Promise.all(uploadPromises);
      data.imageList = uploadResults.map((result) => result.secure_url);
    }

    const createdProduct = await createProduct(data)
    const newProduct = await findProductById(createdProduct.insertedId)
    return newProduct
  } catch (error) {
    throw error;
  }
};
