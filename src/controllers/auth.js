import User from "../models/auth"
import bcrypt from "bcryptjs"
import { signinSchema, signupSchema  } from "../schemas/auth"
import jwt from "jsonwebtoken"
import Joi from "joi"

const UserSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.number().required()
    });

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
export const remove = async (req, res) => {
        try {
            const data = await User.findByIdAndDelete(req.params.id);
            return res.json({
                message: "Xóa tài khoản thành công",
                data,
            });
        } catch (error) {
            return res.status(400).json({
                message: error.message,
            });
        }
    };

    export const update = async (req ,res )=>{
        try{
            const{error}= UserSchema.validate(req.body,{abortEarly:false});
            if (error) {
                return res.json({
                  messages: error.details.map((err) => err.message),
                });
            }
            const data = await User.findByIdAndUpdate(
                { _id: req.params.id },
                req.body,
                { new: true }
              );
              !data
              ? res.json({ message: "Cập nhật User không thành công" })
              : res.json({ message: "Cập nhật User  thành công", data });
        }catch (error) {
            return res.json({ message: error.message });
          }
    };
    export const getAll = async (req, res) => {
        try {
            const data = await User.find();
            if (data.length == 0) {
                return res.json({
                    message: "Không có tài khoản nào",
                });
            }
            return res.json(data);
        } catch (error) {
                return res.status(400).json({
                    message: error.message,
                });
            }
    };

