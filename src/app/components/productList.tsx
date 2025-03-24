"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface Product {
  _id: string;
  imageUrl: string;
  productName: string;
  productCode: string;
  currentPrice: number;
  lowestPrice: number;
  highestPrice: number;
  vendor: string;
  productUrl: string;
  isAvailable: boolean;
}

export default function ProductList({
  searchQuery = "",
}: {
  searchQuery: string;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  // Debounce search input to avoid excessive API calls
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500); // 500ms delay for API call

    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const res = await fetch(`/api/products?search=${debouncedQuery}`);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data.data || []);
      } catch (error) {
        console.error("❌ Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [debouncedQuery]); // Runs when debouncedQuery changes

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-xl font-semibold mt-6 mb-4">Product List</h2>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(6)].map((_, index) => (
            <Card key={index} className="shadow-md p-3 animate-pulse">
              <div className="w-full h-40 bg-gray-300 rounded-md"></div>
              <div className="p-2">
                <div className="h-4 bg-gray-300 rounded w-3/4 my-2"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              </div>
            </Card>
          ))}
        </div>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <Card key={product._id} className="shadow-md p-3">
              <CardContent className="p-0 flex flex-col items-center">
                <Image
                  width={1000}
                  height={1000}
                  src={product.imageUrl}
                  alt={product.productName}
                  className="w-full object-cover rounded-md bg-slate-200"
                />
                <div className="w-full text-center flex flex-col justify-evenly items-start">
                  <Tooltip>
                    <TooltipTrigger>
                      <h3 className="text-sm font-semibold line-clamp-1 overflow-hidden">
                        {product.productName}
                      </h3>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs text-start">
                      {product.productName}
                    </TooltipContent>
                  </Tooltip>
                  <p className="text-xs text-gray-500">
                    Model: {product.productCode}
                  </p>
                  <p className="text-xs text-gray-400">
                    Vendor: {product.vendor}
                  </p>
                  <Popover>
                    <PopoverTrigger className="text-md text-blue-600 font-bold cursor-pointer">
                      ₹{product.currentPrice}
                    </PopoverTrigger>
                    <PopoverContent className="text-sm bg-white p-2 rounded shadow-lg">
                      <p className="text-green-600">Lowest Price: ₹{product.lowestPrice}</p>
                      <p className="text-red-600">Highest Price: ₹{product.highestPrice}</p>
                    </PopoverContent>
                  </Popover>
                  {!product.isAvailable && (
                    <p className="mt-2 text-sm text-red-600 font-semibold">
                      Out of Stock
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
