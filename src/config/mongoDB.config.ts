import mongoose from "mongoose";
import "dotenv/config";


const connectDB = async () => {
    try {
      const mongoURI = `${process.env.AIRLINE_MONGO_URI}${process.env.AIRLINE_MONGODB_NAME}`;
      const conn = await mongoose.connect(
        `${process.env.AIRLINE_MONGO_URI}${process.env.AIRLINE_MONGODB_NAME}`
      );    
      console.log(`AirlineDB-connected: ${conn.connection.host}`);
    } catch (error: any) {
      console.log(error.message);
      process.exit(1);
    }
  };
  export { connectDB };