import { experienceApi } from "../api/experience";
import { FEATURE_FLAGS } from "../lib/feature-flags";
import { enrichSignalWithExperience, prepareExperienceForSignalFlow, prepareExperienceKnowledgeUpdates } from "../lib/experience-integration";
import type { TradeSignal } from "../lib/types";

describe("Phase 11 Experience Engine", () => {
  const signal: TradeSignal = {
    id: "signal-infy",
    market: "Indian",
    symbol: "INFY",
    direction: "Long",
    entry: "1452",
    stop: "1420",
    targets: "1524",
    confidence: 69,
    expectedValue: "1.8R",
    risk: "Medium",
    reasoning: "SignalFlow breakout signal."
  };

  it("enables experience flags by default", () => {
    expect(FEATURE_FLAGS.ENABLE_EXPERIENCE).toBe(true);
    expect(FEATURE_FLAGS.ENABLE_EXPERIENCE_PATTERNS).toBe(true);
    expect(FEATURE_FLAGS.ENABLE_EXPERIENCE_KNOWLEDGE).toBe(true);
  });

  it("lists mock experience records from paper trading and TradingView observations", async () => {
    const records = await experienceApi.listRecords();

    expect(records.some((record) => record.category === "paper-trade")).toBe(true);
    expect(records.some((record) => record.category === "tradingview-observation")).toBe(true);
  });

  it("detects mock patterns without machine learning", async () => {
    const patterns = await experienceApi.detectPatterns();

    expect(patterns.length).toBeGreaterThan(0);
    expect(patterns.every((pattern) => pattern.metadata.machineLearning === false || pattern.metadata.optional === true)).toBe(true);
  });

  it("prepares knowledge updates from experience lessons", async () => {
    const updates = await prepareExperienceKnowledgeUpdates();

    expect(updates.length).toBeGreaterThan(0);
    expect(updates[0].source).toBe("Experience Engine");
  });

  it("feeds experience into SignalFlow context without a parallel pipeline", async () => {
    const feedback = await prepareExperienceForSignalFlow(signal);

    expect(feedback.signalId).toBe(signal.id);
    expect(feedback.reasoning).toContain("SignalFlow");
    expect(feedback.reasoning).toContain("without model retraining");
  });

  it("enriches existing signals with experience context", async () => {
    const enriched = await enrichSignalWithExperience(signal);

    expect(enriched.id).toBe(signal.id);
    expect(enriched.reasoning).toContain("Experience context");
  });
});
