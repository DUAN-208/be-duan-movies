import express from 'express'


import { signin, signup, update ,remove, getAll, getOne} from '../controllers/auth'
import { checkPermission } from '../middlewares/checkPermission'



const router = express.Router()

router.post('/signup',signup)
router.post('/signin',signin)
router.delete("/delete-user/:id",checkPermission, remove);
router.patch('/update-user/:id',checkPermission,update);
router.get('/getOne-user/:id',getOne);
router.get('/getall-user',getAll)
export default router

