import { StatusCodes } from "http-status-codes";
import { deletePromotionPolicyService } from "~/services/adminService/deletePromotionPolicyService";

export const deletePromotionPolicyController = async (req, res, next) => {
  try {
    await deletePromotionPolicyService(req);

    res.status(StatusCodes.NO_CONTENT).json();
  } catch (error) {
    next(error);
  }
}