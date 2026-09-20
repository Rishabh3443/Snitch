import express from "express"
import { loginValidator, registerValidater } from "../Validation/validation.js";
import { authmeController, loginController, refreshController, registerController} from "../Controller/Auth.Controller.js";
import authMiddleware from "../middleware/auth.middleware.js";


const router = express.Router();

router.post("/register",registerValidater,registerController);
router.post("/login",loginValidator,loginController)
router.post("/refresh",refreshController)
router.get("/me",authMiddleware,authmeController)

export default router;