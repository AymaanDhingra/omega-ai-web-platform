/**
 * Market Domain Types
 * 
 * Defines the core market domain language for OMEGA AI.
 * These types represent market concepts, not backend services.
 * All implementations are mock-first.
 */

export type MarketType = "equity" | "crypto" | "forex" | "commodity" | "index" | "etf";
export type ExchangeType = "nse" | "bse" | "nfo" | "mcx" | "binance" | "coinbase" | "forex" | "other";
export type TradingSessionStatus = "pre-market" | "open" | "closed" | "halted" | "suspended";
export type MarketRegimeType = "trending-up" | "trending-down" | "ranging" | "volatile" | "calm";
export type LiquidityLevel = "high" | "medium" | "low" | "illiquid";
export type VolatilityLevel = "low" | "medium" | "high" | "extreme";

export interface Asset {
  id: string;
  symbol: string;
  name: string;
  type: MarketType;
  exchange: Exchange;
  sector?: string;
  industry?: string;
  currency: string;
  lotSize: number;
  tickSize: number;
  multiplier: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Exchange {
  id: string;
  code: string;
  name: string;
  type: ExchangeType;
  country: string;
  timezone: string;
  currency: string;
  active: boolean;
}

export interface TradingSession {
  id: string;
  exchange: Exchange;
  date: string;
  status: TradingSessionStatus;
  openTime: string;
  closeTime: string;
  preMarketStart?: string;
  preMarketEnd?: string;
  afterMarketStart?: string;
  afterMarketEnd?: string;
  isHoliday: boolean;
  holidayName?: string;
}

export interface MarketCalendar {
  id: string;
  exchange: Exchange;
  year: number;
  sessions: TradingSession[];
  holidays: string[];
  specialEvents: {
    date: string;
    name: string;
    impact: "high" | "medium" | "low";
  }[];
}

export interface Sector {
  id: string;
  code: string;
  name: string;
  description: string;
  assets: Asset[];
}

export interface Industry {
  id: string;
  code: string;
  name: string;
  sector: Sector;
  description: string;
  assets: Asset[];
}

export interface MarketRegime {
  id: string;
  type: MarketRegimeType;
  startDate: string;
  endDate?: string;
  confidence: number;
  indicators: {
    name: string;
    value: number;
  }[];
  description: string;
}

export interface LiquidityProfile {
  id: string;
  asset: Asset;
  date: string;
  level: LiquidityLevel;
  bidAskSpread: number;
  averageVolume: number;
  volumeProfile: {
    hour: number;
    volume: number;
  }[];
  depth: {
    level: number;
    bid: number;
    ask: number;
  }[];
}

export interface VolatilityProfile {
  id: string;
  asset: Asset;
  date: string;
  level: VolatilityLevel;
  historicalVolatility: number;
  impliedVolatility?: number;
  atr: number;
  atrPercent: number;
  standardDeviation: number;
  beta?: number;
}

export interface MarketSnapshot {
  id: string;
  timestamp: string;
  asset: Asset;
  price: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  change: number;
  changePercent: number;
  bid: number;
  ask: number;
  bidVolume: number;
  askVolume: number;
  liquidity: LiquidityProfile;
  volatility: VolatilityProfile;
  regime: MarketRegime;
}

export interface MarketState {
  id: string;
  timestamp: string;
  assets: MarketSnapshot[];
  regime: MarketRegime;
  overallVolatility: VolatilityLevel;
  overallLiquidity: LiquidityLevel;
  marketSentiment: "bullish" | "neutral" | "bearish";
  correlations: {
    asset1: string;
    asset2: string;
    correlation: number;
  }[];
}
