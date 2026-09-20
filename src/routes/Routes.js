import express from "express"
import { registerValidater } from "../Validation/validation";


const router = express.Router();

router.post("/register",registerValidater,)


export default router;