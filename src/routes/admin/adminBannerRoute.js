import { Router } from "express";
import { createBannerController } from "~/controllers/admin/createBannerController";
import { deleteBannerController } from "~/controllers/admin/deleteBannerController";
import { updateBannerController } from "~/controllers/admin/updateBannerController";
import { checkJWT } from "~/middlewares/checkJWT";
import { rejectUser } from "~/middlewares/rejectUser";
import { uploadBanner } from "~/providers/storageProduct";
const router = Router();

router.post("/", 

  checkJWT, 
  // rejectUser, 
  uploadBanner.fields([{ name: "image", maxCount: 1 }]),
  createBannerController);

router.patch(
  "/:id",
  checkJWT, 
  // rejectUser, 
  uploadBanner.fields([{ name: "image", maxCount: 1 }]),
  updateBannerController
);

router.delete(
  "/:id",
  checkJWT, 
  // rejectUser, 
  deleteBannerController
  
);
export default router;
