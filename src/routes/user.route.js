import { Router } from "express";
import { upload } from "../middlewares/multerUpload.js";


const router=Router()

router.route('/register').post(
    upload.fields([
        {name:"avatar",maxCount:1},
        {name:"coverImage",maxCount:1}
    ])
)

export default router