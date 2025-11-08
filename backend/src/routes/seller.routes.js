import { Router } from "express";
import {createSeller,sellerProfile,sellerProfileById,deleteSeller} from '../controllers/seller.controller.js'
import {verifyjwt} from "../middlewares/auth.middleware.js"


const router = Router()
router.post("/",verifyjwt,createSeller)
router.get("/me",verifyjwt,sellerProfile)
router.get("/:id",verifyjwt,sellerProfileById)
router.delete("/",verifyjwt,deleteSeller)

export default router