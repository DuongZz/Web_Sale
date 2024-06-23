import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "~/config/cloudinary";
import multer from "multer";
const storageProduct = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "Sale/products",
  allowed_formats: ["jpg", "png", "jpeg", "webp"],
});

const storageBanner = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "Sale/products",
  allowed_formats: ["jpg", "png", "jpeg", "webp"],
});

export const uploadProduct = multer({
  storage: storageProduct,
});

export const uploadBanner = multer({
  storage: storageBanner,
});
