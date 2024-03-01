import { instance } from "../index.js"
import { Payment } from "../models/payment-model.js"
import User from "../models/user-model.js"

export const getKey = async (req, res) => {
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
}

export const checkoutController = async (req, res) => {
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
}

export const paymentVerificationController = async (req, res) => {
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
}

export const getOrdersController = async (req, res) => {
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
}