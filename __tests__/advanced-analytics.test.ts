import { analyticsApi } from "../api/analytics";
import { FEATURE_FLAGS } from "../lib/feature-flags";
import { enrichSignalWithAnalytics, prepareAnalyticsForSignalFlow } from "../lib/advanced-analytics-integration";
import type { TradeSignal } from "../lib/types";

describe("Phase 12 Advanced Analytics", () => {
  const signal: TradeSignal = {
    id: "signal-analytics-infy",
    market: "Indian",
    symbol: "INFY",
    direction: "Long",
    entry: "1452",
    stop: "1420",
    targets: "1524",
    confidence: 69,
    expectedValue: "1.8R",
    risk: "Medium",
    reasoning: "SignalFlow analytics candidate."
  };

  it("enables advanced analytics flags by default", () => {
    expect(FEATURE_FLAGS.ENABLE_ADVANCED_ANALYTICS).toBe(true);
    expect(FEATURE_FLAGS.ENABLE_ANALYTICS_PATTERNS).toBe(true);
    expect(FEATURE_FLAGS.ENABLE_ANALYTICS_INSIGHTS).toBe(true);
  });

  it("exposes advanced analytics through the existing analytics API", async () => {
    const summary = await analyticsApi.getAnalyticsSummary();

    expect(summary.insights.length).toBeGreaterThan(0);
    expect(summary.patterns.length).toBeGreaterThan(0);
    expect(summary.summary).toContain("without executing trades");
  });

  it("creates advanced analytics snapshots from existing mock inputs", async () => {
    const snapshot = await analyticsApi.getAnalyticsSnapshot();

    expect(snapshot.generatedBy).toBe("mock-advanced-analytics");
    expect(snapshot.sourceCount.tradingview).toBeGreaterThan(0);
    expect(snapshot.groups.length).toBeGreaterThan(0);
  });

  it("prepares analytics context for SignalFlow without a parallel pipeline", async () => {
    const context = await prepareAnalyticsForSignalFlow(signal);

    expect(context.signalId).toBe(signal.id);
    expect(context.reasoning).toContain("SignalFlow");
    expect(context.reasoning).toContain("does not execute");
  });

  it("enriches existing signals with analytics context only", async () => {
    const enriched = await enrichSignalWithAnalytics(signal);

    expect(enriched.id).toBe(signal.id);
    expect(enriched.reasoning).toContain("Analytics context");
  });
});
