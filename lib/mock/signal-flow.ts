/**
 * Mock Signal Flow Orchestrator
 *
 * Returns static fixture data for the SignalFlowOrchestrator interface.
 * No real AI, broker, or TradingView connection is made.
 * Mock-first philosophy: this is the canonical source of truth until a real
 * implementation is wired in.
 *
 * Phase 8: Paper Trading Architecture Extension
 */

import type {
  SignalFlowOrchestrator,
  SignalFlowPipelineResult,
  SignalFlowConfig,
  SignalFlowStageResult,
  MarketAnalysisOutput,
  AIAnalysisOutput,
  SignalGenerationOutput,
  SignalValidationOutput,
} from '../contracts/signal-flow';

// ---------------------------------------------------------------------------
// Static fixture helpers
// ---------------------------------------------------------------------------

function makeMockStages(skipTradingView = true): SignalFlowStageResult[] {
  const base = '2026-06-16T10:00:00.000Z';

  const stages: SignalFlowStageResult[] = [
    {
      stage: 'market-analysis',
      status: 'completed',
      startedAt: base,
      completedAt: '2026-06-16T10:00:00.120Z',
      duration: 120,
    },
    {
      stage: 'ai-analysis',
      status: 'completed',
      startedAt: '2026-06-16T10:00:00.120Z',
      completedAt: '2026-06-16T10:00:00.380Z',
      duration: 260,
    },
    {
      stage: 'signal-generation',
      status: 'completed',
      startedAt: '2026-06-16T10:00:00.380Z',
      completedAt: '2026-06-16T10:00:00.420Z',
      duration: 40,
    },
    {
      stage: 'signal-validation',
      status: 'completed',
      startedAt: '2026-06-16T10:00:00.420Z',
      completedAt: '2026-06-16T10:00:00.510Z',
      duration: 90,
    },
    {
      stage: 'order-creation',
      status: 'completed',
      startedAt: '2026-06-16T10:00:00.510Z',
      completedAt: '2026-06-16T10:00:00.540Z',
      duration: 30,
    },
    {
      stage: 'position-management',
      status: 'completed',
      startedAt: '2026-06-16T10:00:00.540Z',
      completedAt: '2026-06-16T10:00:00.570Z',
      duration: 30,
    },
    {
      stage: 'trade-execution',
      status: 'completed',
      startedAt: '2026-06-16T10:00:00.570Z',
      completedAt: '2026-06-16T10:00:00.600Z',
      duration: 30,
    },
    {
      stage: 'portfolio-update',
      status: 'completed',
      startedAt: '2026-06-16T10:00:00.600Z',
      completedAt: '2026-06-16T10:00:00.630Z',
      duration: 30,
    },
    {
      stage: 'analytics-update',
      status: 'completed',
      startedAt: '2026-06-16T10:00:00.630Z',
      completedAt: '2026-06-16T10:00:00.660Z',
      duration: 30,
    },
    {
      stage: 'tradingview-validation',
      status: skipTradingView ? 'skipped' : 'completed',
      startedAt: '2026-06-16T10:00:00.660Z',
      completedAt: '2026-06-16T10:00:00.680Z',
      duration: skipTradingView ? 0 : 20,
      skippedReason: skipTradingView ? 'TradingView validation is optional and was skipped.' : undefined,
    },
  ];

  return stages;
}

const mockMarketAnalysis: MarketAnalysisOutput = {
  symbol: 'BTCUSDT',
  regime: 'Risk-on expansion',
  volatility: 'Moderate',
  sentiment: 'Bullish',
  confidence: 0.72,
  indicators: [
    { name: 'RSI(14)', value: '58.4', signal: 'Neutral' },
    { name: 'MACD', value: '+0.0042', signal: 'Buy' },
    { name: 'EMA(20)', value: '67,420', signal: 'Buy' },
    { name: 'ATR(14)', value: '1,240', signal: 'Moderate' },
  ],
};

const mockAIAnalysis: AIAnalysisOutput = {
  symbol: 'BTCUSDT',
  recommendation: 'buy',
  confidence: 0.68,
  reasoning:
    'Market regime is risk-on with bullish momentum. RSI is not overbought. MACD crossover confirmed. Risk level is moderate.',
  riskLevel: 'medium',
  targetPrice: '71,500',
  stopLoss: '65,800',
};

const mockSignalGeneration: SignalGenerationOutput = {
  signalId: 'sig-mock-001',
  symbol: 'BTCUSDT',
  direction: 'Long',
  entry: '67,850',
  stop: '65,800',
  targets: ['69,500', '71,500', '74,000'],
  confidence: 0.68,
  source: 'ai',
  reasoning:
    'AI analysis recommends buy with medium risk. Entry at current price, stop below recent support.',
};

