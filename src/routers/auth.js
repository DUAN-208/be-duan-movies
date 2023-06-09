import express from 'express'
import { signin, signup, update } from '../controllers/auth'


const router = express.Router()

router.post('/signup',signup)
router.post('/signin',signin)
router.patch('/update/:id',update)

export default router
