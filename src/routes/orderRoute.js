import { Router } from "express";
import { createOrderController } from "~/controllers/order/createOrderController";

const router = Router();
router.post("/", createOrderController);
export default router;
