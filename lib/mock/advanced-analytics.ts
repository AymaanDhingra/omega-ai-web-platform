import type {
  AdvancedAnalyticsRepository,
  AnalyticsInsight,
  AnalyticsOpportunity,
  AnalyticsPattern,
  AnalyticsRisk,
  AnalyticsSnapshot,
  AnalyticsSummary,
  AnalyticsTrend
} from "../types";
import { analyticsGroups } from "./analytics";
import { paperTradingState } from "./paper-trading";
import { tradingViewTesting } from "./tradingview-testing";

const generatedAt = "2026-06-16T00:00:00.000Z";

export const analyticsInsights: AnalyticsInsight[] = [
  {
    id: "insight-paper-validation-quality",
    title: "Paper validation quality is improving",
    description: "Paper trading performance remains positive while live execution stays locked.",
    source: "paper-trading",
    confidence: 0.76,
    impact: "high",
    createdAt: generatedAt,
    metadata: { totalTrades: paperTradingState.performance[0]?.totalTrades, execution: false }
  },
  {
    id: "insight-tradingview-validation-context",
    title: "TradingView remains validation context",
    description: "TradingView alignment is useful as optional context and never acts as a decision engine.",
    source: "tradingview",
    confidence: 0.68,
    impact: "medium",
    createdAt: generatedAt,
    metadata: { comparisons: tradingViewTesting.signalComparisons.length, optional: true }
  },
  {
    id: "insight-knowledge-context-contribution",
    title: "Knowledge contribution supports future context",
    description: "Knowledge-backed rules and experience lessons should improve future AI context quality.",
    source: "knowledge",
    confidence: 0.72,
    impact: "medium",
    createdAt: generatedAt,
    metadata: { modelTraining: false }
  }
];

export const analyticsPatterns: AnalyticsPattern[] = [
  {
    id: "pattern-confidence-calibration",
    name: "Confidence calibration pattern",
    category: "confidence",
    description: "Signal confidence around 65-75% aligns with paper validation quality in mock data.",
    occurrences: 7,
    confidence: 0.71,
    sources: ["signalflow", "paper-trading", "analytics" as never],
    metadata: { execution: false }
  },
  {
    id: "pattern-experience-effectiveness",
    name: "Experience effectiveness pattern",
    category: "experience-effectiveness",
    description: "Lessons from paper outcomes improve future context without retraining AI models.",
    occurrences: 4,
    confidence: 0.74,
    sources: ["experience", "knowledge"],
    metadata: { modelTraining: false }
  },
  {
    id: "pattern-tradingview-validation",
    name: "TradingView validation pattern",
    category: "signal-quality",
    description: "TradingView observations are useful for validation, not orchestration or execution.",
    occurrences: tradingViewTesting.signalComparisons.length,
    confidence: 0.67,
    sources: ["tradingview", "signalflow"],
    metadata: { optional: true, decisionEngine: false }
  }
];

export const analyticsTrends: AnalyticsTrend[] = [
  {
    id: "trend-paper-expectancy",
    metric: "Paper Expectancy",
    direction: "improving",
    value: paperTradingState.performance[0]?.expectancy ?? "+0.00R",
    period: "mock current cycle",
    confidence: 0.73,
    metadata: { source: "paper-trading" }
  },
  {
    id: "trend-confidence-quality",
    metric: "Confidence Quality",
    direction: "stable",
    value: "72%",
    period: "mock current cycle",
    confidence: 0.7,
    metadata: { source: "analytics" }
  }
];

export const analyticsRisks: AnalyticsRisk[] = [
  {
    id: "risk-overconfidence",
    title: "Overconfidence risk",
    description: "High-confidence signals should continue to require paper validation and knowledge context.",
    severity: "medium",
    probability: 0.42,
    relatedPatterns: ["pattern-confidence-calibration"],
    mitigation: ["Keep SignalFlow central", "Validate through paper trading", "Use experience feedback"]
  }
];

export const analyticsOpportunities: AnalyticsOpportunity[] = [
  {
    id: "opportunity-experience-weighting",
    title: "Improve context with experience weighting",
    description: "Experience-backed patterns can improve future AI context quality without creating a decision pipeline.",
    potential: 0.78,
    relatedPatterns: ["pattern-experience-effectiveness"],
    requirements: ["Knowledge update", "SignalFlow context only", "Paper validation"]
  }
];

export const mockAdvancedAnalyticsRepository: AdvancedAnalyticsRepository = {
  async getInsights() {
    return analyticsInsights;
  },
  async getPatterns() {
    return analyticsPatterns;
  },
  async getTrends() {
    return analyticsTrends;
  },
  async getRisks() {
    return analyticsRisks;
  },
  async getOpportunities() {
    return analyticsOpportunities;
  },
  async summarize() {
    return {
      id: "advanced-analytics-summary",
      generatedAt,
      summary: "Advanced Analytics summarizes OMEGA behavior and strengthens the feedback loop without executing trades.",
      insights: analyticsInsights,
      patterns: analyticsPatterns,
      trends: analyticsTrends,
      risks: analyticsRisks,
      opportunities: analyticsOpportunities,
      nextActions: ["Keep SignalFlow central", "Feed Experience into Knowledge", "Use TradingView as optional validation only"]
    } satisfies AnalyticsSummary;
  },
  async createSnapshot() {
    const summary = await this.summarize();
    return {
      id: "advanced-analytics-snapshot",
      timestamp: generatedAt,
      groups: analyticsGroups,
      summary,
      sourceCount: {
        "paper-trading": 1,
        signalflow: 2,
        experience: 1,
        knowledge: 1,
        "market-intelligence": 1,
        tradingview: tradingViewTesting.signalComparisons.length
      },
      generatedBy: "mock-advanced-analytics"
    } satisfies AnalyticsSnapshot;
  }
};
