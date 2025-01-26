import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes.js";
import connectDB from "./lib/db.js";
import productRoutes from "./routes/produt.route.js";
import cookieParser from "cookie-parser";
import path from "path";



dotenv.config();
const app = express();

const PORT = process.env.PORT || 9080;

const __dirname = path.resolve();

app.use(express.json({limit: "50mb"}));
app.use(cookieParser());



app.use("/api/auth",authRoutes);
app.use("/api/products",productRoutes);


if(process.env.NODE_ENV === "production")
{
    app.use(express.static(path.join(__dirname,"/frontend/dist")));
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"));
    })
}




app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})