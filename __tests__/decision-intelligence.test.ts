import { decisionIntelligenceApi } from "../api/decisionIntelligence";
import { FEATURE_FLAGS } from "../lib/feature-flags";
import { explainSignalDecision, prepareDecisionContextForSignalFlow, traceSignalDecision } from "../lib/decision-intelligence-integration";
import type { TradeSignal } from "../lib/types";

describe("Phase 13 Decision Intelligence", () => {
  const signal: TradeSignal = { id: "signal-decision-intelligence", market: "Indian", symbol: "INFY", direction: "Long", entry: "1452", stop: "1420", targets: "1524", confidence: 69, expectedValue: "1.8R", risk: "Medium", reasoning: "SignalFlow generated mock breakout signal." };

  it("enables decision intelligence flags by default", () => {
    expect(FEATURE_FLAGS.ENABLE_DECISION_INTELLIGENCE).toBe(true);
    expect(FEATURE_FLAGS.ENABLE_DECISION_EXPLANATIONS).toBe(true);
    expect(FEATURE_FLAGS.ENABLE_DECISION_TRACE).toBe(true);
  });

  it("provides decision context without owning decisions", async () => {
    const context = await prepareDecisionContextForSignalFlow(signal);
    expect(context.signalId).toBe(signal.id);
    expect(context.sourceSummary.signalflow).toContain("sole decision authority");
  });

  it("explains and traces SignalFlow decisions without execution", async () => {
    const explanation = await explainSignalDecision(signal);
    const trace = await traceSignalDecision(signal);
    expect(explanation.explanation).toContain("SignalFlow decision context");
    expect(trace.steps.some((step) => step.source === "tradingview")).toBe(true);
    expect(trace.finalSignalFlowDecision).toBe("Watch");
  });

  it("summarizes Decision Intelligence as explainability only", async () => {
    const summary = await decisionIntelligenceApi.summarize();
    expect(summary.summary).toContain("without making decisions");
    expect(summary.traces.length).toBeGreaterThan(0);
  });
});
