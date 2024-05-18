import { StatusCodes } from "http-status-codes";
import { getPromotionPolicysService } from "~/services/promotionPolicy/getPromotionPolicysService";

export const getPromotionPolicysController = async (req, res, next) => {
  try {
    const promotionPolicys = await getPromotionPolicysService(req)

    res.status(StatusCodes.CREATED).json({
      message: "Get Promotion Policys successfully",
      length: promotionPolicys.length,
      promotionPolicys,
    });
  } catch (error) {
    next(error);
  }
}