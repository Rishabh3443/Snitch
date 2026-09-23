
import { body, validationResult } from "express-validator";

const productValidator = [
    body("title")
        .exists().withMessage("please enter title").bail()
        .isString().withMessage("please enter title in string format").bail()
        .trim()
        .isLength({ min: 2, max: 50 }).withMessage("title required minumum 2 chartacters length and maxumum 50 ").bail()
        .isAlpha("en-US", { ignore: " " }).withMessage("title can have only english small case or upper case character"),

    body("description")
        .exists().withMessage("please enter description").bail()
        .isString().withMessage("please enter description in string format").bail()
        .trim()
        .isLength({ min: 10, max: 500 }).withMessage("Description length must be minumum 10 to 500 characters"),
    body("price.amount")
        .exists().withMessage("please enter amount").bail()
        .isFloat({ min: 0 }).withMessage("please enter amount in a floating number"),
    body("price.currency")
        .exists().withMessage("please enter currency").bail()
        .isString().withMessage("Currency must be in a string value").bail()
        .isIn(["INR", "USD"]).withMessage("currency either be INR or USD"),
    body("sizes")
        .exists().withMessage("Sizes are required").bail()
        .isArray().withMessage("Sizes must be an array of object"),
    body("sizes.*.size")
        .exists().withMessage("please enter sizes").bail()
        .isString().withMessage("sizes must be in string format").bail()
        .trim()
        .isIn(["XS", "S", "M", "L", "XL", "XXL"]).withMessage("size can be one of these XS, S, M, L, XL, XXL."),
    body("sizes.*.stock")
        .exists().withMessage("please enter stock number").bail()
        .isInt({ min: 0 }).withMessage("stock must be in numeric value").bail(),

    (req, res, next) => {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "invalid something",
                error: errors.array()
            })


        }
        next();
    }








]