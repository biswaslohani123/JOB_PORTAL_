import mongoose from 'mongoose'

// Import model files for their registration side-effect.
// This guarantees mongoose.model(...) has run before any populate() call.
import "@/app/models/User";
import "@/app/models/JobModel";

const MONGO_URI = process.env.MONGO_URI!;

if (!MONGO_URI) {
    throw new Error("MONGODB_URI is not defined")
}

export async function connectDB() {
    try {
        await mongoose.connect(MONGO_URI)
        console.log("MongoDb connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
}