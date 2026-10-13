
import cartModel from "../model/cart.Model.js"
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

    const cart = (await cartModel.findById({user: req.user.userId})?? await cartModel.create({user:req.user.userId}) )

        const productInCart = cart.products.find((p=> p.product.toString()=== productId)&&(p.size === size))

        if(productInCart){
            
        if((productInCart.quantity + quantity)>selectedSizes.stock){

            return res.status(400).json({
                message:"insufficient stock"
            })

        }

        await cartModel.updateOne({
            user:req.user.userId,
            "products.product": productId,
            "product.size": size,
        },
    {
        $inc:{
            "products.$.quantity":quantity
        }
    })


    return res.status(200).json({
        message:"product quantity is updated"
    })  
    }

     await cartModel.findOneAndUpdate({
        user: req.user.userId
     },{
        push:{
            products:{
                product:productId,
                quantity:quantity,
                size:size,
            }

        }

     })

      return res.status(200).json({
        message: "Product added to cart"
    })
}

export const getCart = async(req,res)=>{

    const cart = (await cartModel.findOne({user:req.user.userId}))??(await cartModel.create({user:req.user.userId}))

    return res.status(200).json({
        message : "cart retrieve successfully",
        data:{
            cart: cart
        }
    });
}
