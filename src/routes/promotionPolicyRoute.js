import { Router } from "express";
import { getPromotionPolicysController } from "~/controllers/promotionPolicy/getPromotionPolicysController";

const router = Router();

router.get("/", getPromotionPolicysController);

export default router;
