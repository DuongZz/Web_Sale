import { Router } from "express";
import { checkAdminRole } from "~/middlewares/checkAdminRole";
import { productValidation } from "~/validations/productValidate";
import { postProductController } from "~/controllers/admin/postProductController";
import { uploadProduct } from "~/providers/storageProduct";
import { deleteProductController } from "~/controllers/admin/deleteProductController";
import { updateProductController } from "~/controllers/admin/updateProductController";
const router = Router();
router.post(
  "/",
  uploadProduct.fields([{ name: "image", maxCount: 20 }]),
  productValidation.validateProduct,
  postProductController
);
router.delete("/:id", deleteProductController);
router.patch(
  "/:id",
  uploadProduct.fields([{ name: "image", maxCount: 20 }]),
  updateProductController
);

export default router;
