import { Router } from "express";
import staffRoute from "~/routes/admin/staffRoute.js"
import adminProdRoute from "./admin/adminProdRoute.js"; 
import adminBannerRoute from "./admin/adminBannerRoute.js"
const router = Router();


router.use('/staff', staffRoute)
router.use('/product', adminProdRoute)
router.use('/banner', adminBannerRoute)


export default router;
