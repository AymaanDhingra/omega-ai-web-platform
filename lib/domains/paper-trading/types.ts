/**
 * Paper Trading Domain Types
 */

import type { Asset } from "../market/types";
import type { OrderSide, OrderType, TimeInForce } from "../trading/types";

export type PaperTradingStatus = "generated" | "executed" | "managing" | "closed" | "analytics-updated";

export interface PaperAccount {
  id: string;
  name: string;
  initialBalance: number;
  currentBalance: number;
  cash: number;
  equity: number;
  createdAt: string;
  updatedAt: string;
}

export interface PaperOrder {
  id: string;
  account: PaperAccount;
  asset: Asset;
  timestamp: string;
  side: OrderSide;
  type: OrderType;
  quantity: number;
  price: number;
  status: "pending" | "executed" | "cancelled";
  filledQuantity: number;
  averagePrice: number;
  commission: number;
}

export interface PaperPosition {
  id: string;
  account: PaperAccount;
  asset: Asset;
  quantity: number;
  entryPrice: number;
  currentPrice: number;
  unrealizedPnL: number;
  unrealizedPnLPercent: number;
}

export interface PaperTrade {
  id: string;
  account: PaperAccount;
  asset: Asset;
  timestamp: string;
  status: PaperTradingStatus;
  entryPrice: number;
  exitPrice?: number;
  quantity: number;
  side: OrderSide;
  realizedPnL?: number;
  realizedPnLPercent?: number;
  duration?: number;
  reason?: string;
}

export interface PaperPortfolio {
  id: string;
  account: PaperAccount;
  timestamp: string;
  positions: PaperPosition[];
  cash: number;
  equity: number;
  totalValue: number;
  totalPnL: number;
  totalPnLPercent: number;
}

export interface PaperJournal {
  id: string;
  account: PaperAccount;
  timestamp: string;
  trades: PaperTrade[];
  notes: string[];
  decisions: string[];
}

export interface PaperMetrics {
  id: string;
  account: PaperAccount;
  period: string;
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  winRate: number;
  totalPnL: number;
  totalPnLPercent: number;
  averageWin: number;
  averageLoss: number;
  profitFactor: number;
  maxDrawdown: number;
}

export interface PaperStatistics {
  id: string;
  account: PaperAccount;
  timestamp: string;
  totalTrades: number;
  winRate: number;
  profitFactor: number;
  sharpeRatio: number;
  sortinoRatio: number;
  calmarRatio: number;
  recoveryFactor: number;
}

export interface PaperSnapshot {
  id: string;
  timestamp: string;
  account: PaperAccount;
  portfolio: PaperPortfolio;
  metrics: PaperMetrics;
  recentTrades: PaperTrade[];
}
