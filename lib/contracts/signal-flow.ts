/**
 * Signal Flow Orchestrator Contracts
 *
 * Typed AI signal pipeline for OMEGA. Defines the full pipeline from market
 * analysis through AI analysis, signal generation, validation, order creation,
 * position management, trade execution, portfolio update, and analytics update.
 *
 * TradingView validation is OPTIONAL — the pipeline functions without it.
 * All implementations start as mock-only. No real AI or broker is connected.
 *
 * Phase 8: Paper Trading Architecture Extension
 */

// ---------------------------------------------------------------------------
// Pipeline stage types
// ---------------------------------------------------------------------------

export type SignalFlowStage =
  | 'market-analysis'
  | 'ai-analysis'
  | 'signal-generation'
  | 'signal-validation'
  | 'order-creation'
  | 'position-management'
  | 'trade-execution'
  | 'portfolio-update'
  | 'analytics-update'
  | 'tradingview-validation';

export type SignalFlowStatus = 'pending' | 'running' | 'completed' | 'failed' | 'skipped';

// ---------------------------------------------------------------------------
// Pipeline stage contract
// ---------------------------------------------------------------------------

export interface SignalFlowStageResult<T = unknown> {
  stage: SignalFlowStage;
  status: SignalFlowStatus;
  startedAt: string;
  completedAt?: string;
  duration?: number;
  input?: unknown;
  output?: T;
  error?: string;
  skippedReason?: string;
}

// ---------------------------------------------------------------------------
// Stage output contracts
// ---------------------------------------------------------------------------

/** Output of the market-analysis stage */
export interface MarketAnalysisOutput {
  symbol: string;
  regime: string;
  volatility: string;
  sentiment: string;
  confidence: number;
  indicators: { name: string; value: string; signal: string }[];
}

/** Output of the ai-analysis stage */
export interface AIAnalysisOutput {
  symbol: string;
  recommendation: 'buy' | 'sell' | 'hold' | 'close';
  confidence: number;
  reasoning: string;
  riskLevel: 'low' | 'medium' | 'high';
  targetPrice?: string;
  stopLoss?: string;
}

/** Output of the signal-generation stage */
export interface SignalGenerationOutput {
  signalId: string;
  symbol: string;
  direction: 'Long' | 'Short';
  entry: string;
  stop: string;
  targets: string[];
  confidence: number;
  source: 'ai' | 'strategy' | 'manual';
  reasoning: string;
}

/** Output of the signal-validation stage */
export interface SignalValidationOutput {
  signalId: string;
  passed: boolean;
  checks: { name: string; passed: boolean; reason?: string }[];
  riskAssessment: { level: 'low' | 'medium' | 'high' | 'critical'; concerns: string[] };
  tradingViewAlignment?: { aligned: boolean; tvSignal?: string; confidence?: number };
}

// ---------------------------------------------------------------------------
// Full pipeline result
// ---------------------------------------------------------------------------

export interface SignalFlowPipelineResult {
  id: string;
  symbol: string;
  startedAt: string;
  completedAt?: string;
  status: SignalFlowStatus;
  stages: SignalFlowStageResult[];
  marketAnalysis?: MarketAnalysisOutput;
  aiAnalysis?: AIAnalysisOutput;
  signalGeneration?: SignalGenerationOutput;
  signalValidation?: SignalValidationOutput;
  orderId?: string;
  positionId?: string;
  portfolioImpact?: { valueBefore: string; valueAfter: string; pnlImpact: string };
  analyticsUpdated?: boolean;
  tradingViewValidated?: boolean;
}

// ---------------------------------------------------------------------------
// Orchestrator interface
// ---------------------------------------------------------------------------

export interface SignalFlowOrchestrator {
  executePipeline(symbol: string, config?: SignalFlowConfig): Promise<SignalFlowPipelineResult>;
  getActivePipelines(): SignalFlowPipelineResult[];
  getPipelineHistory(limit?: number): SignalFlowPipelineResult[];
  getPipelineById(id: string): SignalFlowPipelineResult | null;
  cancelPipeline(id: string): boolean;
}

// ---------------------------------------------------------------------------
// Pipeline configuration
// ---------------------------------------------------------------------------

export interface SignalFlowConfig {
  skipTradingViewValidation?: boolean;
  dryRun?: boolean;
  maxConfidenceThreshold?: number;
  minConfidenceThreshold?: number;
  allowedStages?: SignalFlowStage[];
}
