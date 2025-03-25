"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { IProduct } from "@/models/Product";
import { useParams } from "next/navigation";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

export default function PriceTracker() {
  const params = useParams<{ productId: string }>();

  const [tracking, setTracking] = useState(false);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<IProduct>();

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/${params.productId}`);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProduct(data.data);
      } catch (error) {
        console.error("❌ Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []); // Runs when debouncedQuery changes
  const chartData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
  ]
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "black",
    },
  } satisfies ChartConfig
  return (
    <div className="max-w-4xl mx-auto p-6">
      {product && (
        <Card className="p-4">
          <CardContent className="flex gap-6">
            <img
              src={product.imageUrl}
              alt={product.productName}
              className="w-32 h-32 object-cover rounded"
            />
            <div>
              <h2 className="text-xl font-semibold">{product.productName}</h2>
              <p className="text-gray-600">Brand: {product.brand}</p>
              <p className="text-lg font-bold text-green-600">
                Price: {product.currency} {product.currentPrice}
              </p>
              <p className="text-gray-600">
                Availability:{" "}
                {product.isAvailable ? "In Stock" : "Out of Stock"}
              </p>
              <Button asChild className="text-white  ">
                <a
                  href={product.productUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Product
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {product && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Price History</h3>
          <Card>
      <CardHeader>
        <CardTitle>Line Chart</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="desktop"
              type="natural"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
        </div>
      )}
    </div>
  );
}
