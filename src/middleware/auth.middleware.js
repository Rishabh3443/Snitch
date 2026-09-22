import userModel from "../model/user.Model.js";
import { ReadAccessToken } from "../utils/Auth.utils.js"


const authMiddleware = (req,res,next)=>{

   const accessToken = req.headers.authorization?.split(" ")[1]

   console.log("accessToken", accessToken)

   if(!accessToken){
    return res.status(400).json({
        message:"accessToken not found"
    })
   }

   try {

    const decoded = ReadAccessToken(accessToken);

    const {userId , role} = decoded;
    console.log("id",userId)

   req.user = decoded

   next()



   } catch (error) {
     
       res.status(400).json({
        message:"invalid or expired accessToken"
       })
   }

   
}

export default authMiddleware