import { fetchTrackedPrices } from "@/services/fetchTrackedPrices";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const products = await fetchTrackedPrices(); // Your function to fetch data
  return NextResponse.json({ success: true, data: products });
}

