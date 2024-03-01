import express from 'express'
import protectedRoute from '../middlewares/protectRoute.js'
import { getUserById } from '../controllers/user.js'



const router = express.Router()


router.get("/getuser/:id", protectedRoute, getUserById)




export default router