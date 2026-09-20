import userModel from "../model/user.Model.js";
import { ReadAccessToken } from "../utils/Auth.utils.js"


const authMiddleware = (req,res,next)=>{

   const accessToken = req.headers.Authorization?.split("")[1]

   if(!accessToken){
    return res.status(201).json({
        message:"accessToken not found"
    })
   }

   try {

    const decoded = ReadAccessToken(accessToken);

   req.user = decoded

   next()



   } catch (error) {
     
       res.status(400).json({
        message:"invalid or expired accessToken"
       })
   }

   
}

export default authMiddleware