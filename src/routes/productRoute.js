import { Router } from "express";
import { getProductController } from "~/controllers/product/getProductController";
import { getInfoProductController } from "~/controllers/product/getInfoProductController";
import { checkJWT } from "~/middlewares/checkJWT";
import { createRateProdController } from "~/controllers/product/createRateProdController";

const router = Router();
router.get("/:slug", getInfoProductController);
router.get("/", getProductController);
router.post("/rate/:id", checkJWT, createRateProdController);

export default router;
