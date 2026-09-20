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
        required:true,
        default:user,
        enum:["user","Seller"]
    },
    Refreshtoken:{
        type:String,
        
    }
})

const userModel = mongoose.model("user", userSchema)

export default userModel;