import { Router } from "express";
import userRoute from './userRoute.js'
import adminRoute from './adminRoute.js'
import productRoute from './productRoute.js'
import authRoute from './authRoute.js'

const router = Router();

router.use('/user', userRoute)
router.use('/admin', adminRoute)
router.use('/product', productRoute)
router.use('/auth', authRoute)

export default router;
