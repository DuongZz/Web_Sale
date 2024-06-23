import { Router } from "express";
import { getBannersController } from "~/controllers/banner/getBannerController";
const router = Router();

router.get("/", getBannersController);

export default router;
