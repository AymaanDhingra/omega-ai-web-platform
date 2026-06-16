/**
 * Market Domain Enums
 */

export enum MarketTypeEnum {
  EQUITY = "equity",
  CRYPTO = "crypto",
  FOREX = "forex",
  COMMODITY = "commodity",
  INDEX = "index",
  ETF = "etf"
}

export enum ExchangeTypeEnum {
  NSE = "nse",
  BSE = "bse",
  NFO = "nfo",
  MCX = "mcx",
  BINANCE = "binance",
  COINBASE = "coinbase",
  FOREX = "forex",
  OTHER = "other"
}

export enum TradingSessionStatusEnum {
  PRE_MARKET = "pre-market",
  OPEN = "open",
  CLOSED = "closed",
  HALTED = "halted",
  SUSPENDED = "suspended"
}

export enum MarketRegimeTypeEnum {
  TRENDING_UP = "trending-up",
  TRENDING_DOWN = "trending-down",
  RANGING = "ranging",
  VOLATILE = "volatile",
  CALM = "calm"
}

export enum LiquidityLevelEnum {
  HIGH = "high",
  MEDIUM = "medium",
  LOW = "low",
  ILLIQUID = "illiquid"
}

export enum VolatilityLevelEnum {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  EXTREME = "extreme"
}

export enum MarketSentimentEnum {
  BULLISH = "bullish",
  NEUTRAL = "neutral",
  BEARISH = "bearish"
}
