import { InsiderTrade } from "../types/trade";

export const formatCurrency = (val: number): string => {
  if (val >= 1000000) {
    return `$${(val / 1000000).toFixed(2)}M`;
  } else if (val >= 1000) {
    return `$${(val / 1000).toFixed(0)}K`;
  }
  return `$${val.toLocaleString()}`;
};

export const formatNumber = (val: number): string => {
  return val.toLocaleString();
};

export const formatDate = (dateStr: string): string => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const computeSummaryMetrics = (trades: InsiderTrade[]) => {
  const totalFilings = trades.length;
  let totalPurchases = 0;
  let totalSales = 0;
  let highStrengthCount = 0;

  trades.forEach((t) => {
    if (t.type === "purchase") {
      totalPurchases += t.value;
    } else {
      totalSales += t.value;
    }
    if (t.signalStrength === "High") {
      highStrengthCount++;
    }
  });

  return {
    totalFilings,
    totalPurchases,
    totalSales,
    highStrengthCount,
  };
};
