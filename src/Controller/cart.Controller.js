import productModel from "../model/product.Model.js"


export const addToCartController = async (req,res)=>{

    const {productId,quantity,size} = req.body

    const product = await productModel.findById(productId)

    if(!product){
        return res.status(404).json({
            message: "product not found"
        })
    }

    const selectedSizes = product.sizes.find(s=> s.size===size)

    if(!selectedSizes){
        return res.status(400).json({
            message:"invalid size"
        })
    }

    if(selectedSizes.stock < quantity){

        return res.satus(400).json({
            message:"Insufficient stock"
        })
    }
}