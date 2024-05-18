import { Router } from "express";
import { createBannerController } from "~/controllers/admin/createBannerController";
import { deleteBannerController } from "~/controllers/admin/deleteBannerController";
import { updateBannerController } from "~/controllers/admin/updateBannerController";
import { uploadBanner } from "~/providers/storageProduct";
const router = Router();

router.post("/", 
  uploadBanner.fields([{ name: "image", maxCount: 1 }]),
  createBannerController);

router.patch(
  "/:id",
  uploadBanner.fields([{ name: "image", maxCount: 1 }]),
  updateBannerController
);

router.delete(
  "/:id",
  deleteBannerController
  
);
export default router;
