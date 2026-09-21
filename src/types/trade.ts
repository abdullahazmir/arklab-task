export type InsiderRole = "CEO" | "CFO" | "Director" | "Officer";
export type TransactionType = "purchase" | "sale";
export type TransactionCode = "P" | "S";
export type SignalStrength = "High" | "Medium" | "Low";

export type InsiderTrade = {
  id: string;
  ticker: string;
  company: string;
  sector: string;
  insider: string;
  role: InsiderRole;
  type: TransactionType;
  transactionCode: TransactionCode;
  shares: number;
  pricePerShare: number;
  value: number;
  transactionDate: string;
  filedAt: string;
  signal: string;
  signalStrength: SignalStrength;
  historicalActivity?: number[]; // Array of 7 numeric values for 7-day mock activity chart
};
