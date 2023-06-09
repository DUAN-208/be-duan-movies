import express from 'express'


import { signin, signup, update ,remove, getAll} from '../controllers/auth'



const router = express.Router()

router.post('/signup',signup)
router.post('/signin',signin)
router.delete("/delete/:id", remove);
router.patch('/update/:id',update);
router.get('/getall-user',getAll)
export default router

