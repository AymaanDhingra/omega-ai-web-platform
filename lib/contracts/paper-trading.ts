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
  // Phase 8 extensions — all optional, backward-compatible
  description?: string;
  tags?: string[];
  riskProfile?: { maxDrawdown: string; maxPositionSize: string; dailyLossLimit: string };
  createdAt?: string;
  updatedAt?: string;
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
  // Phase 8 extensions — all optional, backward-compatible
  filledPrice?: string;
  filledAt?: string;
  commission?: string;
  slippage?: string;
  timeInForce?: 'GTC' | 'DAY' | 'IOC';
  notes?: string;
  signalId?: string;
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
  // Phase 8 extensions — all optional, backward-compatible
  entryDate?: string;
  duration?: number;
  maxPrice?: string;
  minPrice?: string;
  realizedPnl?: string;
  stopLoss?: string;
  takeProfit?: string;
}

export interface PaperPortfolio {
  account: PaperAccount;
  positions: PaperPosition[];
  equityCurve: number[];
  // Phase 8 extensions — all optional, backward-compatible
  totalValue?: string;
  dailyPnl?: string;
  weeklyPnl?: string;
  monthlyPnl?: string;
  drawdown?: string;
  sharpeRatio?: string;
  updatedAt?: string;
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
  // Phase 8 extensions — all optional, backward-compatible
  tags?: string[];
  screenshots?: string[];
  strategy?: string;
  timeframe?: string;
  entryPrice?: string;
  exitPrice?: string;
  pnl?: string;
  duration?: number;
  rating?: 1 | 2 | 3 | 4 | 5;
}

export interface PaperPerformanceMetrics {
  accountId: string;
  winRate: string;
  profitFactor: string;
  maxDrawdown: string;
  expectancy: string;
  totalTrades: number;
  // Phase 8 extensions — all optional, backward-compatible
  sharpeRatio?: string;
  sortinoRatio?: string;
  calmarRatio?: string;
  averageWin?: string;
  averageLoss?: string;
  largestWin?: string;
  largestLoss?: string;
  averageDuration?: number;
  consecutiveWins?: number;
  consecutiveLosses?: number;
  recoveryFactor?: string;
}

export interface PaperTradingState {
  accounts: PaperAccount[];
  orders: PaperOrder[];
  positions: PaperPosition[];
  portfolios: PaperPortfolio[];
  journal: TradeJournalEntry[];
  performance: PaperPerformanceMetrics[];
}
