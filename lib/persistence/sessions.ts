/**
 * Session Abstractions
 * 
 * Sessions represent stateful workflows that span multiple operations.
 * Used for tracking trading sessions, AI analysis sessions, testing sessions, etc.
 * 
 * OMEGA Constitution: Mock implementations are the source of truth.
 */

import type { Identifiable, Timestamped } from "./repository";

/**
 * Base session interface
 */
export interface Session extends Identifiable, Timestamped {
  status: "active" | "paused" | "completed" | "cancelled" | "error";
  startedAt: string;
  endedAt?: string;
  duration?: number;
  metadata?: Record<string, unknown>;
}

/**
 * Trading Session - tracks a trading day or period
 */
export interface TradingSession extends Session {
  type: "trading";
  market: string;
  regime: "bull" | "bear" | "sideways" | "volatile";
  trades: {
    opened: number;
    closed: number;
    pending: number;
  };
  performance: {
    pnl: number;
    pnlPercent: number;
    winRate: number;
    bestTrade: { symbol: string; pnl: number };
    worstTrade: { symbol: string; pnl: number };
  };
  signals: {
    generated: number;
    executed: number;
    rejected: number;
  };
  notes?: string;
}

/**
 * AI Session - tracks an AI analysis or decision-making session
 */
export interface AISession extends Session {
  type: "ai";
  brainId: string;
  mode: "analysis" | "recommendation" | "learning" | "validation";
  inputs: {
    marketData: boolean;
    newsData: boolean;
    portfolioData: boolean;
    knowledgeBase: boolean;
  };
  outputs: {
    analysisCount: number;
    recommendationCount: number;
    confidenceAverage: number;
  };
  decisions: {
    id: string;
    type: string;
    confidence: number;
    accepted: boolean;
  }[];
  learningMetrics?: {
    samplesProcessed: number;
    accuracyBefore: number;
    accuracyAfter: number;
  };
}

/**
 * Paper Trading Session - tracks a paper trading practice session
 */
export interface PaperTradingSession extends Session {
  type: "paper";
  accountId: string;
  initialBalance: number;
  currentBalance: number;
  trades: {
    total: number;
    winning: number;
    losing: number;
    breakeven: number;
  };
  positions: {
    open: number;
    closed: number;
  };
  performance: {
    totalPnL: number;
    totalPnLPercent: number;
    winRate: number;
    profitFactor: number;
    maxDrawdown: number;
    sharpeRatio: number;
  };
  goals?: {
    targetPnL?: number;
    maxLoss?: number;
    minWinRate?: number;
  };
  goalsMet?: boolean;
}

/**
 * Testing Session - tracks a testing/validation session
 */
export interface TestingSession extends Session {
  type: "testing";
  testType: "unit" | "integration" | "e2e" | "validation" | "comparison";
  target: {
    module: string;
    component?: string;
    feature?: string;
  };
  results: {
    total: number;
    passed: number;
    failed: number;
    skipped: number;
  };
  coverage?: {
    lines: number;
    branches: number;
    functions: number;
  };
  failures?: {
    name: string;
    reason: string;
    stack?: string;
  }[];
}

/**
 * Validation Session - tracks signal/strategy validation
 */
export interface ValidationSession extends Session {
  type: "validation";
  validationType: "signal" | "strategy" | "backtest" | "paper" | "tradingview";
  subject: {
    id: string;
    type: string;
    name: string;
  };
  checks: {
    name: string;
    passed: boolean;
    severity: "critical" | "warning" | "info";
    message?: string;
  }[];
  summary: {
    totalChecks: number;
    passed: number;
    failed: number;
    warnings: number;
  };
  approved: boolean;
  approvedBy?: string;
  approvedAt?: string;
  rejectionReason?: string;
}

/**
 * TradingView Testing Session - tracks TradingView comparison testing
 * TradingView remains optional - OMEGA functions without it
 */
export interface TradingViewTestingSession extends Session {
  type: "tradingview";
  connected: boolean;
  chartSymbol?: string;
  chartTimeframe?: string;
  comparisons: {
    signalId: string;
    omegaSignal: string;
    tvSignal: string;
    aligned: boolean;
    notes?: string;
  }[];
  summary: {
    totalComparisons: number;
    aligned: number;
    divergent: number;
    alignmentRate: number;
  };
  alerts: {
    id: string;
    symbol: string;
    condition: string;
    triggered: boolean;
    triggeredAt?: string;
  }[];
}

/**
 * Session Manager Interface
 */
export interface SessionManager<T extends Session> {
  start(config: Partial<T>): Promise<T>;
  pause(sessionId: string): Promise<T>;
  resume(sessionId: string): Promise<T>;
  complete(sessionId: string, summary?: Record<string, unknown>): Promise<T>;
  cancel(sessionId: string, reason?: string): Promise<T>;
  get(sessionId: string): Promise<T | null>;
  getActive(): Promise<T[]>;
  getHistory(limit?: number): Promise<T[]>;
}

/**
 * Union type for all session types
 */
export type OmegaSession =
  | TradingSession
  | AISession
  | PaperTradingSession
  | TestingSession
  | ValidationSession
  | TradingViewTestingSession;

/**
 * TradingViewSession — Phase 7 spec alias for TradingViewTestingSession.
 * // Phase 7 spec alias — preserved for backward compatibility
 */
export type TradingViewSession = TradingViewTestingSession;
