import type { MetricTone } from "../types";

export interface AnalyticsScorecard {
  id: string;
  label: string;
  value: string;
  trend: MetricTone;
  sampleSize: string;
  notes: string;
}

export interface StrategyPerformanceModel {
  id: string;
  strategyName: string;
  winRate: string;
  expectancy: string;
  drawdown: string;
  status: "Mock" | "Ready" | "Needs Data";
}

export interface AIAccuracyModel {
  id: string;
  metric: string;
  score: string;
  confidenceBand: string;
  reviewStatus: "Mock" | "Review" | "Ready";
}

export interface MarketPerformanceModel {
  id: string;
  market: string;
  breadth: string;
  volatility: string;
  regime: string;
}

export interface PaperTradingPerformanceModel {
  id: string;
  accountId: string;
  pnl: string;
  winRate: string;
  maxDrawdown: string;
}

export interface PortfolioMetricsModel {
  id: string;
  allocation: string;
  exposure: string;
  cashBuffer: string;
  riskState: "Mock" | "Normal" | "Watch";
}

export interface HistoricalMetricsModel {
  id: string;
  period: string;
  totalReturn: string;
  sharpe: string;
  tradeCount: number;
}

export interface AnalyticsModelSet {
  strategyPerformance: StrategyPerformanceModel[];
  aiAccuracy: AIAccuracyModel[];
  marketPerformance: MarketPerformanceModel[];
  paperTradingPerformance: PaperTradingPerformanceModel[];
  portfolioMetrics: PortfolioMetricsModel[];
  historicalMetrics: HistoricalMetricsModel[];
}
