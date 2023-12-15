import express from "express"
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import cookieParser from "cookie-parser"
import bcrypt from 'bcryptjs'
import User from "./models/user-model.js"
import Razorpay from 'razorpay'
import crypto from 'crypto'
import path from "path"
import { Payment } from "./models/payment-model.js"
import protectedRoute from "./middlewares/protectRoute.js"
import GenTokenSetCookie from "./helpers/GenTokenAndSetCookie.js"
dotenv.config()

const __dirname = path.resolve();
const app = express()
app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.use(express.json())
app.use(cors({
    origin: "https://mern-ecommerce-l443.onrender.com/",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true
}))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

//Database Connection

const connect = await mongoose.connect(process.env.MONGO_URI)
if (connect) {
    app.listen(process.env.PORT_NO, () => {
        console.log(`Server is Running on Port No : ${process.env.PORT_NO}`);
    })
    console.log("Connected To MongoDB");
}


//razorpay instance
const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})


//Routes
app.use("/register", async (req, res) => {
    try {
        const { name, email, password, profilePic } = req.body;

        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(400).json({ message: "User Already Exists" })
        }
        const hashpass = await bcrypt.hash(password, 10)
        const newUser = await User({
            name,
            email, password: hashpass, profilePic
        })
        await newUser.save()
        if (newUser) {
            GenTokenSetCookie(newUser._id, res)
            res.status(200).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message })
    }
})

app.use("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User Doesn't Exixt" })
        }
        const isMatch = await bcrypt.compare(password, user?.password)
        if (!user || !isMatch) return res.status(400).json({ error: "Invalid name or password" });
        GenTokenSetCookie(user._id, res)
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profilePic: user.profilePic,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message })
    }
})

app.use("/logout", async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 1 });
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message })
    }
})

app.use("/getuser/:id", protectedRoute, async (req, res) => {
    try {
        const userId = req.user._id
        const { id } = req.params;
        const user = await User.findById(id)
        if (!user) return res.status(400).json({ message: "User Doesn't Exist" })
        const orders = await Payment.find({ userId })
        return res.status(200).json({
            user: user,
            orders
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message })
    }
})

//payment Routes

app.get("/getkey", protectedRoute, async (req, res) => {
    try {
        const userId = req.user._id
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ message: "User Doesn't exist" })
        }

        return res.status(200).json({ key: process.env.RAZORPAY_KEY_ID })

    } catch (error) {
        res.status(400).json({ msg: error.msg })
    }
})
app.post("/checkout", protectedRoute, async (req, res) => {
    try {
        const { amount } = req.body
        const userId = req.user._id
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ message: "User Doesn't exist" })
        }
        const options = {
            amount: Number(amount * 100),
            currency: "INR"
        }

        const order = await instance.orders.create(options)
        res.status(200).json({
            order,
        });
    } catch (error) {
        return res.status(500).json(error)
    }
})

app.post("/paymentverification", protectedRoute, async (req, res) => {
    try {
        const id = req.user._id;
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            req.body;
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex")
        const isAuthentic = expectedSignature === razorpay_signature
        if (isAuthentic) {
            res.redirect(
                `http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`
            );

            const payment = await Payment.create({
                razorpay_order_id, razorpay_payment_id, razorpay_signature, userId: id
            })
            const user = await User.findById(id)
            if (user) {
                await User.findByIdAndUpdate(user._id, { $push: { orders: payment._id } })
            }
        }
        else {
            res.status(400).json({
                message: "Error in payment Verification"
            });
        }
    } catch (error) {
        return res.status(500).json(error)
    }
})

app.get("/getOrders", protectedRoute, async (req, res) => {
    try {
        const userId = req.user._id
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ message: "User Doesn't exist" })
        }
        const payments = await Payment.find({ userId })
        res.status(200).json(payments)

    } catch (error) {
        return res.status(500).json(error)
    }
})