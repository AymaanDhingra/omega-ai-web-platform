/**
 * Shared System Enums
 */

export enum EventTypeEnum {
  MARKET_UPDATE = "market:update",
  SIGNAL_CREATED = "signal:created",
  SIGNAL_VALIDATED = "signal:validated",
  SIGNAL_EXECUTED = "signal:executed",
  TRADE_OPENED = "trade:opened",
  TRADE_MANAGING = "trade:managing",
  TRADE_CLOSED = "trade:closed",
  TRADE_ERROR = "trade:error",
  ORDER_SUBMITTED = "order:submitted",
  ORDER_FILLED = "order:filled",
  ORDER_CANCELLED = "order:cancelled",
  POSITION_OPENED = "position:opened",
  POSITION_CLOSED = "position:closed",
  PORTFOLIO_UPDATED = "portfolio:updated",
  PORTFOLIO_REBALANCED = "portfolio:rebalanced",
  STRATEGY_ACTIVATED = "strategy:activated",
  STRATEGY_PAUSED = "strategy:paused",
  AI_ANALYSIS_COMPLETED = "ai:analysis-completed",
  AI_RECOMMENDATION_GENERATED = "ai:recommendation-generated",
  PAPER_TRADE_EXECUTED = "paper-trade:executed",
  PAPER_TRADE_ANALYZED = "paper-trade:analyzed"
}