const mockSignalValidation: SignalValidationOutput = {
  signalId: 'sig-mock-001',
  passed: true,
  checks: [
    { name: 'Risk/Reward >= 2:1', passed: true },
    { name: 'Position size within limits', passed: true },
    { name: 'Daily loss limit not breached', passed: true },
    { name: 'Confidence >= minimum threshold', passed: true },
    { name: 'No conflicting open position', passed: true },
  ],
  riskAssessment: {
    level: 'medium',
    concerns: ['Elevated market volatility', 'Approaching resistance at 68,500'],
  },
  tradingViewAlignment: {
    aligned: true,
    tvSignal: 'Buy',
    confidence: 0.71,
  },
};

const mockPipelineResult: SignalFlowPipelineResult = {
  id: 'pipeline-mock-001',
  symbol: 'BTCUSDT',
  startedAt: '2026-06-16T10:00:00.000Z',
  completedAt: '2026-06-16T10:00:00.680Z',
  status: 'completed',
  stages: makeMockStages(true),
  marketAnalysis: mockMarketAnalysis,
  aiAnalysis: mockAIAnalysis,
  signalGeneration: mockSignalGeneration,
  signalValidation: mockSignalValidation,
  orderId: 'order-mock-001',
  positionId: 'pos-mock-001',
  portfolioImpact: {
    valueBefore: '1,00,000',
    valueAfter: '1,00,340',
    pnlImpact: '+340',
  },
  analyticsUpdated: true,
  tradingViewValidated: false,
};

const mockPipelineHistory: SignalFlowPipelineResult[] = [
  mockPipelineResult,
  {
    id: 'pipeline-mock-002',
    symbol: 'NIFTY',
    startedAt: '2026-06-16T09:00:00.000Z',
    completedAt: '2026-06-16T09:00:00.720Z',
    status: 'completed',
    stages: makeMockStages(true),
    marketAnalysis: {
      symbol: 'NIFTY',
      regime: 'Consolidation',
      volatility: 'Low',
      sentiment: 'Neutral',
      confidence: 0.61,
      indicators: [
        { name: 'RSI(14)', value: '51.2', signal: 'Neutral' },
        { name: 'MACD', value: '-0.0012', signal: 'Sell' },
        { name: 'EMA(20)', value: '22,340', signal: 'Neutral' },
      ],
    },
    aiAnalysis: {
      symbol: 'NIFTY',
      recommendation: 'hold',
      confidence: 0.55,
      reasoning: 'Market is consolidating. No clear directional bias. Hold current positions.',
      riskLevel: 'low',
    },
    signalGeneration: undefined,
    signalValidation: undefined,
    analyticsUpdated: true,
    tradingViewValidated: false,
  },
  {
    id: 'pipeline-mock-003',
    symbol: 'INFY',
    startedAt: '2026-06-16T08:00:00.000Z',
    completedAt: '2026-06-16T08:00:00.500Z',
    status: 'failed',
    stages: [
      ...makeMockStages(true).slice(0, 2),
      {
        stage: 'signal-generation',
        status: 'failed',
        startedAt: '2026-06-16T08:00:00.380Z',
        completedAt: '2026-06-16T08:00:00.500Z',
        duration: 120,
        error: 'Confidence below minimum threshold (0.42 < 0.50). Signal generation aborted.',
      },
    ],
    analyticsUpdated: false,
    tradingViewValidated: false,
  },
];

// ---------------------------------------------------------------------------
// Factory function
// ---------------------------------------------------------------------------

/**
 * Creates a mock SignalFlowOrchestrator that returns static fixture data.
 * No real AI, broker, or TradingView connection is made.
 */
export function createMockSignalFlowOrchestrator(): SignalFlowOrchestrator {
  const activePipelines: SignalFlowPipelineResult[] = [];
  const history: SignalFlowPipelineResult[] = [...mockPipelineHistory];
  const cancelled = new Set<string>();

  return {
    async executePipeline(
      symbol: string,
      config?: SignalFlowConfig
    ): Promise<SignalFlowPipelineResult> {
      const skipTV = config?.skipTradingViewValidation ?? true;
      const id = `pipeline-mock-${Date.now()}`;
      const now = new Date().toISOString();

      const result: SignalFlowPipelineResult = {
        ...mockPipelineResult,
        id,
        symbol,
        startedAt: now,
        completedAt: now,
        stages: makeMockStages(skipTV),
        tradingViewValidated: !skipTV,
      };

      history.unshift(result);
      return result;
    },

    getActivePipelines(): SignalFlowPipelineResult[] {
      return [...activePipelines];
    },

    getPipelineHistory(limit?: number): SignalFlowPipelineResult[] {
      return limit !== undefined ? history.slice(0, limit) : [...history];
    },

    getPipelineById(id: string): SignalFlowPipelineResult | null {
      return history.find((p) => p.id === id) ?? null;
    },

    cancelPipeline(id: string): boolean {
      const exists = history.some((p) => p.id === id);
      if (exists) {
        cancelled.add(id);
        return true;
      }
      return false;
    },
  };
}

/** Singleton mock orchestrator for use in tests and fixtures */
export const mockSignalFlowOrchestrator = createMockSignalFlowOrchestrator();
