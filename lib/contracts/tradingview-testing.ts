import type { Signal, SystemHealthState } from "../types";

export interface TradingViewChartStatus {
  id: string;
  symbol: string;
  state: SystemHealthState;
  timeframe: string;
  description: string;
}

export interface TradingViewSignalValidation {
  id: string;
  symbol: string;
  omegaSignal: Signal;
  comparisonSignal: Signal;
  result: "Aligned" | "Diverged" | "Pending";
  notes: string;
  // Phase 8 extensions — all optional, backward-compatible
  signalFlowId?: string;
  pipelineStage?: string;
  confidence?: number;
}

export interface TradingViewPaperComparison {
  id: string;
  symbol: string;
  omegaPaperPnl: string;
  testingPnl: string;
  variance: string;
  status: SystemHealthState;
}

export interface TradingViewAlertStatus {
  id: string;
  name: string;
  state: SystemHealthState;
  lastTriggered: string;
}

export interface TradingViewHistoricalValidation {
  id: string;
  symbol: string;
  sampleSize: number;
  matchRate: string;
  status: SystemHealthState;
}

export interface TradingViewTestingContracts {
  chartStatus: TradingViewChartStatus[];
  signalValidation: TradingViewSignalValidation[];
  paperComparison: TradingViewPaperComparison[];
  alertStatus: TradingViewAlertStatus[];
  historicalValidation: TradingViewHistoricalValidation[];
  // Phase 8 extension — optional, backward-compatible
  signalFlowValidation?: TradingViewSignalValidation[];
}
