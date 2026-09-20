import express from "express";
import UserRoutes from '../routes/Routes.js'

const app = express()

app.use(express.json());

app.use("/api/auth",UserRoutes);


export default app 