
import mongoose from 'mongoose'

const connectToDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)

        if (conn) {
            console.log(`connected to mongodb :${conn.connection.host}`);
        }
    } catch (error) {
        console.log("Error Connecting to Db", error);
    }
}

export default connectToDB