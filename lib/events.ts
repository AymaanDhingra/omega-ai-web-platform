import type { AIBrain, MarketAsset, NewsEvent, Portfolio, Strategy, TradeSignal } from "./types";
import type { PaperOrder, PaperPosition, TradeJournalEntry, PaperPerformanceMetrics } from "./contracts/paper-trading";
import type { SignalFlowPipelineResult, SignalFlowStageResult } from "./contracts/signal-flow";

export type OmegaEventType =
  // Existing events
  | "market.update"
  | "signal.created"
  | "paper.trade.opened"
  | "paper.trade.closed"
  | "portfolio.updated"
  | "news.received"
  | "strategy.updated"
  | "ai.state.changed"
  // TradingView events (optional - OMEGA functions without TradingView)
  | "tradingview.connected"
  | "tradingview.disconnected"
  | "tradingview.watchlist.updated"
  | "tradingview.chart.updated"
  | "tradingview.validation.completed"
  | "tradingview.alert.triggered"
  // Persistence events
  | "persistence.snapshot.created"
  | "persistence.entity.archived"
  | "persistence.entity.restored"
  // Session events
  | "session.started"
  | "session.paused"
  | "session.resumed"
  | "session.completed"
  | "session.cancelled"
  // Cache events
  | "cache.invalidated"
  | "cache.refreshed"
  // Signal flow pipeline events (Phase 8)
  | "signal.flow.started"
  | "signal.flow.stage.completed"
  | "signal.flow.completed"
  | "signal.flow.failed"
  // Paper trading lifecycle events (Phase 8)
  | "paper.lifecycle.order.created"
  | "paper.lifecycle.order.filled"
  | "paper.lifecycle.position.opened"
  | "paper.lifecycle.position.closed"
  | "paper.lifecycle.journal.entry"
  | "paper.lifecycle.performance.updated";

export interface OmegaEventBase<TType extends OmegaEventType, TPayload> {
  id: string;
  type: TType;
  createdAt: string;
  payload: TPayload;
}

// Existing events
export type MarketUpdateEvent = OmegaEventBase<"market.update", MarketAsset>;
export type SignalCreatedEvent = OmegaEventBase<"signal.created", TradeSignal>;
export type PaperTradeOpenedEvent = OmegaEventBase<"paper.trade.opened", { order: PaperOrder; position: PaperPosition }>;
export type PaperTradeClosedEvent = OmegaEventBase<"paper.trade.closed", { journalEntry: TradeJournalEntry }>;
export type PortfolioUpdatedEvent = OmegaEventBase<"portfolio.updated", Portfolio>;
export type NewsReceivedEvent = OmegaEventBase<"news.received", NewsEvent>;
export type StrategyUpdatedEvent = OmegaEventBase<"strategy.updated", Strategy>;
export type AIStateChangedEvent = OmegaEventBase<"ai.state.changed", AIBrain>;

// TradingView events (optional - OMEGA functions without TradingView)
export type TradingViewConnectedEvent = OmegaEventBase<"tradingview.connected", {
  timestamp: string;
  chartSymbol?: string;
  chartTimeframe?: string;
}>;

export type TradingViewDisconnectedEvent = OmegaEventBase<"tradingview.disconnected", {
  timestamp: string;
  reason?: string;
  willReconnect: boolean;
}>;

export type TradingViewWatchlistUpdatedEvent = OmegaEventBase<"tradingview.watchlist.updated", {
  symbols: string[];
  added?: string[];
  removed?: string[];
}>;

export type TradingViewChartUpdatedEvent = OmegaEventBase<"tradingview.chart.updated", {
  symbol: string;
  timeframe: string;
  previousSymbol?: string;
  previousTimeframe?: string;
}>;

export type TradingViewValidationCompletedEvent = OmegaEventBase<"tradingview.validation.completed", {
  validationId: string;
  signalId: string;
  symbol: string;
  omegaSignal: string;
  tvSignal: string;
  aligned: boolean;
  confidence: number;
}>;

export type TradingViewAlertTriggeredEvent = OmegaEventBase<"tradingview.alert.triggered", {
  alertId: string;
  symbol: string;
  condition: string;
  price: number;
  timestamp: string;
}>;

// Persistence events
export type PersistenceSnapshotCreatedEvent = OmegaEventBase<"persistence.snapshot.created", {
  snapshotId: string;
  entityId: string;
  entityType: string;
  version: number;
  reason?: string;
}>;

export type PersistenceEntityArchivedEvent = OmegaEventBase<"persistence.entity.archived", {
  entityId: string;
  entityType: string;
  archivedAt: string;
}>;

export type PersistenceEntityRestoredEvent = OmegaEventBase<"persistence.entity.restored", {
  entityId: string;
  entityType: string;
  restoredAt: string;
}>;

// Session events
export type SessionStartedEvent = OmegaEventBase<"session.started", {
  sessionId: string;
  sessionType: string;
  startedAt: string;
}>;

export type SessionPausedEvent = OmegaEventBase<"session.paused", {
  sessionId: string;
  sessionType: string;
  pausedAt: string;
}>;

export type SessionResumedEvent = OmegaEventBase<"session.resumed", {
  sessionId: string;
  sessionType: string;
  resumedAt: string;
}>;

