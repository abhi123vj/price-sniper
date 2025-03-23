import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPriceHistory {
  price: number;
  updatedAt: Date;
}

export interface IProduct extends Document {
  productUrl: string;
  brand: string;
  currency: string;
  currentPrice: number;
  highestPrice: number;
  lowestPrice: number;
  imageUrl: string;
  isAvailable: boolean;
  lastUpdated: Date;
  priceHistory: IPriceHistory[];
  productCode: string;
  productName: string;
  vendor: string;
}

const ProductSchema = new Schema<IProduct>(
  {
    productUrl: { type: String, required: true },
    brand: { type: String, required: true },
    currency: { type: String, required: true },
    currentPrice: { type: Number, required: true },
    highestPrice: { type: Number, required: true },
    lowestPrice: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    isAvailable: { type: Boolean, required: true },
    lastUpdated: { type: Date, required: true },
    priceHistory: [
      {
        price: { type: Number, required: true },
        updatedAt: { type: Date, required: true },
      },
    ],
    productCode: { type: String, required: true },
    productName: { type: String, required: true },
    vendor: { type: String, required: true },
  },
  { timestamps: true } // ✅ Auto add `createdAt` and `updatedAt`
);

// ✅ Check if model exists before defining it
const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema, "products");

export default Product;
