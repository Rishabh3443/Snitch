import express from "express";
import UserRoutes from '../routes/Routes.js'
import cookieParser from "cookie-parser";

const app = express()

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",UserRoutes);


export default app 