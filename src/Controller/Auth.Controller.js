import userModel from "../model/user.Model.js";
import bcrypt from "bcryptjs"
import { CreateAccessToken, CreateRefreshToken, ReadRefreshToken } from "../utils/Auth.utils.js";
import cookie from "cookie-parser";

export const registerController = async (req, res) => {
    const { name, email, password } = req.body

    const isAlreadyExists = await userModel.findOne({ email })

    if (isAlreadyExists) {
        return res.status(400).json({
            message: "user is already exist with this email address",
            errors: {
                path: "email",
                msg: "user is already exist with this email address"
            }
        })
    }

    const user = await userModel.create({
        name,
        email,
        passwordhash: await bcrypt.hash(password, 12)

    })

    const accessToken = CreateAccessToken({
        userId: user._id,
        role: user.role
    })

    const refreshToken = CreateRefreshToken({
        userId: user._id,
        role: user.role
    })

    console.log("refreshToken =>", refreshToken)

    await userModel.findByIdAndUpdate(user._id, {
        RefreshToken: refreshToken,
    })

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true
    })


    res.status(201).json({
        message: "user register successfully",
        data: {
            user: {
                name: user.name,
                email: user.email,
                id: user._id
            },
            accessToken,
        }
    })


}

export const loginController = async (req, res) => {

    const { email, password } = req.body



    const user = await userModel.findOne({ email })

    if (!user) {
        return res.status(400).json({
            message: "invalid email or password"
        })
    }

    const ispasswordValid = await bcrypt.compare(password, user.passwordhash);

    if (!ispasswordValid) {
        return res.status(400).json({
            message: "invalid email or password"
        })
    }

    const accessToken = CreateAccessToken({
        userId: user._id,
        role: user.role,
    })

    const refreshToken = CreateRefreshToken({
        userId: user._id,
        role: user.role,
    })

    await userModel.findByIdAndUpdate(user._id, {
        RefreshToken: refreshToken,
    })

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true
    })

    res.status(201).json({
        message: "user login successfully",
        data: {
            user: {
                name: user.name,
                email: user.email
            },
            accessToken
        }
    })

}

export const refreshController = async (req, res) => {

    const refreshToken = req.cookies.refreshToken

    

    if (!refreshToken) {
        return res.status(400).json({
            message: "refresh token not found"
        })
    }




    const decoded = ReadRefreshToken(refreshToken)

    const { userId, role } = decoded

    
    

    const user = await userModel.findById(userId )

    console.log(user.RefreshToken);
    

    if (refreshToken != user.RefreshToken) {

        await userModel.findByIdAndUpdate(user._id, {
            RefreshToken: null
        })

        return res.status(401).json({
            message: "refresh token mismatch"
        })

    }

    const accessToken = CreateAccessToken({ userId, role })

    const { refreshToken: newRefreshToken } = CreateRefreshToken({ userId, role })

    await userModel.findByIdAndUpdate(user._id, {
        RefreshToken: newRefreshToken
    })

    res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true
    })

    res.status(201).json({
        message: "token rotated successfully",
        user: {
            name: user.name,
            name: user.email,
        },
        accessToken
    })

} 


export const authmeController = async (req,res)=>{
    const {userId} = req.user

    const user = await userModel.findById({userId})

    res.status(201).json({
        message:"user fetched successfully",
        data:{
            user:{
                name:user.name,
                email:user.email,
                id:user._id
            }
        }
    })
}