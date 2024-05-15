import { Router } from "express";
import staffRoute from "~/routes/admin/staffRoute.js"
import adminProdRoute from "./admin/adminProdRoute"; 
const router = Router();


router.use('/staff', staffRoute)
router.use('/product', adminProdRoute)

export default router;
