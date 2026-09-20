import userModel from "../model/user.Model.js";
import  bcrypt from "bcryptjs"
import { CreateAccessToken, CreateRefreshToken } from "../utils/Auth.utils.js";
import cookie from "cookie-parser";

export const registerController = async (req , res)=>{
    const {name, email,password} = req.body

    const isAlreadyExists = await userModel.findOne({email})

    if(isAlreadyExists){
        return res.status(400).json({
            message:"user is already exist with this email address",
            errors:{
                  path:"email",
                  msg:"user is already exist with this email address"
            }
        })
    }

    const user = await userModel.create({
        name,
        email,
        passwordhash: await bcrypt.hash(password,12)

    })

    const accessToken  = CreateAccessToken({
        userId:user._id,
        role:user.role
    })
    
     const refreshToken = CreateRefreshToken({
        userId:user._id,
        role:user.role
     })

     console.log("refreshToken =>", refreshToken)
    
     await userModel.findByIdAndUpdate(user._id,{
        RefreshToken:refreshToken,
     })

     res.cookie("refreshToken",refreshToken,{
        httpOnly:true
     })


     res.status(201).json({
        message:"user register successfully",
        data:{
            user:{
                name:user.name,
                email:user.email,
                id:user._id
            },
            accessToken,
        }
     })


}

export const  loginController =  async (req,res)=>{
  
    const {email,password} = req.body

    

    const user = await userModel.findOne({email})

    if(!user){
        return res.status(400).json({
            message:"invalid email or password"
        })
    }

    const ispasswordValid = await bcrypt.compare(password,user.passwordhash);

    if(!ispasswordValid){
        return res.status(400).json({
            message:"invalid email or password"
        })
    }

    const accessToken = CreateAccessToken({
        userId:user._id,
        role:user.role,
    })

    const refreshToken = CreateRefreshToken({
        userId:user._id,
        role:user.role,
    })

    await userModel.findByIdAndUpdate(user._id,{
        RefreshToken:refreshToken,
    })

    res.cookie("refreshToken",refreshToken,{
        httpOnly:true
    })

    res.status(201).json({
        message:"user login successfully",
        data:{
            user:{
                name:user.name,
                email:user.email
            },
            accessToken
        }
    })

}