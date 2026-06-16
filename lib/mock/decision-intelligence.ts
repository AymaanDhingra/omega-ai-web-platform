import type { DecisionContext, DecisionContextRepository, DecisionExplanation, DecisionFactor, DecisionInsight, DecisionSnapshot, DecisionSummary, DecisionTrace, TradeSignal } from "../types";
import { analyticsGroups } from "./analytics";
import { tradingViewTesting } from "./tradingview-testing";

const createdAt = "2026-06-16T00:00:00.000Z";

const baseFactors: DecisionFactor[] = [
  { id: "factor-knowledge-caution", source: "knowledge", label: "Knowledge caution", contribution: "cautionary", weight: 0.18, description: "Related market conditions suggest caution rather than execution authority.", metadata: { decisionAuthority: false } },
  { id: "factor-analytics-confidence", source: "analytics", label: "Analytics confidence", contribution: "supporting", weight: 0.24, description: "Historical confidence context supports the current SignalFlow setup.", metadata: { analyticsGroups: analyticsGroups.length } },
  { id: "factor-experience-similar-setup", source: "experience", label: "Similar experience", contribution: "neutral", weight: 0.2, description: "Similar setups historically required confirmation before sizing up.", metadata: { createsDecision: false } },
  { id: "factor-tradingview-observation", source: "tradingview", label: "TradingView observation", contribution: "supporting", weight: 0.12, description: "TradingView observation validates context only and never decides.", metadata: { optional: true, comparisons: tradingViewTesting.signalComparisons.length } }
];

const seedSignal: TradeSignal = { id: "signal-decision-intelligence", market: "Indian", symbol: "INFY", direction: "Long", entry: "1452", stop: "1420", targets: "1524", confidence: 69, expectedValue: "1.8R", risk: "Medium", reasoning: "SignalFlow generated mock breakout signal." };

export function createDecisionContextForSignal(signal: TradeSignal): DecisionContext {
  const drivers = baseFactors.filter((factor) => factor.contribution === "supporting");
  const cautions = baseFactors.filter((factor) => factor.contribution === "cautionary");
  return {
    id: `decision-context-${signal.id}`,
    signalId: signal.id,
    symbol: signal.symbol,
    market: signal.market,
    createdAt,
    factors: baseFactors,
    confidence: { score: signal.confidence, label: signal.confidence >= 70 ? "high" : signal.confidence >= 55 ? "medium" : "low", drivers, cautions },
    sourceSummary: {
      knowledge: "Knowledge provides context and caution.",
      "market-intelligence": "Market Intelligence provides market awareness.",
      ai: "AI contributes reasoning context only.",
      signalflow: "SignalFlow remains the sole decision authority.",
      "paper-trading": "Paper Trading validates outcomes.",
      analytics: "Analytics provides historical confidence context.",
      experience: "Experience contributes lessons from prior outcomes.",
      tradingview: "TradingView provides optional observations and validation."
    }
  };
}

export const mockDecisionContexts: DecisionContext[] = [createDecisionContextForSignal(seedSignal)];

export const decisionInsights: DecisionInsight[] = [
  { id: "decision-insight-single-authority", title: "SignalFlow remains decision authority", description: "Decision Intelligence explains context and never creates decisions or execution paths.", source: "signalflow", confidence: 0.95, createdAt },
  { id: "decision-insight-explainability-first", title: "Explainability before autonomy", description: "OMEGA improves decision understanding before adding autonomy.", source: "ai", confidence: 0.9, createdAt }
];

function explainContext(context: DecisionContext): DecisionExplanation {
  return { id: `decision-explanation-${context.signalId}`, signalId: context.signalId, contextId: context.id, factorIds: context.factors.map((factor) => factor.id), explanation: `SignalFlow decision context for ${context.symbol}: confidence is ${context.confidence.label} because analytics and TradingView observations support the setup, while knowledge and experience add caution.`, createdAt };
}

function traceContext(context: DecisionContext): DecisionTrace {
  return { id: `decision-trace-${context.signalId}`, signalId: context.signalId, steps: context.factors.map((factor) => ({ source: factor.source, input: factor.label, contribution: factor.description, timestamp: createdAt })), finalSignalFlowDecision: "Watch", createdAt };
}

export const mockDecisionContextRepository: DecisionContextRepository = {
  async getContext(signalId) { return mockDecisionContexts.find((context) => context.signalId === signalId) ?? null; },
  async listContexts() { return mockDecisionContexts; },
  async getInsights() { return decisionInsights; },
  async explain(signalId) { return explainContext((await this.getContext(signalId)) ?? mockDecisionContexts[0]); },
  async trace(signalId) { return traceContext((await this.getContext(signalId)) ?? mockDecisionContexts[0]); },
  async summarize() {
    const explanations = await Promise.all(mockDecisionContexts.map((context) => this.explain(context.signalId)));
    const traces = await Promise.all(mockDecisionContexts.map((context) => this.trace(context.signalId)));
    return { id: "decision-summary", generatedAt: createdAt, summary: "Decision Intelligence explains SignalFlow context without making decisions.", contexts: mockDecisionContexts, insights: decisionInsights, explanations, traces } satisfies DecisionSummary;
  },
  async createSnapshot() { return { id: "decision-snapshot", timestamp: createdAt, summary: await this.summarize(), generatedBy: "mock-decision-intelligence" } satisfies DecisionSnapshot; }
};
