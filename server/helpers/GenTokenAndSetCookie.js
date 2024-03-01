import jwt from 'jsonwebtoken'

const GenTokenSetCookie = async (userId, res) => {
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15d" })
        res.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: 15 * 24 * 60 * 60 * 1000,
            sameSite: "strict", // CSRF
        })
        return token
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export default GenTokenSetCookie