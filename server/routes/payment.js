import express from 'express'
import protectedRoute from '../middlewares/protectRoute.js'
import { checkoutController, getKey, getOrdersController, paymentVerificationController } from '../controllers/payment.js'


const router = express.Router()

router.get("/getkey", protectedRoute, getKey)
router.post("/checkout", protectedRoute, checkoutController)
router.post("/paymentverification", protectedRoute, paymentVerificationController)
router.get("/getOrders", protectedRoute, getOrdersController)


export default router