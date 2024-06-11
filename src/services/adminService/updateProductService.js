import { generateSlug } from "~/utils/generateSlug";
import { v2 as cloudinary } from "cloudinary";
import {
  createProduct,
  findProductById,
  updateProduct,
} from "~/models/productModel";

export const updateProductService = async (req) => {
  try {
    const id = req.params.id;
    const findedProduct = await findProductById(id);
    if (!findedProduct)
      throw new ApiError(StatusCodes.NOT_FOUND, "Product not found");
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
      warranty,
    } = req.body;
    const images = req?.files?.["image"];

    const data = {};

    if (deviceCode) data.deviceCode = deviceCode;
    if (name) data.name = name;
    if (price) data.price = parseFloat(price.replace(/\./g, ""));
    if (stock) data.stock = parseInt(stock);
    if (information) data.information = information;
    if (techSpecification)
      data.techSpecification = JSON.parse(techSpecification);
    if (brand) data.brand = brand;
    if (discount) data.discount = parseFloat(discount);
    if (typeDevice) data.typeDevice = typeDevice;
    if (year) data.year = parseInt(year);
    if (warranty) data.warranty = warranty;

    if (images && images.length > 0) {
      const uploadPromises = images.map((image) =>
        cloudinary.uploader.upload(image.path, {
          folder: "Sale/products",
        })
      );

      const uploadResults = await Promise.all(uploadPromises);
      data.imageList = uploadResults.map((result) => result.secure_url);
    }

    await updateProduct({ _id: findedProduct._id }, { $set: data });
    return findProductById(id);
  } catch (error) {
    throw error;
  }
};
