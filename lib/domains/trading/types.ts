/**
 * Trading Domain Types
 * 
 * Defines the core trading domain language for OMEGA AI.
 * Represents trading concepts, signals, orders, positions, and trades.
 * All implementations are mock-first.
 */

import type { Asset } from "../market/types";

export type SignalStatus = "created" | "validated" | "queued" | "executed" | "open" | "partial" | "closed" | "cancelled" | "archived";
export type OrderStatus = "pending" | "submitted" | "accepted" | "rejected" | "filled" | "partial" | "cancelled" | "expired";
export type PositionStatus = "open" | "partial" | "closing" | "closed" | "error";
export type TradeStatus = "pending" | "open" | "managing" | "partial" | "closed" | "cancelled" | "journaled";
export type ExecutionStatus = "pending" | "submitted" | "executed" | "failed" | "cancelled";
export type OrderSide = "buy" | "sell";
export type OrderType = "market" | "limit" | "stop" | "stop-limit" | "trailing-stop";
export type TimeInForce = "day" | "gtc" | "ioc" | "fok";

export interface Signal {
  id: string;
  asset: Asset;
  timestamp: string;
  status: SignalStatus;
  type: "entry" | "exit" | "adjustment";
  side: OrderSide;
  confidence: number;
  strength: number;
  indicators: {
    name: string;
    value: number;
    signal: boolean;
  }[];
  reasoning: string;
  source: "ai" | "strategy" | "manual" | "tradingview";
  validatedAt?: string;
  executedAt?: string;
  cancelledAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  signal?: Signal;
  asset: Asset;
  timestamp: string;
  status: OrderStatus;
  side: OrderSide;
  type: OrderType;
  quantity: number;
  price: number;
  stopPrice?: number;
  limitPrice?: number;
  timeInForce: TimeInForce;
  filledQuantity: number;
  averagePrice: number;
  commission: number;
  externalOrderId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Position {
  id: string;
  asset: Asset;
  timestamp: string;
  status: PositionStatus;
  side: OrderSide;
  quantity: number;
  entryPrice: number;
  currentPrice: number;
  unrealizedPnL: number;
  unrealizedPnLPercent: number;
  orders: Order[];
  createdAt: string;
  updatedAt: string;
}

export interface Execution {
  id: string;
  order: Order;
  timestamp: string;
  status: ExecutionStatus;
  quantity: number;
  price: number;
  commission: number;
  externalExecutionId?: string;
  createdAt: string;
}

export interface Exit {
  id: string;
  position: Position;
  timestamp: string;
  exitPrice: number;
  exitQuantity: number;
  realizedPnL: number;
  realizedPnLPercent: number;
  reason: "target" | "stop-loss" | "manual" | "timeout" | "rebalance";
  order: Order;
  createdAt: string;
}

export interface RiskProfile {
  id: string;
  maxPositionSize: number;
  maxDrawdown: number;
  maxLossPerTrade: number;
  riskRewardRatio: number;
  stopLossPercent: number;
  takeProfitPercent: number;
  trailingStopPercent?: number;
  maxOpenPositions: number;
  maxDailyLoss: number;
  correlationLimit: number;
}

export interface TradeLifecycle {
  id: string;
  signal: Signal;
  orders: Order[];
  positions: Position[];
  executions: Execution[];
  exits: Exit[];
  startTime: string;
  endTime?: string;
  duration?: number;
  status: TradeStatus;
}

export interface TradeDecision {
  id: string;
  timestamp: string;
  asset: Asset;
  decision: "buy" | "sell" | "hold" | "close";
  confidence: number;
  reasoning: string;
  riskProfile: RiskProfile;
  validationPassed: boolean;
  executionApproved: boolean;
}

export interface TradeValidation {
  id: string;
  trade: TradeLifecycle;
  timestamp: string;
  passed: boolean;
  checks: {
    name: string;
    passed: boolean;
    reason?: string;
  }[];
  riskAssessment: {
    riskLevel: "low" | "medium" | "high" | "critical";
    concerns: string[];
  };
}

export interface TradeSnapshot {
  id: string;
  timestamp: string;
  asset: Asset;
  side: OrderSide;
  entryPrice: number;
  currentPrice: number;
  quantity: number;
  unrealizedPnL: number;
  unrealizedPnLPercent: number;
  status: TradeStatus;
  duration: number;
}

export interface TradeHistory {
  id: string;
  timestamp: string;
  trades: TradeSnapshot[];
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
