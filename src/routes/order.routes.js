import { Router } from "express";
import { verifyjwt } from '../middlewares/auth.middleware.js'
import { createOrder,getAllOrders,getOrderById,updateOrder } from "../controllers/order.controller.js";

const router = Router()

router.route('/').post(verifyjwt,createOrder)
router.route('/my-orders').get(verifyjwt,getAllOrders)
router.route('/:id').get(verifyjwt,getOrderById)
router.route('/:id').patch(verifyjwt,updateOrder)

export default router