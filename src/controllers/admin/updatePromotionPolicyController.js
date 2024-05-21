import { StatusCodes } from "http-status-codes";
import { updatePromotionPolicyService } from "~/services/adminService/updatePromotionPolicyService";

export const updatePromotionPolicyController = async (req, res, next) => {
  try {
    const promotionPolicy = await updatePromotionPolicyService(req);

    res.status(StatusCodes.OK).json({
      message: "Update Promotion Policy successfully",
      promotionPolicy,
    });
  } catch (error) {
    next(error);
  }
}