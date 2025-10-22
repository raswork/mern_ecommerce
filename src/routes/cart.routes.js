import { Router } from "express";

import {addOrUpdateCartItems,getMyCart,removeCartItem,clearCart} from '../controllers/cart.controller.js'

import {verifyjwt} from '../middlewares/auth.middleware.js'

const router = Router()

router.post("/add",verifyjwt,addOrUpdateCartItems)
router.get("/",verifyjwt,getMyCart)
router.delete("/remove",verifyjwt,removeCartItem)
router.delete("/clear",verifyjwt,clearCart)

export default router