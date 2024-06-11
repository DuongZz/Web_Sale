import { Router } from "express";
import staffRoute from "~/routes/admin/staffRoute.js";
import adminProdRoute from "./admin/adminProdRoute.js";
import adminBannerRoute from "./admin/adminBannerRoute.js";
import adminPromotionPolicyRoute from "./admin/adminPromotionPolicyRoute.js";
import adminAuthRoute from "./admin/adminAuthRoute.js";
import { checkJWTAdmin } from "~/middlewares/checkJWTAdmin.js";
import { checkAdminRole } from "~/middlewares/checkAdminRole.js";
import { rejectUser } from "~/middlewares/rejectUser.js";
import adminOrderRoute from "~/routes/admin/adminOrderRoute.js";
const router = Router();

router.use("/auth", adminAuthRoute);
router.use(checkJWTAdmin);
router.use(rejectUser);
router.use("/product", adminProdRoute);
router.use("/banner", adminBannerRoute);
router.use("/promotion", adminPromotionPolicyRoute);
router.use("/order", adminOrderRoute);

router.use(checkAdminRole);
router.use("/staff", staffRoute);

export default router;
