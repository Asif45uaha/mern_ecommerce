import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    profilePic: {
        type: String,
        default: ""
    },
    orders: {
        type: [String],
        default: []
    }


})

const User = mongoose.model("user", userSchema)
export default User;