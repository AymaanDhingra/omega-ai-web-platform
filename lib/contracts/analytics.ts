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
  // Phase 8 extensions — all optional, backward-compatible
  totalTrades?: number;
  profitFactor?: string;
  sharpeRatio?: string;
  averageDuration?: string;
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
  // Phase 8 extensions — all optional, backward-compatible
  sharpeRatio?: string;
  sortinoRatio?: string;
  profitFactor?: string;
  averageDuration?: string;
  bestTrade?: string;
  worstTrade?: string;
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

/**
 * Signal flow pipeline analytics model.
 * Tracks pipeline execution rates, stage success rates, and TradingView alignment.
 * Phase 8: Paper Trading Architecture Extension.
 */
export interface SignalFlowAnalyticsModel {
  id: string;
  totalPipelines: number;
  completedPipelines: number;
  failedPipelines: number;
  averageDuration: string;
  averageConfidence: string;
  stageSuccessRates: { stage: string; rate: string }[];
  tradingViewAlignmentRate?: string;
  status: 'Mock' | 'Ready' | 'Needs Data';
}

export interface AnalyticsModelSet {
  strategyPerformance: StrategyPerformanceModel[];
  aiAccuracy: AIAccuracyModel[];
  marketPerformance: MarketPerformanceModel[];
  paperTradingPerformance: PaperTradingPerformanceModel[];
  portfolioMetrics: PortfolioMetricsModel[];
  historicalMetrics: HistoricalMetricsModel[];
  // Phase 8 extension — optional, backward-compatible
  signalFlowAnalytics?: SignalFlowAnalyticsModel[];
}
