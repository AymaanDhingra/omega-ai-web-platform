/**
 * Domain-Specific Snapshot Contracts
 * 
 * Point-in-time snapshots for all major domain entities.
 * Used for audit trails, rollback, and historical analysis.
 * 
 * OMEGA Constitution: Mock implementations are the source of truth.
 */

import type { Snapshot } from "./repository";
import type {
  AIBrain,
  MarketAsset,
  Portfolio,
  Strategy,
  TradeSignal,
  SystemStatus,
  AnalyticsGroup,
  KnowledgeDocument
} from "../types";
import type { PaperTradingState } from "../contracts/paper-trading";

/**
 * Trade Snapshot - captures trade state at a point in time
 */
export interface TradeSnapshotData {
  signal: TradeSignal;
  status: "pending" | "open" | "managing" | "partial" | "closed" | "cancelled";
  entryPrice?: number;
  currentPrice?: number;
  quantity?: number;
  unrealizedPnL?: number;
  realizedPnL?: number;
  duration?: number;
  notes?: string;
}

export type TradeSnapshot = Snapshot<TradeSnapshotData>;

/**
 * Portfolio Snapshot - captures portfolio state at a point in time
 */
export interface PortfolioSnapshotData {
  portfolio: Portfolio;
  totalValue: number;
  cashBalance: number;
  positionCount: number;
  dailyPnL: number;
  weeklyPnL: number;
  monthlyPnL: number;
  drawdown: number;
  allocation: Record<string, number>;
}

export type PortfolioSnapshot = Snapshot<PortfolioSnapshotData>;

/**
 * AI Snapshot - captures AI brain state at a point in time
 */
export interface AISnapshotData {
  brain: AIBrain;
  confidence: number;
  activeLoops: string[];
  decisions: {
    id: string;
    type: string;
    confidence: number;
    reasoning: string;
  }[];
  learningMetrics: {
    accuracy: number;
    sampleSize: number;
    lastUpdated: string;
  };
}

export type AISnapshot = Snapshot<AISnapshotData>;

/**
 * Market Snapshot - captures market state at a point in time
 */
export interface MarketSnapshotData {
  assets: MarketAsset[];
  regime: "bull" | "bear" | "sideways" | "volatile";
  volatilityIndex: number;
  sentiment: "bullish" | "bearish" | "neutral";
  topMovers: {
    gainers: MarketAsset[];
    losers: MarketAsset[];
  };
  marketHours: {
    isOpen: boolean;
    session: string;
    nextOpen?: string;
    nextClose?: string;
  };
}

export type MarketSnapshot = Snapshot<MarketSnapshotData>;

/**
 * Strategy Snapshot - captures strategy state at a point in time
 */
export interface StrategySnapshotData {
  strategy: Strategy;
  performance: {
    totalTrades: number;
    winRate: number;
    profitFactor: number;
    sharpeRatio: number;
    maxDrawdown: number;
    expectancy: number;
  };
  parameters: Record<string, unknown>;
  activeSignals: number;
  lastSignalAt?: string;
}

export type StrategySnapshot = Snapshot<StrategySnapshotData>;

/**
 * Paper Trading Snapshot - captures paper trading state at a point in time
 */
export interface PaperTradingSnapshotData {
  state: PaperTradingState;
  accountValue: number;
  openPositions: number;
  totalTrades: number;
  winRate: number;
  totalPnL: number;
  bestTrade: {
    symbol: string;
    pnl: number;
  };
  worstTrade: {
    symbol: string;
    pnl: number;
  };
}

export type PaperTradingSnapshot = Snapshot<PaperTradingSnapshotData>;

/**
 * Analytics Snapshot - captures analytics state at a point in time
 */
export interface AnalyticsSnapshotData {
  groups: AnalyticsGroup[];
  summary: {
    totalMetrics: number;
    healthyMetrics: number;
    warningMetrics: number;
    criticalMetrics: number;
  };
  trends: {
    metric: string;
    direction: "up" | "down" | "flat";
    change: number;
  }[];
}

export type AnalyticsSnapshot = Snapshot<AnalyticsSnapshotData>;

/**
 * Knowledge Snapshot - captures knowledge base state at a point in time
 */
export interface KnowledgeSnapshotData {
  documents: KnowledgeDocument[];
  totalDocuments: number;
  indexedDocuments: number;
  queuedDocuments: number;
  categories: {
    name: string;
    count: number;
  }[];
  lastIndexedAt?: string;
}

export type KnowledgeSnapshot = Snapshot<KnowledgeSnapshotData>;

/**
 * System Snapshot - captures system state at a point in time
 */
export interface SystemSnapshotData {
  statuses: SystemStatus[];
  health: "healthy" | "degraded" | "critical";
  uptime: number;
  activeModules: string[];
  disabledModules: string[];
  featureFlags: Record<string, boolean>;
  version: string;
  environment: "development" | "staging" | "production";
}

export type SystemSnapshot = Snapshot<SystemSnapshotData>;

/**
 * TradingView Snapshot - captures TradingView testing state
 * TradingView remains optional - OMEGA functions without it
 */
export interface TradingViewSnapshotData {
  connected: boolean;
  chartSymbol?: string;
  chartTimeframe?: string;
  watchlistSymbols: string[];
  alertCount: number;
  validationResults: {
    signalId: string;
    aligned: boolean;
    notes?: string;
  }[];
  lastSyncAt?: string;
}

export type TradingViewSnapshot = Snapshot<TradingViewSnapshotData>;
