import { Router } from "express";
import { createStaffController } from "~/controllers/admin/createStaffController";
import { staffValidation } from "~/validations/staffValidate.js";
import { updateStaffController } from "~/controllers/admin/updateStaffController";
import { deleteStaffController } from "~/controllers/admin/deleteStaffController";
import { getStaffListController } from "~/controllers/admin/getStaffListController";

const router = Router();

router.post("/", staffValidation.validateStaff, createStaffController);

router.get("/", getStaffListController);

router.patch("/:id", updateStaffController);

router.delete("/:id", deleteStaffController);

router.get("/:id");

export default router;
