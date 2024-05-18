import { Router } from "express";
import { createStaffController } from "~/controllers/admin/createStaffController";
import { staffValidation } from "~/validations/staffValidate.js";
import { checkAdminRole } from "~/middlewares/checkAdminRole";

const router = Router();

router.post(
  "/",
  staffValidation.validateStaff,
  createStaffController
);


export default router;
