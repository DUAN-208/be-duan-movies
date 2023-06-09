import express from 'express'


import { signin, signup, update ,remove} from '../controllers/auth'



const router = express.Router()

router.post('/signup',signup)
router.post('/signin',signin)
router.delete("/delete/:id", remove);
router.patch('/update/:id',update)

export default router

