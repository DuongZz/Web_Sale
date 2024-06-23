import { Router } from "express";
import { updateStatusOrderController } from "~/controllers/admin/updateStatusOrderController";
import { getOrderController } from "~/controllers/order/getOrderController";

const router = Router();
router.post("/update-status", updateStatusOrderController);
router.get("/", getOrderController);

export default router;
