import mongoose from "mongoose";
const connectDB = async () => {
    try {
        mongoose.connection.on('connected',()=>console.log("Database Connected"))
        mongoose.connection.on('error',(err)=>console.log("Database Error:", err))

        await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`)
    } catch (error) {
        console.log("MongoDB Connection Error:", error.message)
    }
}
export default connectDB