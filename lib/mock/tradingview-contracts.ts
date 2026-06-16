import type { TradingViewTestingContracts } from "../contracts/tradingview-testing";
import type { SystemHealthState } from "../types";

/**
 * TradingViewFoundationMockState
 *
 * Typed mock state for the TradingView Foundation module.
 * All values are static fixtures — no real TradingView connection.
 * Phase 7 Completion Pass: mock-only contract layer.
 */
export interface TradingViewFoundationMockState {
  /** Currently displayed symbol (mock) */
  currentSymbol: string;
  /** Available symbols for the symbol picker stub */
  availableSymbols: string[];
  /** Currently selected timeframe (mock) */
  currentTimeframe: string;
  /** Available timeframes */
  availableTimeframes: string[];
  /** Mock watchlist symbols */
  watchlistSymbols: string[];
  /** Chart connection status */
  chartStatus: SystemHealthState;
  /** Connection status */
  connectionStatus: SystemHealthState;
  /** Validation status */
  validationStatus: SystemHealthState;
  /** Testing status */
  testingStatus: SystemHealthState;
}

/** Mock state for the TradingView Foundation module */
export const tradingViewFoundationMock: TradingViewFoundationMockState = {
  currentSymbol: "BTCUSDT",
  availableSymbols: ["BTCUSDT", "NIFTY", "BANKNIFTY", "INFY", "CRUDE", "GOLD"],
  currentTimeframe: "1h",
  availableTimeframes: ["1m", "5m", "15m", "1h", "4h", "1D", "1W"],
  watchlistSymbols: ["BTCUSDT", "NIFTY", "BANKNIFTY", "INFY", "CRUDE"],
  chartStatus: "Mock",
  connectionStatus: "Mock",
  validationStatus: "Mock",
  testingStatus: "Mock"
};

export const tradingViewTestingContracts: TradingViewTestingContracts = {
  chartStatus: [
    { id: "chart-btc", symbol: "BTCUSDT", state: "Mock", timeframe: "1h", description: "Mock chart status for future TradingView testing." },
    { id: "chart-nifty", symbol: "NIFTY", state: "Mock", timeframe: "15m", description: "Mock chart status for future TradingView testing." }
  ],
  signalValidation: [
    { id: "validation-btc", symbol: "BTCUSDT", omegaSignal: "Buy", comparisonSignal: "Buy", result: "Aligned", notes: "Mock validation only." },
    { id: "validation-banknifty", symbol: "BANKNIFTY", omegaSignal: "Buy", comparisonSignal: "Watch", result: "Pending", notes: "Mock validation only." }
  ],
  paperComparison: [
    { id: "paper-compare-infy", symbol: "INFY", omegaPaperPnl: "+INR 5,840", testingPnl: "+INR 5,720", variance: "2.1%", status: "Mock" }
  ],
  alertStatus: [
    { id: "alert-breakout", name: "Breakout Alert", state: "Mock", lastTriggered: "Fixture only" },
    { id: "alert-risk-lock", name: "Risk Lock Alert", state: "Mock", lastTriggered: "Fixture only" }
  ],
  historicalValidation: [
    { id: "historical-btc", symbol: "BTCUSDT", sampleSize: 120, matchRate: "64%", status: "Mock" },
    { id: "historical-nifty", symbol: "NIFTY", sampleSize: 90, matchRate: "59%", status: "Mock" }
  ],
  // Phase 8: Signal flow pipeline validation fixtures
  signalFlowValidation: [
    {
      id: "sf-validation-btc-001",
      symbol: "BTCUSDT",
      omegaSignal: "Buy",
      comparisonSignal: "Buy",
      result: "Aligned",
      notes: "Signal flow pipeline validation — mock only. TradingView validation stage was skipped.",
      signalFlowId: "pipeline-mock-001",
      pipelineStage: "tradingview-validation",
      confidence: 0.71,
    },
    {
      id: "sf-validation-nifty-001",
      symbol: "NIFTY",
      omegaSignal: "Neutral",
      comparisonSignal: "Neutral",
      result: "Aligned",
      notes: "Signal flow pipeline validation — mock only. Hold recommendation aligned.",
      signalFlowId: "pipeline-mock-002",
      pipelineStage: "tradingview-validation",
      confidence: 0.61,
    },
  ],
};
