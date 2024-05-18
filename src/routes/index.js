import { Router } from "express";
import userRoute from './userRoute.js'
import adminRoute from './adminRoute.js'
import productRoute from './productRoute.js'
import authRoute from './authRoute.js'
import bannerRoute from './bannerRoute.js'
import promotionPolicyRoute from './promotionPolicyRoute.js'
const router = Router();

router.use('/user', userRoute)
router.use('/admin', adminRoute)
router.use('/product', productRoute)
router.use('/auth', authRoute)
router.use('/banner', bannerRoute);
router.use('/promotion', promotionPolicyRoute);

export default router;
