import { Router } from "express";
import { login } from "~/controllers/admin/adminLoginController";
import { logout } from "~/controllers/admin/adminLogoutController";
import { checkJWTAdmin } from "~/middlewares/checkJWTAdmin";

const router = Router();

router.post('/login', login)
router.post('/logout', checkJWTAdmin, logout)

export default router;
