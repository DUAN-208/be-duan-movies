import express from 'express'
import { remove, signin, signup } from '../controllers/auth'


const router = express.Router()

router.post('/signup',signup)
router.post('/signin',signin)
router.delete("/delete/:id", remove);
export default router