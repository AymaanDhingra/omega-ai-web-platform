/**
 * AI Domain Enums
 */

export enum ConfidenceLevelEnum {
  VERY_LOW = "very-low",
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  VERY_HIGH = "very-high"
}

export enum AISystemStatusEnum {
  INITIALIZING = "initializing",
  READY = "ready",
  ANALYZING = "analyzing",
  DECIDING = "deciding",
  EXECUTING = "executing",
  ERROR = "error",
  OFFLINE = "offline"
}

export enum LearningEventTypeEnum {
  TRADE_RESULT = "trade-result",
  STRATEGY_PERFORMANCE = "strategy-performance",
  MARKET_EVENT = "market-event",
  USER_FEEDBACK = "user-feedback"
}
