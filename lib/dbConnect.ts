import mongoose from "mongoose";

async function dbConnect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('MongoDB connected successfully!');
    
  } catch (error) {
    throw new Error("Connection failed");
  }
}

export default dbConnect;
