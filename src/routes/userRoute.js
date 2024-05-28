import { Router } from "express";
import { getMe } from "~/controllers/user/getMe";
import { getMyOrder } from "~/controllers/user/getMyOrder";
import { checkJWT } from "~/middlewares/checkJWT";

const router = Router();
router.use(checkJWT);
router.get("/me", getMe);
router.get("/my-order", getMyOrder);

export default router;
