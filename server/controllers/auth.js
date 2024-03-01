import bcrypt from "bcryptjs";
import GenTokenSetCookie from "../helpers/GenTokenAndSetCookie.js";
import User from "../models/user-model.js";
import { v2 as cloudinary } from 'cloudinary'


export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let { profilePic } = req.body

        const userExists = await User.findOne({ email })

        if (userExists) {
            return res.status(400).json({ message: "User Already Exists" })
        }
        const hashpass = await bcrypt.hash(password, 10)

        if (profilePic) {
            const response = await cloudinary.uploader.upload(profilePic)
            profilePic = response.secure_url
        }
        const newUser = await User({
            name,
            email, password: hashpass, profilePic
        })

        await newUser.save()

        if (newUser) {
            GenTokenSetCookie(newUser._id, res)
            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message })
    }
}

export const loginUser = async (req, res) => {
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
}

export const logoutUser = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 1 });
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message })
    }
}