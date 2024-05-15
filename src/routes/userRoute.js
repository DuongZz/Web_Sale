import { Router } from "express";
import { register } from "~/controllers/auth/registerController";
import { existingEmail } from "~/middlewares/checkEmail";
import { userValidation } from "~/validations/userValidate";
import { login } from "~/controllers/auth/loginController";
import { logout } from "~/controllers/userController/logOut";

const router = Router();

router.post("/register", userValidation.validateUser, existingEmail, register);
router.post("/login", userValidation.validateUser, login);
router.post("/logOut", logout);
export default router;
