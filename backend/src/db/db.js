import mongoose from "mongoose";
import "dotenv/config";


const connectDB = async () => {
  try {

    await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log(`DB Connected`);

  } catch (error) {
    console.error("DB connection failed", error);
    process.exit(1);
  }
};

export default connectDB;