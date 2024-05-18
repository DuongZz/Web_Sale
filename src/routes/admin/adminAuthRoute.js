import { Router } from "express";
import { getMe } from "~/controllers/admin/adminGetMeController";
import { login } from "~/controllers/admin/adminLoginController";
import { logout } from "~/controllers/admin/adminLogoutController";
import { checkJWTAdmin } from "~/middlewares/checkJWTAdmin";

const router = Router();

router.post('/login', login)
router.post('/logout', checkJWTAdmin, logout)
router.post('/getme', checkJWTAdmin, getMe)

export default router;
