/**
 * Portfolio Domain Types
 */

import type { Asset } from "../market/types";

export type PortfolioStatus = "healthy" | "warning" | "critical" | "recovery";

export interface Holding {
  id: string;
  asset: Asset;
  quantity: number;
  averageCost: number;
  currentPrice: number;
  value: number;
  unrealizedPnL: number;
  unrealizedPnLPercent: number;
  allocation: number;
}

export interface Cash {
  id: string;
  amount: number;
  currency: string;
  available: number;
  reserved: number;
}

export interface Margin {
  id: string;
  used: number;
  available: number;
  total: number;
  utilizationPercent: number;
}

export interface Exposure {
  id: string;
  asset: Asset;
  long: number;
  short: number;
  net: number;
  percent: number;
}

export interface Allocation {
  id: string;
  asset: Asset;
  percent: number;
  targetPercent?: number;
}

export interface Correlation {
  id: string;
  asset1: Asset;
  asset2: Asset;
  correlation: number;
}

export interface Drawdown {
  id: string;
  timestamp: string;
  peakValue: number;
  troughValue: number;
  drawdownPercent: number;
  duration: number;
}

export interface PortfolioMetrics {
  id: string;
  timestamp: string;
  totalValue: number;
  totalCost: number;
  totalPnL: number;
  totalPnLPercent: number;
  dayPnL: number;
  dayPnLPercent: number;
  maxDrawdown: number;
  sharpeRatio: number;
  sortinoRatio: number;
  calmarRatio: number;
}

export interface Portfolio {
  id: string;
  name: string;
  status: PortfolioStatus;
  holdings: Holding[];
  cash: Cash;
  margin?: Margin;
  exposures: Exposure[];
  allocations: Allocation[];
  correlations: Correlation[];
  metrics: PortfolioMetrics;
  createdAt: string;
  updatedAt: string;
}

export interface PortfolioSnapshot {
  id: string;
  timestamp: string;
  portfolio: Portfolio;
  totalValue: number;
  totalPnL: number;
  totalPnLPercent: number;
  status: PortfolioStatus;
  topHolding: Holding;
  largestExposure: Exposure;
}
