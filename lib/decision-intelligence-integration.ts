import { decisionIntelligenceApi } from "../api/decisionIntelligence";
import { createDecisionContextForSignal } from "./mock/decision-intelligence";
import type { DecisionContext, DecisionExplanation, DecisionTrace, TradeSignal } from "./types";

export async function prepareDecisionContextForSignalFlow(signal: TradeSignal): Promise<DecisionContext> {
  const existing = await decisionIntelligenceApi.getDecisionContextRepository().getContext(signal.id);
  return existing ?? createDecisionContextForSignal(signal);
}

export async function explainSignalDecision(signal: TradeSignal): Promise<DecisionExplanation> {
  await prepareDecisionContextForSignalFlow(signal);
  return decisionIntelligenceApi.explain(signal.id);
}

export async function traceSignalDecision(signal: TradeSignal): Promise<DecisionTrace> {
  await prepareDecisionContextForSignalFlow(signal);
  return decisionIntelligenceApi.trace(signal.id);
}
