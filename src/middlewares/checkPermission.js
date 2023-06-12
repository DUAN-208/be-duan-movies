import jwt from 'jsonwebtoken';
import  User from '../models/auth';


export const checkPermission =async (req, res, next) => {
        try {
                if(!req.headers.authorization){
                        return res.json(1)
                }
                const token = req.headers.authorization.split(" ")[1]
                const {id} = jwt.verify(token,'123456')
                const user = await User.findById(id)

                if(user.role != 'admin'){
                        return res.json(1)
                }
                next()
        } catch (error) {
                return res.json({ message: error.message });

                
        }
}