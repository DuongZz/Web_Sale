import { Router } from "express";
import { getMe } from "~/controllers/user/getMe";
import { checkJWT } from "~/middlewares/checkJWT";

const router = Router();

router.get("/me", checkJWT, getMe)

export default router;
