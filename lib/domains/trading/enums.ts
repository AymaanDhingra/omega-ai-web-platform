/**
 * Trading Domain Enums
 */

export enum SignalStatusEnum {
  CREATED = "created",
  VALIDATED = "validated",
  QUEUED = "queued",
  EXECUTED = "executed",
  OPEN = "open",
  PARTIAL = "partial",
  CLOSED = "closed",
  CANCELLED = "cancelled",
  ARCHIVED = "archived"
}

export enum OrderStatusEnum {
  PENDING = "pending",
  SUBMITTED = "submitted",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
  FILLED = "filled",
  PARTIAL = "partial",
  CANCELLED = "cancelled",
  EXPIRED = "expired"
}

export enum PositionStatusEnum {
  OPEN = "open",
  PARTIAL = "partial",
  CLOSING = "closing",
  CLOSED = "closed",
  ERROR = "error"
}

export enum TradeStatusEnum {
  PENDING = "pending",
  OPEN = "open",
  MANAGING = "managing",
  PARTIAL = "partial",
  CLOSED = "closed",
  CANCELLED = "cancelled",
  JOURNALED = "journaled"
}

export enum ExecutionStatusEnum {
  PENDING = "pending",
  SUBMITTED = "submitted",
  EXECUTED = "executed",
  FAILED = "failed",
  CANCELLED = "cancelled"
}

export enum OrderSideEnum {
  BUY = "buy",
  SELL = "sell"
}

export enum OrderTypeEnum {
  MARKET = "market",
  LIMIT = "limit",
  STOP = "stop",
  STOP_LIMIT = "stop-limit",
  TRAILING_STOP = "trailing-stop"
}

export enum TimeInForceEnum {
  DAY = "day",
  GTC = "gtc",
  IOC = "ioc",
  FOK = "fok"
}

export enum ExitReasonEnum {
  TARGET = "target",
  STOP_LOSS = "stop-loss",
  MANUAL = "manual",
  TIMEOUT = "timeout",
  REBALANCE = "rebalance"
}

export enum RiskLevelEnum {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  CRITICAL = "critical"
}
