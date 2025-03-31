import { IPriceHistory } from "@/models/Product";

export const updateProductPriceHistory = async (
    priceHistory: IPriceHistory[]
  ) => {
    // Sort by date (ascending)
    priceHistory.sort((a, b) => a.updatedAt.getTime() - b.updatedAt.getTime());
  
    // Get the earliest date
    const startDate = new Date(priceHistory[0].updatedAt.getTime());
    startDate.setUTCHours(0, 0, 0, 0);
  
    const priceHistoryMap: Map<string, number> = new Map();
    const updatedPriceHistory: IPriceHistory[] = [];
  
    // Populate the map with price history data
    for (const entry of priceHistory) {
      const entryDate = new Date(entry.updatedAt);
      entryDate.setUTCHours(0, 0, 0, 0); // Ensure UTC midnight
  
      priceHistoryMap.set(entryDate.toISOString(), entry.price);
    }
  
    let lastKnownPrice = priceHistory[0].price; // Start with the first price
  
    while (startDate <= new Date()) {
      const entryDate = new Date(startDate);
      entryDate.setUTCHours(0, 0, 0, 0); // Ensure UTC midnight
  
      // Get price or use last known price
      const entryPrice = priceHistoryMap.get(entryDate.toISOString()) ?? lastKnownPrice;
  
      // Update last known price if a new one is found
      if (priceHistoryMap.has(entryDate.toISOString())) {
        lastKnownPrice = entryPrice;
      }
  
      updatedPriceHistory.push({ price: entryPrice, updatedAt: new Date(entryDate) });
  
      startDate.setDate(startDate.getDate() + 1); // Move to next day
    }
  
    return updatedPriceHistory;
  };