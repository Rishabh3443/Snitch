import jwt from "jsonwebtoken";
import Config from "../config/config";


export const CreateAccessToken = ()=>{
  
    const accessToken = jwt.sign({
        userId,
        role
    },Config.ACCESS_SECRET,{expiresIn:"15min"})

    return accessToken;
}

export const ReadAccessToken = (accessToken)=>{
  return jwt.verify(accessToken,Config.ACCESS_SECRET);
}


export const CreateRefreshToken = ()=>{
    const refreshToken = jwt.sign({
        userId,
        role
    },Config.REFRESH_SECRET,{expiresIn:"7days"})

    return refreshToken;
}

export const ReadRefreshToken = (refreshToken)=>{
    return jwt.verify(refreshToken,Config.REFRESH_SECRET);
}

