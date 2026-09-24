import express from "express";
import UserRoutes from '../routes/auth.Routes.js'
import cookieParser from "cookie-parser";
import productRoutes from "../routes/product.routes.js";

const app = express()

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",UserRoutes);

app.use("/api/product", productRoutes);


export default app 