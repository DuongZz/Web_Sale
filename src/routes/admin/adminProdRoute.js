import { Router } from "express";
import { checkAdminRole } from "~/middlewares/checkAdminRole";
import { checkJWT } from "~/middlewares/checkJWT";
import { productValidation } from "~/validations/productValidate";
import { postProductController } from "~/controllers/admin/postProductController";
import { uploadProduct } from "~/providers/storageProduct";
const router = Router();
router.post(
  "/",
  uploadProduct.fields([{ name: "image", maxCount: 20 }]),
  productValidation.validateProduct,
  checkJWT,
  checkAdminRole,
  postProductController
);


export default router;
