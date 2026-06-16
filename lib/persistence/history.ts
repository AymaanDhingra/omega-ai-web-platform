/**
 * Domain-Specific History Models
 * 
 * Audit trail and historical tracking for all major domain entities.
 * Used for compliance, debugging, and performance analysis.
 * 
 * OMEGA Constitution: Mock implementations are the source of truth.
 */

import type { HistoryEntry } from "./repository";
import type { TradeSnapshotData, PortfolioSnapshotData, AISnapshotData } from "./snapshots";

/**
 * Trade History - tracks all trade lifecycle events
 */
export interface TradeHistoryEntry extends HistoryEntry<TradeSnapshotData> {
  tradeAction: "signal_created" | "validated" | "executed" | "modified" | "closed" | "cancelled";
  pnlChange?: number;
  reason?: string;
}

export interface TradeHistory {
  tradeId: string;
  symbol: string;
  entries: TradeHistoryEntry[];
  summary: {
    totalActions: number;
    duration: number;
    finalPnL: number;
    maxDrawdown: number;
    maxProfit: number;
  };
}

/**
 * Signal History - tracks signal generation and validation
 */
export interface SignalHistoryEntry {
  id: string;
  signalId: string;
  action: "created" | "validated" | "rejected" | "executed" | "expired";
  timestamp: string;
  confidence: number;
  validationResult?: {
    passed: boolean;
    checks: { name: string; passed: boolean; reason?: string }[];
  };
  executionResult?: {
    orderId?: string;
    filled: boolean;
    price?: number;
  };
}

export interface SignalHistory {
  signalId: string;
  symbol: string;
  entries: SignalHistoryEntry[];
  summary: {
    totalSignals: number;
    validated: number;
    executed: number;
    successRate: number;
  };
}

/**
 * Portfolio History - tracks portfolio changes over time
 */
export interface PortfolioHistoryEntry extends HistoryEntry<PortfolioSnapshotData> {
  portfolioAction: "rebalanced" | "deposit" | "withdrawal" | "trade_impact" | "dividend" | "fee";
  valueChange: number;
  percentChange: number;
}

export interface PortfolioHistory {
  portfolioId: string;
  entries: PortfolioHistoryEntry[];
  summary: {
    startValue: number;
    endValue: number;
    totalReturn: number;
    totalReturnPercent: number;
    maxDrawdown: number;
    volatility: number;
  };
  equityCurve: { timestamp: string; value: number }[];
}

/**
 * Strategy History - tracks strategy performance over time
 */
export interface StrategyHistoryEntry {
  id: string;
  strategyId: string;
  action: "activated" | "paused" | "modified" | "signal_generated" | "performance_update";
  timestamp: string;
  parameters?: Record<string, unknown>;
  performance?: {
    winRate: number;
    profitFactor: number;
    sharpeRatio: number;
  };
}

export interface StrategyHistory {
  strategyId: string;
  name: string;
  entries: StrategyHistoryEntry[];
  summary: {
    totalSignals: number;
    totalTrades: number;
    winRate: number;
    profitFactor: number;
    bestPeriod: { start: string; end: string; return: number };
    worstPeriod: { start: string; end: string; return: number };
  };
}

/**
 * AI History - tracks AI decisions and learning
 */
export interface AIHistoryEntry extends HistoryEntry<AISnapshotData> {
  aiAction: "analysis" | "recommendation" | "learning" | "confidence_update" | "model_update";
  decision?: {
    type: string;
    confidence: number;
    reasoning: string;
    outcome?: "correct" | "incorrect" | "pending";
  };
}

export interface AIHistory {
  brainId: string;
  entries: AIHistoryEntry[];
  summary: {
    totalDecisions: number;
    correctDecisions: number;
    accuracy: number;
    averageConfidence: number;
    learningProgress: number;
  };
  accuracyCurve: { timestamp: string; accuracy: number }[];
}

/**
 * Knowledge History - tracks knowledge base changes
 */
export interface KnowledgeHistoryEntry {
  id: string;
  documentId: string;
  action: "uploaded" | "indexed" | "updated" | "deleted" | "queried";
  timestamp: string;
  details?: {
    fileName?: string;
    fileType?: string;
    indexingDuration?: number;
    queryCount?: number;
  };
}

export interface KnowledgeHistory {
  entries: KnowledgeHistoryEntry[];
  summary: {
    totalDocuments: number;
    totalQueries: number;
    averageIndexingTime: number;
    mostQueriedDocuments: { documentId: string; queryCount: number }[];
  };
}

/**
 * Analytics History - tracks analytics metric changes
 */
export interface AnalyticsHistoryEntry {
  id: string;
  metricId: string;
  metricName: string;
  action: "recorded" | "threshold_breach" | "trend_change";
  timestamp: string;
  value: number;
  previousValue?: number;
  threshold?: { type: "upper" | "lower"; value: number };
}

export interface AnalyticsHistory {
  entries: AnalyticsHistoryEntry[];
  summary: {
    totalRecords: number;
    breachCount: number;
    trendChanges: number;
  };
  timeSeries: Record<string, { timestamp: string; value: number }[]>;
}

/**
 * Paper Trading History - tracks paper trading activity
 */
export interface PaperHistoryEntry {
  id: string;
  accountId: string;
  action: "trade_opened" | "trade_closed" | "order_placed" | "order_filled" | "position_updated";
  timestamp: string;
  details: {
    symbol?: string;
    side?: "buy" | "sell";
    quantity?: number;
    price?: number;
    pnl?: number;
  };
}

export interface PaperHistory {
  accountId: string;
  entries: PaperHistoryEntry[];
  summary: {
    totalTrades: number;
    winningTrades: number;
    losingTrades: number;
    winRate: number;
    totalPnL: number;
    averageWin: number;
    averageLoss: number;
    profitFactor: number;
  };
  equityCurve: { timestamp: string; value: number }[];
}
