import type {
  MarketAnalysis,
  MarketContext,
  MarketEvent,
  MarketInsight,
  MarketIntelligenceRepository,
  MarketObservation,
  MarketOpportunity,
  MarketRisk,
  MarketSummary
} from "../types";
import { marketAssets } from "./market";

const now = "2026-06-16T00:00:00.000Z";

export const marketContexts: MarketContext[] = marketAssets.map((asset) => ({
  id: `context-${asset.id}`,
  timestamp: now,
  market: asset.group,
  symbol: asset.symbol,
  condition: asset.signal === "Buy" ? "bullish" : asset.signal === "Sell" ? "bearish" : "neutral",
  trend: asset.trend.toLowerCase().includes("breakout") ? "breakout" : asset.change > 0 ? "uptrend" : asset.change < 0 ? "downtrend" : "sideways",
  sentiment: asset.signal === "Buy" ? "bullish" : asset.signal === "Sell" ? "bearish" : "neutral",
  regime: asset.trend.toLowerCase().includes("volatile") ? "volatile" : asset.change === 0 ? "ranging" : "trending",
  volatility: Math.min(1, Math.abs(asset.change) / 2),
  volume: asset.volume,
  price: asset.price,
  source: "market-snapshot-flow",
  metadata: {
    confidence: asset.confidence,
    support: asset.support,
    resistance: asset.resistance
  }
}));

export const marketEvents: MarketEvent[] = [
  {
    id: "event-economic-rbi-policy",
    type: "economic",
    timestamp: now,
    market: "Indian",
    title: "Mock RBI policy watch",
    description: "Economic event context included for market awareness without live feeds.",
    impact: "high",
    sentiment: "neutral",
    source: "mock-economic-events",
    metadata: { policySensitive: true }
  },
  {
    id: "event-global-volatility",
    type: "volatility",
    timestamp: now,
    market: "Global",
    title: "Mock global volatility expansion",
    description: "Global assets show elevated volatility in the mock intelligence layer.",
    impact: "medium",
    sentiment: "bearish",
    source: "mock-volatility",
    metadata: { volatilityRegime: "elevated" }
  },
  {
    id: "event-tradingview-observation",
    type: "tradingview",
    timestamp: now,
    market: "Indian",
    symbol: "NIFTY",
    title: "Optional TradingView chart observation",
    description: "TradingView contributes validation context only and never makes decisions.",
    impact: "low",
    sentiment: "neutral",
    source: "mock-tradingview-optional",
    metadata: { decisionAuthority: false }
  }
];

export const marketObservations: MarketObservation[] = [
  {
    id: "observation-sector-banking",
    timestamp: now,
    market: "Indian",
    symbol: "BANKNIFTY",
    observation: "Banking sector shows mock momentum leadership.",
    confidence: 0.72,
    source: "sector",
    metadata: { sector: "Banking" }
  },
  {
    id: "observation-paper-results",
    timestamp: now,
    market: "Crypto",
    symbol: "BTCUSDT",
    observation: "Paper trading results support measured risk-on crypto exposure.",
    confidence: 0.68,
    source: "paper-trading",
    metadata: { paperOnly: true }
  },
  {
    id: "observation-tradingview-trend",
    timestamp: now,
    market: "Global",
    symbol: "NASDAQ",
    observation: "TradingView-assisted trend validation is available as optional context.",
    confidence: 0.64,
    source: "tradingview",
    metadata: { optional: true, execution: false }
  }
];

export const marketInsights: MarketInsight[] = [
  {
    id: "insight-signalflow-context",
    timestamp: now,
    market: "Indian",
    insight: "Market intelligence should adjust confidence context, not create a separate signal path.",
    implications: ["SignalFlow remains primary", "Market data is advisory", "Paper trading validates outcomes"],
    confidence: 0.82,
    relatedEvents: ["event-economic-rbi-policy"],
    relatedObservations: ["observation-sector-banking"],
    metadata: { pipeline: "SignalFlow" }
  }
];

export const marketRisks: MarketRisk[] = [
  {
    id: "risk-volatility-expansion",
    timestamp: now,
    market: "Global",
    riskType: "volatility",
    description: "Mock volatility expansion can reduce signal quality.",
    severity: "medium",
    probability: 0.45,
    impact: 0.55,
    mitigation: ["Reduce confidence", "Prefer paper validation", "Respect stop rules"],
    metadata: { mockOnly: true }
  }
];

export const marketOpportunities: MarketOpportunity[] = [
  {
    id: "opportunity-sector-rotation",
    timestamp: now,
    market: "Indian",
    opportunityType: "sector-rotation",
    description: "Mock banking leadership creates an intelligence input for SignalFlow.",
    potential: 0.7,
    timeframe: "short-term mock window",
    requirements: ["SignalFlow confirmation", "Knowledge layer agreement", "Paper trade validation"],
    metadata: { execution: "none" }
  }
];

function filterByMarket<T extends { market: string }>(items: T[], market?: string): T[] {
  return market ? items.filter((item) => item.market === market) : [...items];
}

export const mockMarketIntelligenceRepository: MarketIntelligenceRepository = {
  async getContexts(market) {
    return filterByMarket(marketContexts, market);
  },
  async getEvents(market) {
    return filterByMarket(marketEvents, market);
  },
  async getObservations(market) {
    return filterByMarket(marketObservations, market);
  },
  async getInsights(market) {
    return filterByMarket(marketInsights, market);
  },
  async getRisks(market) {
    return filterByMarket(marketRisks, market);
  },
  async getOpportunities(market) {
    return filterByMarket(marketOpportunities, market);
  },
  async analyzeMarket(market, symbol) {
    const contexts = filterByMarket(marketContexts, market);
    const context = contexts.find((item) => item.symbol === symbol) ?? contexts[0] ?? marketContexts[0];
    const observations = filterByMarket(marketObservations, market).filter((item) => !symbol || !item.symbol || item.symbol === symbol);
    const insights = filterByMarket(marketInsights, market);
    const risks = filterByMarket(marketRisks, market);
    const opportunities = filterByMarket(marketOpportunities, market);

    return {
      id: `analysis-${market.toLowerCase()}-${symbol ?? "all"}`,
      timestamp: now,
      market,
      symbol,
      context,
      observations,
      insights,
      risks,
      opportunities,
      summary: `${market}${symbol ? ` ${symbol}` : ""} mock intelligence context prepared for SignalFlow.`,
      confidence: Math.min(0.95, Math.max(0.5, context.volatility < 0.5 ? 0.78 : 0.62)),
      metadata: { mockFirst: true, liveFeeds: false }
    };
  },
  async summarizeMarket(market) {
    const analysis = await this.analyzeMarket(market);
    return {
      id: `summary-${market.toLowerCase()}`,
      timestamp: now,
      market,
      summary: analysis.summary,
      keyPoints: analysis.insights.flatMap((insight) => insight.implications),
      risks: analysis.risks.map((risk) => risk.description),
      opportunities: analysis.opportunities.map((opportunity) => opportunity.description),
      nextActions: ["Use as SignalFlow input", "Validate through paper trading", "Keep TradingView optional"],
      generatedAt: now,
      generatedBy: "mock-market-intelligence"
    };
  }
};
