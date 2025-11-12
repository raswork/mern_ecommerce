import {Router} from 'express'
import {registerUser,loginUser,logoutUser,getAllUsers,getProfile,refreshAccessToken} from '../controllers/user.controller.js'
import { upload } from '../middlewares/multer.js'
import { verifyjwt } from '../middlewares/auth.middleware.js'


const router=Router()

router.route("/register").post(upload.single("avatar"),registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyjwt,logoutUser)
router.route("/profile").get(verifyjwt,getProfile)
router.route("/allusers").get(verifyjwt,getAllUsers)
router.route("/refresh").get(refreshAccessToken)
//file name is avatar and it should match with frontend side

export default router