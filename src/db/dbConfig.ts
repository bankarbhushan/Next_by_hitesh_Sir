import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Database connected successfully");
    });
    connection.on("error", (error) => {
      console.log("MongoDB connection error", error);
      process.exit(1);
    });
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
};

export default connect;
