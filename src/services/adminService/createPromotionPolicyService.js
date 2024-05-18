import { createPromotionPolicy, findPromotionPolicyById } from "~/models/promotionPolicyModel"

export const createPromotionPolicyService = async (req) => {
  try {
    const {
      typeDevice,
      description
    } = req.body

    const promotionPolicy = await createPromotionPolicy({typeDevice: typeDevice, description: description})
    return await findPromotionPolicyById(promotionPolicy.insertedId)
    
  } catch (error) {
    throw error
  }
}