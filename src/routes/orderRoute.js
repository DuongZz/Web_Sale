import { Router } from "express";
import { cancelOrderController } from "~/controllers/order/cancelOrderController";
import { createOrderController } from "~/controllers/order/createOrderController";

const router = Router();
router.post("/", createOrderController);
router.post("/cancel/:id", cancelOrderController);
export default router;
