import { body,validationResult } from "express-validator";

export const addtoCartValidator =  [

    body("productId")
       .exists().withMessage("Product Id is required").bail()
       .isString().withMessage("Product id must be a string").bail()
       .isMongoId().withMessage("Product must be a valid mongoId"),
    body("quantity")
           .exists().withMessage("Quantity is required").bail()
           .isInt().withMessage("Qauntity must be a integer and greator than 0"),
    body("Size")
         .exists().withMessage("Size is required ").bail()
         .toString().withMessage("Size must be a String").bail()
         .isIn(["S","M","L","XL","XXL"]).withMessage("Size must be one of S, M, L, XL,XXL "),

         (req,next,res)=>{

            const errors = validationResult(req);

            if(!errors.isEmpty()){
                return res.status(400).json({
                    message:"Validation failed",
                    errors: errors.array()
                });
            }

            next();

         }
           

]