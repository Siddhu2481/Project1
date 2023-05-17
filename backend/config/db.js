import mongoose from "mongoose";

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB connected: ${conn}`);
    } catch (error) {
        console.error(`Error: Could not connect to MongoDB... ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;