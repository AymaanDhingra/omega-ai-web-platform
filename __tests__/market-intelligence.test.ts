import { marketApi } from "../api/market";
import { FEATURE_FLAGS } from "../lib/feature-flags";
import { enrichSignalFlowWithMarketIntelligence, prepareMarketIntelligenceForSignal } from "../lib/market-intelligence-integration";
import type { TradeSignal } from "../lib/types";

describe("Phase 10 Market Intelligence Layer", () => {
  const signal: TradeSignal = {
    id: "signal-nifty",
    market: "Indian",
    symbol: "NIFTY",
    direction: "Long",
    entry: "23486",
    stop: "23210",
    targets: "23720",
    confidence: 67,
    expectedValue: "1.4R",
    risk: "Medium",
    reasoning: "Existing SignalFlow signal."
  };

  it("enables market intelligence feature flags by default", () => {
    expect(FEATURE_FLAGS.ENABLE_MARKET_INTELLIGENCE).toBe(true);
    expect(FEATURE_FLAGS.ENABLE_MARKET_ANALYSIS).toBe(true);
    expect(FEATURE_FLAGS.ENABLE_MARKET_INSIGHTS).toBe(true);
  });

  it("exposes market intelligence through the existing market API", async () => {
    const repository = marketApi.getMarketIntelligence();
    const contexts = await repository.getContexts("Indian");
    const events = await repository.getEvents("Indian");

    expect(contexts.length).toBeGreaterThan(0);
    expect(events.some((event) => event.type === "tradingview")).toBe(true);
  });

  it("creates mock market analysis from existing market snapshot flow", async () => {
    const analysis = await marketApi.analyzeMarket("Indian", "NIFTY");

    expect(analysis.market).toBe("Indian");
    expect(analysis.symbol).toBe("NIFTY");
    expect(analysis.context.source).toBe("market-snapshot-flow");
    expect(analysis.metadata.liveFeeds).toBe(false);
  });

  it("prepares market intelligence as an input to SignalFlow", async () => {
    const input = await prepareMarketIntelligenceForSignal(signal);

    expect(input.signalId).toBe(signal.id);
    expect(input.analysis.symbol).toBe(signal.symbol);
    expect(input.reasoning).toContain("SignalFlow");
  });

  it("enriches existing signals without creating a parallel decision path", async () => {
    const enriched = await enrichSignalFlowWithMarketIntelligence(signal);

    expect(enriched.id).toBe(signal.id);
    expect(enriched.reasoning).toContain("Market intelligence");
    expect(enriched.confidence).toBeGreaterThanOrEqual(signal.confidence - 1);
  });
});
