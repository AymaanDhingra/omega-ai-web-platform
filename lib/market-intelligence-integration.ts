import { marketApi } from "../api/market";
import type { MarketIntelligenceSignalInput, TradeSignal } from "./types";

/**
 * Market Intelligence + SignalFlow integration.
 *
 * This does not create a market pipeline. It prepares market awareness as an
 * additional input for the existing SignalFlow decision path.
 */
export async function prepareMarketIntelligenceForSignal(signal: TradeSignal): Promise<MarketIntelligenceSignalInput> {
  const analysis = await marketApi.analyzeMarket(signal.market, signal.symbol);
  const volatilityPenalty = analysis.context.volatility > 0.5 ? 0.15 : 0;
  const relevanceScore = Math.max(0, Math.min(1, analysis.confidence - volatilityPenalty));

  return {
    signalId: signal.id,
    market: signal.market,
    symbol: signal.symbol,
    analysis,
    relevanceScore,
    reasoning: `Market intelligence added to SignalFlow for ${signal.symbol}; it informs context but does not execute decisions.`,
    appliedAt: new Date().toISOString()
  };
}

export async function enrichSignalFlowWithMarketIntelligence(signal: TradeSignal): Promise<TradeSignal> {
  const input = await prepareMarketIntelligenceForSignal(signal);
  const adjustedConfidence = Math.round(signal.confidence * (0.9 + input.relevanceScore * 0.1));

  return {
    ...signal,
    confidence: Math.min(100, adjustedConfidence),
    reasoning: `${signal.reasoning} Market intelligence: ${input.analysis.summary}`
  };
}
