import mongoose, { Schema, Document } from "mongoose";

interface IPrice extends Document {
  url: string;
  price: string;
  timestamp: Date;
}

const PriceSchema = new Schema<IPrice>({
  url: { type: String, required: true },
  price: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const PriceModel = mongoose.models.Price || mongoose.model<IPrice>("Price", PriceSchema);

export default PriceModel;