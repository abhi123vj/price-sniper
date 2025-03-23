import mongoose from "mongoose";
import ProductModel from "@/models/Product";

const MONGO_URI = process.env.MONGO_URI as string;
const DB_NAME = process.env.DB_NAME as string;

if (!MONGO_URI) {
  throw new Error("❌ MONGO_URI is missing from environment variables.");
}

// ✅ Singleton Connection (Prevents Repeated Connections)
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log("🔄 Using existing MongoDB connection.");
    return;
  }

  try {
    await mongoose.connect(MONGO_URI, { dbName: DB_NAME });
    console.log(`✅ Connected to MongoDB: ${DB_NAME}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    throw new Error("Failed to connect to MongoDB.");
  }
};

// ✅ Fetch Products (No Global `isConnected` Variable)
export async function fetchTrackedProducts(searchQuery?: string) {
  try {
    await connectDB();
    
    // Search filter
    const filter = searchQuery
      ? {
          $or: [
            { productName: { $regex: searchQuery, $options: "i" } }, // Case-insensitive search
            { productCode: { $regex: searchQuery, $options: "i" } }
          ],
        }
      : {};

    return await ProductModel.find(filter).lean(); // `lean()` improves performance for reads
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    return [];
  }
}