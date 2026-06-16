import type {
  ExperienceFilter,
  ExperienceLesson,
  ExperiencePattern,
  ExperienceRecord,
  ExperienceRepository,
  ExperienceSearch,
  ExperienceSnapshot,
  ExperienceSummary,
  KnowledgeDocument
} from "../types";
import { paperTradingState } from "./paper-trading";
import { tradingViewTesting } from "./tradingview-testing";

const timestamp = "2026-06-16T00:00:00.000Z";

export const experienceLessons: ExperienceLesson[] = [
  {
    id: "lesson-confirm-breakout",
    title: "Confirm breakouts before sizing up",
    lesson: "Paper trades with confirmation above prior value show better follow-through than early entries.",
    confidence: 0.78,
    appliesTo: ["INFY", "breakout", "paper-trade"],
    createdAt: timestamp
  },
  {
    id: "lesson-avoid-weak-reversal-shorts",
    title: "Avoid weak reversal shorts during resilient sessions",
    lesson: "Short setups lose quality when broad market conditions stay balanced and volatility is muted.",
    confidence: 0.66,
    appliesTo: ["TCS", "short", "market-condition"],
    createdAt: timestamp
  }
];

export const experiencePatterns: ExperiencePattern[] = [
  {
    id: "pattern-winning-breakout-base",
    name: "Winning breakout base",
    category: "winning-setup",
    description: "Breakout-base paper trades perform better when SignalFlow confidence is above 65 and session conditions are stable.",
    occurrences: 4,
    confidence: 0.74,
    relatedExperienceIds: ["experience-infy-win"],
    metadata: { setup: "breakout-base", minConfidence: 65, machineLearning: false }
  },
  {
    id: "pattern-losing-countertrend-short",
    name: "Losing countertrend short",
    category: "losing-setup",
    description: "Short trades against balanced or improving market context require stricter confirmation.",
    occurrences: 2,
    confidence: 0.62,
    relatedExperienceIds: ["experience-tcs-loss"],
    metadata: { setup: "countertrend-short", machineLearning: false }
  },
  {
    id: "pattern-tradingview-validation-only",
    name: "TradingView validation only",
    category: "trading-session",
    description: "TradingView observations are useful as validation context but never become decision authority.",
    occurrences: 3,
    confidence: 0.7,
    relatedExperienceIds: ["experience-tradingview-validation"],
    metadata: { optional: true, execution: false }
  }
];

export const experienceRecords: ExperienceRecord[] = [
  {
    id: "experience-infy-win",
    category: "paper-trade",
    source: "paper-trading",
    timestamp,
    title: "INFY paper trade breakout experience",
    summary: "INFY long paper trade produced positive unrealized PnL after breakout-base confirmation.",
    outcome: "success",
    symbol: "INFY",
    market: "Indian",
    paperTradeId: paperTradingState.positions[0]?.id,
    analyticsRefs: ["paper-performance-primary"],
    tradingViewRefs: [],
    marketIntelligenceRefs: ["market-context-indian-it"],
    lessons: [experienceLessons[0]],
    patterns: ["pattern-winning-breakout-base"],
    confidence: 0.78,
    metadata: { pnl: paperTradingState.positions[0]?.unrealizedPnl, modelTraining: false }
  },
  {
    id: "experience-tcs-loss",
    category: "paper-trade",
    source: "paper-trading",
    timestamp,
    title: "TCS paper trade short-side caution",
    summary: "TCS short paper trade moved against the position, suggesting stricter confirmation for countertrend shorts.",
    outcome: "failure",
    symbol: "TCS",
    market: "Indian",
    paperTradeId: paperTradingState.positions[1]?.id,
    analyticsRefs: ["paper-performance-primary"],
    tradingViewRefs: [],
    marketIntelligenceRefs: ["market-context-indian-balanced"],
    lessons: [experienceLessons[1]],
    patterns: ["pattern-losing-countertrend-short"],
    confidence: 0.66,
    metadata: { pnl: paperTradingState.positions[1]?.unrealizedPnl, modelTraining: false }
  },
  {
    id: "experience-tradingview-validation",
    category: "tradingview-observation",
    source: "tradingview-testing",
    timestamp,
    title: "TradingView validation remains optional",
    summary: "TradingView testing contributes observations and validation context without execution authority.",
    outcome: "neutral",
    market: "Global",
    analyticsRefs: ["ai-accuracy-tracking"],
    tradingViewRefs: tradingViewTesting.signalComparisons.map((comparison) => comparison.id),
    marketIntelligenceRefs: [],
    lessons: [],
    patterns: ["pattern-tradingview-validation-only"],
    confidence: 0.7,
    metadata: { optional: true, credentials: false, execution: false }
  }
];

function matchesFilter(record: ExperienceRecord, filter?: ExperienceFilter): boolean {
  if (!filter) return true;
  if (filter.category && record.category !== filter.category) return false;
  if (filter.outcome && record.outcome !== filter.outcome) return false;
  if (filter.symbol && record.symbol !== filter.symbol) return false;
  if (filter.market && record.market !== filter.market) return false;
  if (filter.minConfidence && record.confidence < filter.minConfidence) return false;
  if (filter.patternId && !record.patterns.includes(filter.patternId)) return false;
  return true;
}

export const mockExperienceRepository: ExperienceRepository = {
  async listRecords(filter) {
    return experienceRecords.filter((record) => matchesFilter(record, filter));
  },
  async search(search: ExperienceSearch) {
    const query = search.query?.toLowerCase();
    const filtered = experienceRecords.filter((record) => matchesFilter(record, search.filter));
    const searched = query
      ? filtered.filter((record) =>
          [record.title, record.summary, record.symbol, record.market].filter(Boolean).some((value) => value!.toLowerCase().includes(query))
        )
      : filtered;
    return searched.slice(0, search.limit ?? searched.length);
  },
  async getRecord(id) {
    return experienceRecords.find((record) => record.id === id) ?? null;
  },
  async listLessons() {
    return experienceLessons;
  },
  async listPatterns() {
    return experiencePatterns;
  },
  async detectPatterns() {
    return experiencePatterns;
  },
  async createSnapshot() {
    return {
      id: "experience-snapshot-v1",
      timestamp,
      records: experienceRecords,
      patterns: experiencePatterns,
      lessons: experienceLessons,
      summary: "Mock experience snapshot generated from paper trading, analytics, TradingView validation, and market context.",
      generatedBy: "mock-experience-engine"
    } satisfies ExperienceSnapshot;
  },
  async summarize() {
    return {
      totalRecords: experienceRecords.length,
      successCount: experienceRecords.filter((record) => record.outcome === "success").length,
      failureCount: experienceRecords.filter((record) => record.outcome === "failure").length,
      topPatterns: experiencePatterns,
      keyLessons: experienceLessons,
      knowledgeUpdateSummary: "Experience produces knowledge updates for future AI context without retraining models."
    } satisfies ExperienceSummary;
  },
  async prepareKnowledgeUpdates() {
    return experienceLessons.map((lesson) => ({
      id: `knowledge-from-${lesson.id}`,
      name: lesson.title,
      type: "Rules",
      status: "Mock",
      source: "Experience Engine"
    } satisfies KnowledgeDocument));
  }
};
