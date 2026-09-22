import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minLength:2,
        maxLength:50,
    },
   description: {
        type:String,
        required:true,
        minLength:10,
        maxLength:500,
    },
    images:{
        type:[{
            type:String
        }],
        validate:{
            validator: Array.images.length<5,
            message:"A product can have only 5 images"
        }
    },
    price:{
        amount:{
            type:number,
            required:true,
        },
        currency:{
            type:String,
            default:"INR",
            enum:["INR","USD"]
        }
    },
    sizes:{
       Size:{
        type:String,
        enum:["XS","S","M","L","XL","XXL"],
        required:true,
       } ,
       stock:{
        type:Number,
        min:0,
        default:0,
       }
    },

  seller:{
        type:mongoose.Types.objectId,
        refs:users,
        required:true
    }
})

const productModel = mongoose.Model("product",productSchema);

export default productModel;