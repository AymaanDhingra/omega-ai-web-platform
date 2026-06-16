/**
 * Event System Definitions
 * 
 * Defines all domain events that can occur in the system.
 */

import type { Asset } from "../market/types";
import type { Signal, Order, Position, Trade } from "../trading/types";
import type { Strategy } from "../strategy/types";
import type { Portfolio } from "../portfolio/types";
import type { PaperTrade } from "../paper-trading/types";
import type { AIRecommendation } from "../ai/types";

export type DomainEvent = 
  | MarketUpdateEvent
  | SignalCreatedEvent
  | SignalValidatedEvent
  | SignalExecutedEvent
  | TradeOpenedEvent
  | TradeManagingEvent
  | TradeClosedEvent
  | TradeErrorEvent
  | OrderSubmittedEvent
  | OrderFilledEvent
  | OrderCancelledEvent
  | PositionOpenedEvent
  | PositionClosedEvent
  | PortfolioUpdatedEvent
  | PortfolioRebalancedEvent
  | StrategyActivatedEvent
  | StrategyPausedEvent
  | AIAnalysisCompletedEvent
  | AIRecommendationGeneratedEvent
  | PaperTradeExecutedEvent
  | PaperTradeAnalyzedEvent;

export interface MarketUpdateEvent {
  type: "market:update";
  timestamp: string;
  asset: Asset;
  price: number;
  volume: number;
}

export interface SignalCreatedEvent {
  type: "signal:created";
  timestamp: string;
  signal: Signal;
}

export interface SignalValidatedEvent {
  type: "signal:validated";
  timestamp: string;
  signal: Signal;
  passed: boolean;
}

export interface SignalExecutedEvent {
  type: "signal:executed";
  timestamp: string;
  signal: Signal;
  order: Order;
}

export interface TradeOpenedEvent {
  type: "trade:opened";
  timestamp: string;
  trade: Trade;
}

export interface TradeManagingEvent {
  type: "trade:managing";
  timestamp: string;
  trade: Trade;
  action: string;
}

export interface TradeClosedEvent {
  type: "trade:closed";
  timestamp: string;
  trade: Trade;
  realizedPnL: number;
}

export interface TradeErrorEvent {
  type: "trade:error";
  timestamp: string;
  trade: Trade;
  error: string;
}

export interface OrderSubmittedEvent {
  type: "order:submitted";
  timestamp: string;
  order: Order;
}

export interface OrderFilledEvent {
  type: "order:filled";
  timestamp: string;
  order: Order;
  filledQuantity: number;
  averagePrice: number;
}

export interface OrderCancelledEvent {
  type: "order:cancelled";
  timestamp: string;
  order: Order;
  reason: string;
}

export interface PositionOpenedEvent {
  type: "position:opened";
  timestamp: string;
  position: Position;
}

export interface PositionClosedEvent {
  type: "position:closed";
  timestamp: string;
  position: Position;
  realizedPnL: number;
}

export interface PortfolioUpdatedEvent {
  type: "portfolio:updated";
  timestamp: string;
  portfolio: Portfolio;
  totalValue: number;
  totalPnL: number;
}

export interface PortfolioRebalancedEvent {
  type: "portfolio:rebalanced";
  timestamp: string;
  portfolio: Portfolio;
  changes: {
    asset: Asset;
    oldAllocation: number;
    newAllocation: number;
  }[];
}

export interface StrategyActivatedEvent {
  type: "strategy:activated";
  timestamp: string;
  strategy: Strategy;
}

export interface StrategyPausedEvent {
  type: "strategy:paused";
  timestamp: string;
  strategy: Strategy;
  reason: string;
}

export interface AIAnalysisCompletedEvent {
  type: "ai:analysis-completed";
  timestamp: string;
  asset: Asset;
  analysis: Record<string, unknown>;
}

export interface AIRecommendationGeneratedEvent {
  type: "ai:recommendation-generated";
  timestamp: string;
  recommendation: AIRecommendation;
}

export interface PaperTradeExecutedEvent {
  type: "paper-trade:executed";
  timestamp: string;
  trade: PaperTrade;
}

export interface PaperTradeAnalyzedEvent {
  type: "paper-trade:analyzed";
  timestamp: string;
  trade: PaperTrade;
  metrics: Record<string, unknown>;
}
