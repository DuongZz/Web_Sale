import { Router } from "express";
import { createStaffController } from "~/controllers/adminController/createStaffController";
import { staffValidation } from "~/validations/staffValidate.js";
import { checkAdminRole } from "~/middlewares/checkAdminRole";
import { checkJWT } from "~/middlewares/checkJWT";

const router = Router();

router.post(
  "/create-staff-acc",
  staffValidation.validateStaff,
  checkJWT,
  checkAdminRole,
  createStaffController
);
export default router;
