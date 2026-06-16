import type { Direction } from "../types";

export type PaperOrderType = "Market" | "Limit" | "Stop";
export type PaperOrderStatus = "Draft" | "Submitted" | "Filled" | "Cancelled" | "Rejected";
export type TradeJournalMood = "Confident" | "Neutral" | "Review";

export interface PaperAccount {
  id: string;
  name: string;
  currency: string;
  startingCash: string;
  cash: string;
  equity: string;
  status: "Mock" | "Active" | "Locked";
}

export interface PaperOrder {
  id: string;
  accountId: string;
  symbol: string;
  side: Direction;
  type: PaperOrderType;
  quantity: string;
  requestedPrice: string;
  status: PaperOrderStatus;
  createdAt: string;
}

export interface PaperPosition {
  id: string;
  accountId: string;
  symbol: string;
  side: Direction;
  quantity: string;
  averagePrice: string;
  markPrice: string;
  unrealizedPnl: string;
}

export interface PaperPortfolio {
  account: PaperAccount;
  positions: PaperPosition[];
  equityCurve: number[];
}

export interface TradeJournalEntry {
  id: string;
  accountId: string;
  symbol: string;
  side: Direction;
  openedAt: string;
  closedAt?: string;
  thesis: string;
  lesson: string;
  mood: TradeJournalMood;
}

export interface PaperPerformanceMetrics {
  accountId: string;
  winRate: string;
  profitFactor: string;
  maxDrawdown: string;
  expectancy: string;
  totalTrades: number;
}

export interface PaperTradingState {
  accounts: PaperAccount[];
  orders: PaperOrder[];
  positions: PaperPosition[];
  portfolios: PaperPortfolio[];
  journal: TradeJournalEntry[];
  performance: PaperPerformanceMetrics[];
}
