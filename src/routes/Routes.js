import express from "express"
import { loginValidator, registerValidater } from "../Validation/validation.js";
import { loginController, registerController} from "../Controller/Auth.Controller.js";


const router = express.Router();

router.post("/register",registerValidater,registerController);
router.post("/login",loginValidator,loginController)


export default router;