import { getDB } from "~/config/mongodb";
import { productModel } from "~/models/productModel";
import { generateSlug } from "~/utils/generateSlug";
import { v2 as cloudinary } from "cloudinary";

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

    const newProduct = {
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
      newProduct.imageList = uploadResults.map((result) => result.secure_url);
    }

    const db = getDB();
    await db
      .collection(productModel.PRODUCT_COLLECTION_NAME)
      .insertOne(newProduct);
    return newProduct;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
