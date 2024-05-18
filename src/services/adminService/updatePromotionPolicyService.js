
import { StatusCodes } from "http-status-codes";
import { findPromotionPolicyById, updatePromotionPolicy } from "~/models/promotionPolicyModel";
import ApiError from "~/utils/ApiError";

export const updatePromotionPolicyService = async (req) => {
  try {
    const id = req.params.id;
    const {
      typeDevice,
      description
    } = req?.body
    let doc0 = {}
    const promotionPolicy = await findPromotionPolicyById(id)
    if(!promotionPolicy) throw new ApiError(StatusCodes.NOT_FOUND, "Promotion Policy not found");

    if(typeDevice && [
      "Camera",
      "Component",
      "Headphone",
      "Keyboard",
      "Laptop",
      "Monitor",
      "Mouse",
      "Pc",
      ].includes(typeDevice)) doc0.typeDevice = typeDevice;
    if(description) doc0.description = description;
    doc0.updateAt = Date.now()

    await updatePromotionPolicy({_id: promotionPolicy._id}, {$set: doc0})
    return await findPromotionPolicyById(promotionPolicy._id)

  } catch (error) {
    throw error
  }
}