import { Router } from "express";
import { findAllProductController } from "~/controllers/product/findAllProductController";
import { getInfoProductController } from "~/controllers/product/getInfoProductController";

const router = Router();

router.get("/:slug", getInfoProductController);
router.get("/", findAllProductController);
export default router;
