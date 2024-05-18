import { findBannerById, updateBanner } from "~/models/bannerModel";

export const deleteBannerService = async (req) => {
  try {
    const id = req.params.id;
    const banner = await findBannerById(id);
    if(!banner) throw new ApiError(StatusCodes.NOT_FOUND, "Banner not found");
    await updateBanner({_id: banner._id}, {$set: {_destroy: true}})
  } catch (error) {
    throw error;
  }
}