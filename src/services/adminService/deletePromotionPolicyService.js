import { findPromotionPolicyById, updatePromotionPolicy } from "~/models/promotionPolicyModel";

export const deletePromotionPolicyService = async (req) => {
  try {
    const id = req.params.id;
    const  promotionPolicy= await findPromotionPolicyById(id);
    if(!promotionPolicy) throw new ApiError(StatusCodes.NOT_FOUND, "Promotion Policy not found");
    await updatePromotionPolicy({_id: promotionPolicy._id}, {$set: {_destroy: true}})
  } catch (error) {
    throw error;
  }
}