"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const productData = {
  brand: "NZXT",
  currency: "INR",
  currentPrice: 16180,
  highestPrice: 16180,
  imageUrl:
    "https://mdcomputers-in.b-cdn.net/image/cache/catalog/smps/nzxt/pa-0g2bb-uk/pa-0g2bb-uk-image-main-500x500.jpg",
  isAvailable: true,
  lastUpdated: "2025-03-22T23:41:01.690Z",
  lowestPrice: 16180,
  priceHistory: [
    { price: 16500, updatedAt: "2025-03-18T10:30:00.000Z" },
    { price: 16500, updatedAt: "2025-03-24T10:30:00.000Z" },
],
  productCode: "PA-0G2BB-UK",
  productName: "Nzxt C1000 Gold Fully Modular ATX 3.1 SMPS",
  productUrl:
    "https://mdcomputers.in/product/nzxt-c1000-gold-modular-smps-pa-0g2bb-uk",
  vendor: "mdcomputers",
};

export default function PriceTracker() {
  const [tracking, setTracking] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="p-4">
        <CardContent className="flex gap-6">
          <img
            src={productData.imageUrl}
            alt={productData.productName}
            className="w-32 h-32 object-cover rounded"
          />
          <div>
            <h2 className="text-xl font-semibold">{productData.productName}</h2>
            <p className="text-gray-600">Brand: {productData.brand}</p>
            <p className="text-lg font-bold text-green-600">
              Price: {productData.currency} {productData.currentPrice}
            </p>
            <p className="text-gray-600">
              Availability:{" "}
              {productData.isAvailable ? "In Stock" : "Out of Stock"}
            </p>
            <a
              href={productData.productUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              View Product
            </a>
            <div className="mt-4">
              <Button onClick={() => setTracking(!tracking)}>
                {tracking ? "Stop Tracking" : "Track Price"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Price History</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={productData.priceHistory}>
            <XAxis 
              dataKey="updatedAt" 
              tickFormatter={(tick) => {
                const date = new Date(tick).toLocaleDateString();
                return date === new Date().toLocaleDateString() ? `${date} (Today)` : date;
              }} 
            />
            <YAxis domain={[Math.min(...productData.priceHistory.map(p => p.price)), Math.max(...productData.priceHistory.map(p => p.price))]} />
            <Tooltip formatter={(value) => `${productData.currency} ${value}`} />
            <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
