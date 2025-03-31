import { updateProductPriceHistory } from "@/services/dateUtils";
import { fetchProductById } from "@/services/fetchTrackedPrices";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ productId: string }> }
) {
  const { productId } = await context.params; // ✅ Correct way to access params

  const product = await fetchProductById(productId);
  try {
    if (!product) {
      return NextResponse.json({ success: false, error: "Product not found" });
    }
    const priceHistory = await updateProductPriceHistory(product.priceHistory);
    product.priceHistory = priceHistory;
    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    console.error("❌ Error fetching product:", error);
    return NextResponse.json(
      { success: false, error: "Error fetching product" },
      { status: 500 }
    );
  }
}
