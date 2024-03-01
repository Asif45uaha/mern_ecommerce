import { Payment } from "../models/payment-model.js";
import User from "../models/user-model.js";

export const getUserById = async (req, res) => {
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
}