export type SessionCompletedEvent = OmegaEventBase<"session.completed", {
  sessionId: string;
  sessionType: string;
  completedAt: string;
  duration: number;
  summary?: Record<string, unknown>;
}>;

export type SessionCancelledEvent = OmegaEventBase<"session.cancelled", {
  sessionId: string;
  sessionType: string;
  cancelledAt: string;
  reason?: string;
}>;

// Cache events
export type CacheInvalidatedEvent = OmegaEventBase<"cache.invalidated", {
  cacheType: string;
  keys?: string[];
  reason?: string;
}>;

export type CacheRefreshedEvent = OmegaEventBase<"cache.refreshed", {
  cacheType: string;
  entriesRefreshed: number;
  duration: number;
}>;

// Signal flow pipeline events (Phase 8)
export type SignalFlowStartedEvent = OmegaEventBase<"signal.flow.started", {
  pipelineId: string;
  symbol: string;
  startedAt: string;
  config?: Record<string, unknown>;
}>;

export type SignalFlowStageCompletedEvent = OmegaEventBase<"signal.flow.stage.completed", {
  pipelineId: string;
  symbol: string;
  stage: SignalFlowStageResult;
}>;

export type SignalFlowCompletedEvent = OmegaEventBase<"signal.flow.completed", {
  pipelineId: string;
  symbol: string;
  result: SignalFlowPipelineResult;
}>;

export type SignalFlowFailedEvent = OmegaEventBase<"signal.flow.failed", {
  pipelineId: string;
  symbol: string;
  failedStage?: string;
  error: string;
}>;

// Paper trading lifecycle events (Phase 8)
export type PaperLifecycleOrderCreatedEvent = OmegaEventBase<"paper.lifecycle.order.created", {
  order: PaperOrder;
  accountId: string;
}>;

export type PaperLifecycleOrderFilledEvent = OmegaEventBase<"paper.lifecycle.order.filled", {
  order: PaperOrder;
  filledPrice: string;
  filledAt: string;
}>;

export type PaperLifecyclePositionOpenedEvent = OmegaEventBase<"paper.lifecycle.position.opened", {
  position: PaperPosition;
  orderId: string;
}>;

export type PaperLifecyclePositionClosedEvent = OmegaEventBase<"paper.lifecycle.position.closed", {
  position: PaperPosition;
  closedAt: string;
  realizedPnl: string;
}>;

export type PaperLifecycleJournalEntryEvent = OmegaEventBase<"paper.lifecycle.journal.entry", {
  entry: TradeJournalEntry;
}>;

export type PaperLifecyclePerformanceUpdatedEvent = OmegaEventBase<"paper.lifecycle.performance.updated", {
  metrics: PaperPerformanceMetrics;
  accountId: string;
}>;

export type OmegaEvent =
  // Existing events
  | MarketUpdateEvent
  | SignalCreatedEvent
  | PaperTradeOpenedEvent
  | PaperTradeClosedEvent
  | PortfolioUpdatedEvent
  | NewsReceivedEvent
  | StrategyUpdatedEvent
  | AIStateChangedEvent
  // TradingView events
  | TradingViewConnectedEvent
  | TradingViewDisconnectedEvent
  | TradingViewWatchlistUpdatedEvent
  | TradingViewChartUpdatedEvent
  | TradingViewValidationCompletedEvent
  | TradingViewAlertTriggeredEvent
  // Persistence events
  | PersistenceSnapshotCreatedEvent
  | PersistenceEntityArchivedEvent
  | PersistenceEntityRestoredEvent
  // Session events
  | SessionStartedEvent
  | SessionPausedEvent
  | SessionResumedEvent
  | SessionCompletedEvent
  | SessionCancelledEvent
  // Cache events
  | CacheInvalidatedEvent
  | CacheRefreshedEvent
  // Signal flow pipeline events (Phase 8)
  | SignalFlowStartedEvent
  | SignalFlowStageCompletedEvent
  | SignalFlowCompletedEvent
  | SignalFlowFailedEvent
  // Paper trading lifecycle events (Phase 8)
  | PaperLifecycleOrderCreatedEvent
  | PaperLifecycleOrderFilledEvent
  | PaperLifecyclePositionOpenedEvent
  | PaperLifecyclePositionClosedEvent
  | PaperLifecycleJournalEntryEvent
  | PaperLifecyclePerformanceUpdatedEvent;

export type OmegaEventHandler<TEvent extends OmegaEvent = OmegaEvent> = (event: TEvent) => void;

export interface OmegaEventBus {
  publish(event: OmegaEvent): void;
  subscribe(handler: OmegaEventHandler): () => void;
  history(): OmegaEvent[];
}

export function createMockEventBus(seed: OmegaEvent[] = []): OmegaEventBus {
  const handlers = new Set<OmegaEventHandler>();
  const events: OmegaEvent[] = [...seed];

  return {
    publish(event) {
      events.push(event);
      handlers.forEach((handler) => handler(event));
    },
    subscribe(handler) {
      handlers.add(handler);
      return () => handlers.delete(handler);
    },
    history() {
      return [...events];
    }
  };
}
