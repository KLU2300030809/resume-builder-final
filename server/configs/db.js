import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongodbURI = process.env.MONGODB_URI;
    if (!mongodbURI) {
      throw new Error("MONGODB_URI environment variable not set");
    }

    // Event listeners
    mongoose.connection.on("connected", () => {
      console.log("🟢 Database connected successfully");
      console.log("🟢 DB NAME:", mongoose.connection.name); // This confirms the DB name
    });

    mongoose.connection.on("error", (err) => {
      console.error("❌ Database connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ Database disconnected");
    });

    // Connect to MongoDB
    await mongoose.connect(mongodbURI);

  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    process.exit(1); // Optional: exit process if DB connection fails
  }
};

export default connectDB;

