export function formatCurrency(amount: number, currencyCode: string): string {
    if (currencyCode === "INR" || currencyCode === "USD") {
      return new Intl.NumberFormat(currencyCode === "INR" ? "en-IN" : "en-US", {
        style: "currency",
        currency: currencyCode,
        minimumFractionDigits: 0,
      }).format(amount);
    }
  
    return `${currencyCode} ${amount.toLocaleString()}`;
  }
  