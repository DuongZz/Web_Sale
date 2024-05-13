import { Router } from "express";
import { createStaffController } from "~/controllers/adminController/createStaffController";
import { createStaffService } from "~/services/adminService/createStaffService";
import { staffValidation } from "~/validations/staffValidation";
import { checkAdminRole } from "~/middlewares/checkAdminRole";
import { checkJWT } from "~/middlewares/checkJWT";

const router = Router();

router.post(
  "/create-staff-acc",
  staffValidation.validateStaff,
  checkJWT,
  checkAdminRole,
  createStaffService,
  createStaffController
);
export default router;
