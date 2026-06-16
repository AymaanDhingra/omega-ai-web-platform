/**
 * TradingView Persistence Contracts
 * 
 * Persistence layer for TradingView testing and validation data.
 * 
 * CRITICAL: TradingView remains OPTIONAL.
 * OMEGA must function completely if TradingView is disabled.
 * 
 * OMEGA Constitution: Mock implementations are the source of truth.
 */

import type { Identifiable, Timestamped, RepositoryResult } from "./repository";

/**
 * TradingView Signal History Entry
 */
export interface TVSignalHistoryEntry extends Identifiable, Timestamped {
  signalId: string;
  symbol: string;
  timeframe: string;
  omegaSignal: "Buy" | "Sell" | "Watch" | "Neutral";
  tvSignal: "Buy" | "Sell" | "Watch" | "Neutral";
  omegaConfidence: number;
  tvIndicators: {
    name: string;
    value: string;
    signal: string;
  }[];
  aligned: boolean;
  divergenceReason?: string;
  chartSnapshot?: string; // Base64 or URL reference
}

/**
 * TradingView Signal History
 */
export interface TVSignalHistory {
  entries: TVSignalHistoryEntry[];
  summary: {
    totalComparisons: number;
    aligned: number;
    divergent: number;
    alignmentRate: number;
    mostDivergentSymbol?: string;
    mostAlignedSymbol?: string;
  };
  bySymbol: Record<string, {
    comparisons: number;
    alignmentRate: number;
  }>;
}

/**
 * TradingView Alert History Entry
 */
export interface TVAlertHistoryEntry extends Identifiable, Timestamped {
  alertId: string;
  symbol: string;
  condition: string;
  triggered: boolean;
  triggeredAt?: string;
  price?: number;
  omegaAction?: {
    signalGenerated: boolean;
    signalId?: string;
    signalType?: string;
  };
  notes?: string;
}

/**
 * TradingView Alert History
 */
export interface TVAlertHistory {
  entries: TVAlertHistoryEntry[];
  summary: {
    totalAlerts: number;
    triggered: number;
    pending: number;
    triggerRate: number;
    omegaCorrelation: number; // How often TV alerts correlate with OMEGA signals
  };
  bySymbol: Record<string, {
    alerts: number;
    triggered: number;
  }>;
}

/**
 * TradingView Validation History Entry
 */
export interface TVValidationHistoryEntry extends Identifiable, Timestamped {
  validationId: string;
  type: "signal" | "strategy" | "backtest" | "paper";
  subject: {
    id: string;
    name: string;
    type: string;
  };
  omegaResult: {
    passed: boolean;
    confidence: number;
    checks: { name: string; passed: boolean }[];
  };
  tvResult: {
    indicators: { name: string; value: string; bullish: boolean }[];
    overallBullish: boolean;
  };
  agreement: boolean;
  notes?: string;
}

/**
 * TradingView Validation History
 */
export interface TVValidationHistory {
  entries: TVValidationHistoryEntry[];
  summary: {
    totalValidations: number;
    agreements: number;
    disagreements: number;
    agreementRate: number;
  };
  byType: Record<string, {
    validations: number;
    agreementRate: number;
  }>;
}

/**
 * TradingView Paper Trading Comparison Entry
 */
export interface TVPaperComparisonEntry extends Identifiable, Timestamped {
  tradeId: string;
  symbol: string;
  side: "Long" | "Short";
  omegaTrade: {
    entryPrice: number;
    exitPrice?: number;
    pnl?: number;
    duration?: number;
  };
  tvAnalysis: {
    entrySignal: string;
    exitSignal?: string;
    indicatorAlignment: number; // 0-100%
  };
  outcome: "omega_better" | "tv_better" | "similar" | "pending";
  learnings?: string;
}

/**
 * TradingView Paper Trading Comparison
 */
export interface TVPaperComparison {
  entries: TVPaperComparisonEntry[];
  summary: {
    totalComparisons: number;
    omegaBetter: number;
    tvBetter: number;
    similar: number;
    pending: number;
    omegaAdvantageRate: number;
  };
  insights: {
    bestOmegaConditions: string[];
    bestTVConditions: string[];
    recommendations: string[];
  };
}

/**
 * TradingView Testing Session
 */
export interface TVTestingSession extends Identifiable, Timestamped {
  status: "active" | "paused" | "completed" | "cancelled";
  startedAt: string;
  endedAt?: string;
  duration?: number;
  
  // Connection
  connected: boolean;
  connectionHistory: {
    timestamp: string;
    event: "connected" | "disconnected" | "reconnected";
  }[];
  
  // Chart state
  chartSymbol?: string;
  chartTimeframe?: string;
  chartHistory: {
    timestamp: string;
    symbol: string;
    timeframe: string;
  }[];
  
  // Testing results
  signalComparisons: TVSignalHistoryEntry[];
  alertsMonitored: TVAlertHistoryEntry[];
  validationsRun: TVValidationHistoryEntry[];
  paperComparisons: TVPaperComparisonEntry[];
  
  // Summary
  summary: {
    signalAlignmentRate: number;
    alertCorrelation: number;
    validationAgreement: number;
    paperPerformance: "omega_better" | "tv_better" | "similar";
    overallScore: number; // 0-100
  };
  
  notes?: string;
}

/**
 * TradingView Persistence Repository Interface
 */
export interface TVPersistenceRepository {
  // Signal History
  saveSignalComparison(entry: TVSignalHistoryEntry): Promise<RepositoryResult<TVSignalHistoryEntry>>;
  getSignalHistory(): Promise<RepositoryResult<TVSignalHistory>>;
  getSignalHistoryBySymbol(symbol: string): Promise<RepositoryResult<TVSignalHistoryEntry[]>>;
  
  // Alert History
  saveAlert(entry: TVAlertHistoryEntry): Promise<RepositoryResult<TVAlertHistoryEntry>>;
  getAlertHistory(): Promise<RepositoryResult<TVAlertHistory>>;
  getAlertsBySymbol(symbol: string): Promise<RepositoryResult<TVAlertHistoryEntry[]>>;
  
  // Validation History
  saveValidation(entry: TVValidationHistoryEntry): Promise<RepositoryResult<TVValidationHistoryEntry>>;
  getValidationHistory(): Promise<RepositoryResult<TVValidationHistory>>;
  getValidationsByType(type: string): Promise<RepositoryResult<TVValidationHistoryEntry[]>>;
  
  // Paper Comparison
  savePaperComparison(entry: TVPaperComparisonEntry): Promise<RepositoryResult<TVPaperComparisonEntry>>;
  getPaperComparisons(): Promise<RepositoryResult<TVPaperComparison>>;
  
  // Testing Sessions
  startSession(): Promise<RepositoryResult<TVTestingSession>>;
  endSession(sessionId: string): Promise<RepositoryResult<TVTestingSession>>;
  getCurrentSession(): Promise<RepositoryResult<TVTestingSession | null>>;
  getSessionHistory(limit?: number): Promise<RepositoryResult<TVTestingSession[]>>;
}
