import { Router } from "express";
import { getAllProducts,getProductById,createProduct,deleteProduct } from "../controllers/product.controller";
import { upload } from "../middlewares/multer";
import {verifyjwt} from "../middlewares/auth.middleware.js"


const router=Router()

router.get('/',getAllProducts)
router.get('/:productId',getProductById)
router.post('/',verifyjwt,upload.single('image'),createProduct)
router.delete('/:id',verifyjwt,deleteProduct)

export default router