import { fetchTrackedProducts } from "@/services/fetchTrackedPrices";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchQuery = req.nextUrl.searchParams.get("search") || ""; // Get search query
    const products = await fetchTrackedProducts(searchQuery); // Pass query to function

    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    return NextResponse.json({ success: false, error: "Error fetching products" }, { status: 500 });
  }
}