import { Router } from "express";
import { updateStatusOrderController } from "~/controllers/admin/updateStatusOrderController";

const router = Router();
router.post("/update-status", updateStatusOrderController);

export default router;
