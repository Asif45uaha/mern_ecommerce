import path from "path"
import express from "express"
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from "cookie-parser"
import Razorpay from 'razorpay'
import { v2 as cloudinary } from "cloudinary"


import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'
import paymentRoutes from './routes/payment.js'
import connectToDB from "./config/db.js"

dotenv.config()
const app = express()

const __dirname = path.resolve();

//cloudinary config

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


app.use(express.json({ limit: "50mb" }))

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true
}))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())




app.listen(process.env.PORT_NO, () => {
    console.log(`Server is Running on Port No : ${process.env.PORT_NO}`);
})


//Database Connection
connectToDB()

//razorpay instance
export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})


//Routes

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/payment", paymentRoutes)



app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});