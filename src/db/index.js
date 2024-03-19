import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

export default async function connectDB() {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );
    console.log("mongodb connected", connectionInstance.connection.host);
  } catch (error) {
    console.log("Mongodb Connection failed", error);
  }
}
