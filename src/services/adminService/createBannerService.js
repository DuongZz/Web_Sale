import { v2 as cloudinary } from "cloudinary";
import { createBanner, findBannerById } from "~/models/bannerModel";

export const createBannerService = async (req) => {
  try {
    const position = req.body.position 
    const images = req.files["image"];
    const data = {
      position
    }

    if (images && images.length == 1 ) {
      const uploadPromises = images.map((image) =>
        cloudinary.uploader.upload(image.path, {
          folder: "Sale/banners",
        })
      );

      const uploadResults = await Promise.all(uploadPromises);
      data.imageURL = uploadResults[0].secure_url;
    }

    const createdBanner = await createBanner(data)
    const newBanner = await findBannerById(createdBanner.insertedId)
    return newBanner

  } catch (error) {
    throw new Error(error)
  }
}