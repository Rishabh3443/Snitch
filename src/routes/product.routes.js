import { Router } from "express"
import authMiddleware from "../middleware/auth.middleware.js";
import multer from "multer"
import { creatproduct } from "../Controller/product.controller.js";
import productValidator from "../Validation/product.validation.js"

const router = Router()

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        files: 5,
        fileSize: 1 * 1024 * 1024, //1 mb
    }
})


router.post("/", authMiddleware, (req, res, next) => {
    // first we find seller in req.user from authmiddleware
    const { role } = req.user

    if (role !== "seller") {
        res.status(403).json({
            message: "user is not authorize to create a product"
        })
    }
    next()
}
      //then reading form data using multer memorystorage.
    , upload.array("images"),
     
     // and then we parse complex data into json fromat using jsonparse.
    (req, res, next) => {
        req.body?.price && (req.body.price = JSON.parse(req.body.price))
        req.body?.sizes && (req.body.sizes = JSON.parse(req.body.sizes))

        next()
    },

    //then applying validator for validate all fields are correct or not..
    productValidator,

    //create product controller
    creatproduct)


export default router;