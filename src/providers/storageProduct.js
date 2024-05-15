import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "~/config/cloudinary";
import multer from "multer";
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "Sale/products",
  allowed_formats: ["jpg", "png", "jpeg", "webp"],
});

export const upload = multer({
  storage: storage,
});
