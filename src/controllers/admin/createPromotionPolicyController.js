import { StatusCodes } from "http-status-codes";
import { createPromotionPolicyService } from "~/services/adminService/createPromotionPolicyService";

export const createPromotionPolicyController = async (req, res, next) => {
  try {
    const promotionPolicy = await createPromotionPolicyService(req)

    res.status(StatusCodes.CREATED).json({
      message: "Created promotion policy successfully",
      promotionPolicy,
    });
  } catch (error) {
    next(error);
  }
}