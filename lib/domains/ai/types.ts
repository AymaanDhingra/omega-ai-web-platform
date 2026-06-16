/**
 * AI Domain Types
 */

import type { Asset } from "../market/types";
import type { Strategy } from "../strategy/types";
import type { MarketSnapshot } from "../market/types";

export type ConfidenceLevel = "very-low" | "low" | "medium" | "high" | "very-high";
export type AISystemStatus = "initializing" | "ready" | "analyzing" | "deciding" | "executing" | "error" | "offline";

export interface Prediction {
  id: string;
  asset: Asset;
  timestamp: string;
  direction: "up" | "down" | "neutral";
  confidence: number;
  confidenceLevel: ConfidenceLevel;
  targetPrice?: number;
  timeframe: string;
  reasoning: string;
}

export interface Confidence {
  id: string;
  prediction: Prediction;
  score: number;
  level: ConfidenceLevel;
  factors: {
    name: string;
    weight: number;
    value: number;
  }[];
}

export interface MarketAnalysis {
  id: string;
  timestamp: string;
  market: MarketSnapshot;
  regime: string;
  sentiment: "bullish" | "neutral" | "bearish";
  volatility: "low" | "medium" | "high" | "extreme";
  liquidity: "high" | "medium" | "low";
  opportunities: {
    asset: Asset;
    type: "entry" | "exit" | "adjustment";
    confidence: number;
  }[];
  risks: string[];
}

export interface StrategySelection {
  id: string;
  timestamp: string;
  marketAnalysis: MarketAnalysis;
  candidates: {
    strategy: Strategy;
    score: number;
    reason: string;
  }[];
  selectedStrategy: Strategy;
  confidence: number;
}

export interface KnowledgeItem {
  id: string;
  timestamp: string;
  category: string;
  content: string;
  source: string;
  relevance: number;
}

export interface LearningEvent {
  id: string;
  timestamp: string;
  type: "trade-result" | "strategy-performance" | "market-event" | "user-feedback";
  data: Record<string, unknown>;
  insight: string;
}

export interface Inference {
  id: string;
  timestamp: string;
  input: Record<string, unknown>;
  output: Record<string, unknown>;
  confidence: number;
  reasoning: string;
}

export interface AIRecommendation {
  id: string;
  timestamp: string;
  asset: Asset;
  action: "buy" | "sell" | "hold" | "close";
  confidence: number;
  reasoning: string;
  riskLevel: "low" | "medium" | "high";
  targetPrice?: number;
  stopLoss?: number;
}

export interface AIState {
  id: string;
  timestamp: string;
  status: AISystemStatus;
  lastUpdate: string;
  predictions: Prediction[];
  recommendations: AIRecommendation[];
  learningEvents: LearningEvent[];
  accuracy: number;
}

export interface AIHistory {
  id: string;
  timestamp: string;
  predictions: Prediction[];
  recommendations: AIRecommendation[];
  accuracy: number;
  successRate: number;
  totalDecisions: number;
}
