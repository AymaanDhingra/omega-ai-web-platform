import { analyticsApi } from "../api/analytics";
import type { AnalyticsSignalFlowContext, TradeSignal } from "./types";

/**
 * Advanced Analytics integration.
 *
 * Analytics provides context only. It never executes trades and never creates
 * another decision pipeline. SignalFlow remains OMEGA's central orchestrator.
 */
export async function prepareAnalyticsForSignalFlow(signal: TradeSignal): Promise<AnalyticsSignalFlowContext> {
  const repository = analyticsApi.getAdvancedAnalytics();
  const [insights, patterns] = await Promise.all([repository.getInsights(), repository.getPatterns()]);
  const relevantPatterns = patterns.filter((pattern) => pattern.sources.includes("signalflow") || pattern.sources.includes("paper-trading"));

  return {
    signalId: signal.id,
    symbol: signal.symbol,
    insightIds: insights.map((insight) => insight.id),
    patternIds: relevantPatterns.map((pattern) => pattern.id),
    reasoning: "Advanced Analytics added context for SignalFlow; it does not execute or orchestrate decisions.",
    appliedAt: new Date().toISOString()
  };
}

export async function enrichSignalWithAnalytics(signal: TradeSignal): Promise<TradeSignal> {
  const context = await prepareAnalyticsForSignalFlow(signal);
  return {
    ...signal,
    reasoning: `${signal.reasoning} Analytics context: ${context.reasoning}`
  };
}
