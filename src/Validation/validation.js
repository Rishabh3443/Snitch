import {body, validationResult} from "express-validator"

export const registerValidater = [

    body("name")
      .exists().withMessage("please enter your name").bail()
      .isString().withMessage("please enter valid name").bail()
      .trim()
      .isLength({min:2,max:50}).withMessage("Name length musst be 2 to 50 characters").bail(),
    body("email")
       .exists().withMessage("please enter your email").bail()  
       .trim()
       .isEmail().withMessage("please enter valid email").bail(),
    body("password")   
       .exists().withMessage("please enter your password").bail()
       .isString().withMessage("password must be a string").bail()
       .trim()
       .isLength({min:6}).withMessage("password must be minimum 6 character long"),
     
        (req, res, next)=>{
       const errors = validationResult(req)
         
        if(!errors.isEmpty()){
          return res.status(400).json({
            message:"invalid Request",
            errors:errors.array()
          })
        }

         next()
        }
    ]

    export const loginValidator = [
        body("email")
          .exists().withMessage("please enter your email").bail()
          .trim()
          .isEmail().withMessage("please enter valid email"),
        body("password")  
           .exists().withMessage("please enter your password").bail()
           .isString().withMessage("password must be string").bail()
           .trim()
           .isLength({min:6}).withMessage("please enter minimum 6 character long password"),

           (req,res,next)=>{

            const errors = validationResult(req)

            if(!errors.isEmpty()){
                return res.status(400).json({
                    message:"invalid something",
                    errors:errors.array()
                })
            }
            next()
           }


    ]

