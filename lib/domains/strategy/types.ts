/**
 * Strategy Domain Types
 * 
 * Defines the core strategy domain language for OMEGA AI.
 * Represents trading strategies, rules, indicators, and performance.
 * All implementations are mock-first.
 */

import type { Asset } from "../market/types";
import type { OrderSide } from "../trading/types";

export type StrategyState = "draft" | "active" | "paused" | "archived" | "error";
export type IndicatorType = "sma" | "ema" | "rsi" | "macd" | "bollinger" | "atr" | "adx" | "stochastic" | "custom";
export type ConditionOperator = "gt" | "gte" | "lt" | "lte" | "eq" | "neq" | "and" | "or";
export type RuleType = "entry" | "exit" | "filter" | "validation";

export interface Indicator {
  id: string;
  name: string;
  type: IndicatorType;
  parameters: {
    name: string;
    value: number | string;
  }[];
  description: string;
}

export interface Condition {
  id: string;
  indicator: Indicator;
  operator: ConditionOperator;
  value: number | string;
  description: string;
}

export interface EntryRule {
  id: string;
  name: string;
  conditions: Condition[];
  side: OrderSide;
  confidence: number;
  description: string;
}

export interface ExitRule {
  id: string;
  name: string;
  conditions: Condition[];
  reason: "target" | "stop-loss" | "timeout" | "rebalance";
  description: string;
}

export interface Filter {
  id: string;
  name: string;
  conditions: Condition[];
  description: string;
}

export interface ValidationRule {
  id: string;
  name: string;
  conditions: Condition[];
  required: boolean;
  description: string;
}

export interface Strategy {
  id: string;
  name: string;
  description: string;
  version: string;
  state: StrategyState;
  assets: Asset[];
  indicators: Indicator[];
  entryRules: EntryRule[];
  exitRules: ExitRule[];
  filters: Filter[];
  validationRules: ValidationRule[];
  riskProfile: {
    maxPositionSize: number;
    maxDrawdown: number;
    stopLossPercent: number;
    takeProfitPercent: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface StrategyVersion {
  id: string;
  strategy: Strategy;
  version: string;
  timestamp: string;
  changes: string[];
  performance?: StrategyPerformance;
}

export interface StrategyPerformance {
  id: string;
  strategy: Strategy;
  period: "1d" | "1w" | "1m" | "3m" | "6m" | "1y" | "all";
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
  sharpeRatio: number;
  sortinoRatio: number;
  calmarRatio: number;
  recoveryFactor: number;
  timestamp: string;
}

export interface StrategySnapshot {
  id: string;
  strategy: Strategy;
  timestamp: string;
  state: StrategyState;
  activePositions: number;
  totalPnL: number;
  totalPnLPercent: number;
  winRate: number;
  lastSignal?: {
    timestamp: string;
    asset: Asset;
    side: OrderSide;
    confidence: number;
  };
}

export interface StrategySelection {
  id: string;
  timestamp: string;
  strategies: {
    strategy: Strategy;
    score: number;
    reason: string;
  }[];
  selectedStrategy: Strategy;
  confidence: number;
}
