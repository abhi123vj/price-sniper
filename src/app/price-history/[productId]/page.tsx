"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
} from "recharts";
import { IProduct } from "@/models/Product";
import { useParams } from "next/navigation";
import { Slider } from "@/components/ui/slider";
import { formatCurrency } from "@/utils/converter";

export default function PriceTracker() {
  const params = useParams<{ productId: string }>();

  // const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<IProduct>();

  useEffect(() => {
    async function fetchProducts() {
      // setLoading(true);
      try {
        const res = await fetch(`/api/products/${params.productId}`);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProduct(data.data);
      } catch (error) {
        console.error("❌ Error fetching products:", error);
      } finally {
        // setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const formattedData = product?.priceHistory.map((entry) => ({
    date: new Date(entry.updatedAt).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    price: entry.price, // Keep as number for chart compatibility
  }));
  const averagePrice =
    (product?.priceHistory?.reduce((sum, entry) => sum + entry.price, 0) ?? 0) /
      (product?.priceHistory?.length || 1) || 0;

  const isGoodTimeToBuy =
    product?.currentPrice !== undefined && product.currentPrice < averagePrice;
  return (
    <div className="max-w-4xl mx-auto p-6">
      {product && (
        <Card className="p-4">
          <CardContent className="flex gap-6">
            <Image
              src={product.imageUrl}
              alt={product.productName}
              width={128}
              height={128}
              className="object-cover rounded"
            />
            <div className="w-full">
              <h2 className="text-xl font-semibold">{product.productName}</h2>
              <p className="text-gray-600">Brand: {product.brand}</p>
              <div className="w-full flex flex-row justify-between items-center gap-4">
                <div className="flex flex-col ">
                  <p className="text-lg font-bold text-green-600">
                    Price:{" "}
                    {formatCurrency(product.currentPrice, product.currency)}
                  </p>
                </div>
                <p className="text-gray-600">
                  Availability:{" "}
                  {product.isAvailable ? "In Stock" : "Out of Stock"}
                </p>
              </div>
              <div className="flex flex-row items-center  justify-evenly  gap-4">
                <div className="flex flex-1 text-start">
                  <p
                    className={
                      isGoodTimeToBuy
                        ? "text-green-600 font-bold"
                        : "text-red-600 font-bold"
                    }
                  >
                    {isGoodTimeToBuy
                      ? "✅ Good time to buy!"
                      : "⏳ Consider waiting for a better deal."}
                  </p>
                </div>
                <Button asChild className="text-white">
                  <a
                    href={product.productUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Product
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {product && (
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Price History</CardTitle>
              <CardDescription className="flex felx-row justify-between">
                <p>
                  Lowest Price:{" "}
                  <span className="font-bold text-green-500">
                    ₹{product.lowestPrice.toLocaleString()}
                  </span>
                </p>
                <p>
                  Current Price:{" "}
                  <span className="font-bold">
                    ₹{product.currentPrice.toLocaleString()}
                  </span>
                </p>
                <p>
                  Highest Price:{" "}
                  <span className="font-bold text-red-500">
                    ₹{product.highestPrice.toLocaleString()}
                  </span>
                </p>
              </CardDescription>
            </CardHeader>

            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={formattedData}>
                <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis
                    domain={[
                      Math.min(...formattedData!.map((entry) => entry.price)) *
                        0.9, // 10% lower than min
                      Math.max(...formattedData!.map((entry) => entry.price)) *
                        1.1, // 10% higher than max
                    ]}
                    tickFormatter={(value,index) =>  index === 0 ? "" :`₹${value.toLocaleString()}`}
                  />
                  <Tooltip
                    formatter={(value) => `₹${value.toLocaleString()}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
