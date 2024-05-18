import { getPromotionPolicy } from "~/models/promotionPolicyModel"

export const getPromotionPolicysService = async (req) => {
  try {
    const typeDevice = req?.query?.typeDevice || null
    const _destroy = Boolean(req?.query?._destroy) || false
    let query = {_destroy: _destroy}
    if(typeDevice) query.typeDevice = typeDevice
    const promotionPolicy = await getPromotionPolicy(query)
    return promotionPolicy
  } catch (error) {
    throw error
  }
}