import { Router } from "express";
import { checkAdminRole } from "~/middlewares/checkAdminRole";
import { checkJWT } from "~/middlewares/checkJWT";
import { productValidation } from "~/validations/productValidate";
import { postProductController } from "~/controllers/product/postProductController";
import { upload } from "~/providers/storageProduct";
const router = Router();
router.post(
  "/post",
  upload.fields([{ name: "image", maxCount: 20 }]),
  productValidation.validateProduct,
  checkJWT,
  checkAdminRole,
  postProductController
);

export default router;