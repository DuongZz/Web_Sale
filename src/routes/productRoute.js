import { Router } from "express";
import { getProductController } from "~/controllers/product/getProductController";
import { getInfoProductController } from "~/controllers/product/getInfoProductController";

const router = Router();
router.get("/:slug", getInfoProductController);
router.get("/", getProductController);

export default router;
