import { Router } from "express";
import { createOrderController } from "~/controllers/order/createOrderController";
import { updateStatusOrderController } from "~/controllers/order/updateStatusOrderController";

const router = Router();
router.post("/", createOrderController);
router.post("/update", updateStatusOrderController);
export default router;
