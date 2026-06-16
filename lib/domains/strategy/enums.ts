/**
 * Strategy Domain Enums
 */

export enum StrategyStateEnum {
  DRAFT = "draft",
  ACTIVE = "active",
  PAUSED = "paused",
  ARCHIVED = "archived",
  ERROR = "error"
}

export enum IndicatorTypeEnum {
  SMA = "sma",
  EMA = "ema",
  RSI = "rsi",
  MACD = "macd",
  BOLLINGER = "bollinger",
  ATR = "atr",
  ADX = "adx",
  STOCHASTIC = "stochastic",
  CUSTOM = "custom"
}

export enum ConditionOperatorEnum {
  GT = "gt",
  GTE = "gte",
  LT = "lt",
  LTE = "lte",
  EQ = "eq",
  NEQ = "neq",
  AND = "and",
  OR = "or"
}

export enum RuleTypeEnum {
  ENTRY = "entry",
  EXIT = "exit",
  FILTER = "filter",
  VALIDATION = "validation"
}

export enum PeriodEnum {
  ONE_DAY = "1d",
  ONE_WEEK = "1w",
  ONE_MONTH = "1m",
  THREE_MONTHS = "3m",
  SIX_MONTHS = "6m",
  ONE_YEAR = "1y",
  ALL = "all"
}
