import puppeteer from "puppeteer";
import mongoose from "mongoose";
import PriceModel from "@/models/Price";

let isConnected = false;

export async function fetchTrackedPrices() {
  try {
    // Connect to MongoDB only if not already connected
    if (!isConnected) {
      await mongoose.connect(process.env.MONGO_URI as string);
      isConnected = true;
      console.log("✅ Connected to MongoDB");
    }

    // Scrape price details
    const priceDetails = await scrapeProduct(
      "https://mdcomputers.in/product/asus-dual-graphics-card-rtx4060-o8g-v2?language=en-gb",
      ".special-price"
    );

    if (!priceDetails) {
      console.log("⚠️ Price details not found. Skipping update.");
      return;
    }

    const { url, price } = priceDetails;

    // Check if the price has changed
    const lastEntry = await PriceModel.findOne({ url }).sort({ timestamp: -1 });

    if (lastEntry && lastEntry.price === price) {
      console.log("ℹ️ Price has not changed. No update needed.");
      return;
    }

    // Save new price record
    await PriceModel.create({ url, price });

    console.log("✅ Price updated in MongoDB:", price);

    return priceDetails;
  } catch (error) {
    console.error("❌ Error in fetchTrackedPrices:", error);
  }
}

async function scrapeProduct(
  url: string,
  selector: string
): Promise<
  | {
      url: string;
      price: string | undefined;
    }
  | undefined
> {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    // Navigate to the product page
    await page.goto(url, { waitUntil: "domcontentloaded" });

    // Extract price from the `.product-price-new` class
    const price = await page.$eval(selector, (el) => el.textContent?.trim());

    return { url, price };
  } catch (error) {
    console.error("Scraping error:", error);
  } finally {
    await browser.close(); // Always close the browser
  }
}
