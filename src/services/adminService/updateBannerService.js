import { v2 as cloudinary } from "cloudinary";
import { StatusCodes } from "http-status-codes";
import { bannerPosition } from "~/enum/typeDevice";
import { findBannerById, updateBanner } from "~/models/bannerModel";
import ApiError from "~/utils/ApiError";

export const updateBannerService = async (req) => {
  try {
    const id = req.params.id;
    const position = req?.body?.position || null
    const images = req?.files?.["image"] || [];
    const banner = await findBannerById(id);
    if(!banner) throw new ApiError(StatusCodes.NOT_FOUND, "Banner not found");

    let doc0 = {}


    if(position && bannerPosition.includes(position)) doc0.position = position

    if (images && images.length == 1 ) {
      const uploadPromises = images.map((image) =>
        cloudinary.uploader.upload(image.path, {
          folder: "Sale/banners",
        })
      );

      const uploadResults = await Promise.all(uploadPromises);
      doc0.imageURL = uploadResults[0].secure_url;
    }

    doc0.updateAt = Date.now()

    await updateBanner({_id: banner._id}, {$set: doc0})
    return await findBannerById(banner._id)

  } catch (error) {
    throw error
  }
}