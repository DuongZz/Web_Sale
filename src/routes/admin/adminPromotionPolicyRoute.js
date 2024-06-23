import { Router } from "express";
import { createPromotionPolicyController } from "~/controllers/admin/createPromotionPolicyController";
import { deletePromotionPolicyController } from "~/controllers/admin/deletePromotionPolicyController";
import { updatePromotionPolicyController } from "~/controllers/admin/updatePromotionPolicyController";


const router = Router();

router.post(
  "/",
  createPromotionPolicyController
);

router.patch(
  "/:id",
  updatePromotionPolicyController
);

router.delete(
  "/:id",
  deletePromotionPolicyController
);


export default router;
