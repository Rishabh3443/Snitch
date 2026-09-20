import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    passwordhash:{
        type:String,
        required:true,
        minlength:7,
    },
    role:{
        type:String,
        default:"user",
        enum:["user","Seller"]
    },
    RefreshToken:{
        type:String,
        
    }
})

const userModel = mongoose.model("user", userSchema)

export default userModel;