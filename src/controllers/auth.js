import User from "../models/auth"
import bcrypt from "bcryptjs"
import { signinSchema, signupSchema  } from "../schemas/auth"
import jwt from "jsonwebtoken"

export const signup =async (req,res)=>{
        try {
                const {name,email,password} = req.body

                const {error} = signupSchema.validate(req.body,{abortEarly:false})
                if(error){
                        const errors = error.details.map(err=>err.message)
                        return res.json({message:errors})
                }
                const userExit =await User.findOne({email})
                if(userExit){
                        return res.json({
                                message:"Email đăng kí đã tồn tại"
                        })
                }
                const hashPassword = await bcrypt.hash(password,10)

                const user = await User.create({
                        email,
                        name,
                        password:hashPassword
                })
                user.password = undefined
                return res.json({
                        user:user,
                        message:"Đăng kí thành công"
                })
        } catch (error) {
                return res.json({
                        messages:error.message
                })
                
        }
}

export const signin = async (req, res) => {
        try {
                const {email,password} = req.body
                const {error} = signinSchema.validate(req.body,{abortEarly:false})
                if(error){
                        const errors = error.details.map(err=>err.message)
                        return res.json({
                                message:errors
                        })
                }
                const user = await User.findOne({email})
                if(!user){
                        return res.json({
                                message:"Tài khoản không tồn tại"
                        })
                }
                const isMatch = await bcrypt.compare(password,user.password)
                if(!isMatch){
                        return res.json({
                                message:"Mật khẩu không đúng"
                        })
                }
                const token = jwt.sign({id:user._id},"123456",{expiresIn:"1h"})
                return res.json({
                        message:"Đăng nhập thành công",
                        accessToken:token,
                        user
                })
        } catch (error) {
                return res.json({
                        message:error.message
                })
        }
}
