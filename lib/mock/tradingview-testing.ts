import type { TradingViewTestingSummary } from "../types";

export const tradingViewTesting: TradingViewTestingSummary = {
  status: {
    id: "tradingview-status",
    state: "Mock",
    description: "TradingView is represented only as a future testing surface. No real integration, credentials, or chart widgets are connected."
  },
  testingStatuses: [
    { id: "signal-comparison", label: "Signal Comparison", state: "Mock", lastRun: "Fixture only" },
    { id: "paper-validation", label: "Paper Trading Validation", state: "Mock", lastRun: "Fixture only" },
    { id: "accuracy-tracking", label: "AI Accuracy Tracking", state: "Mock", lastRun: "Fixture only" }
  ],
  paperTradingValidation: [
    { id: "fill-simulation", label: "Fill Simulation", result: "Pass", description: "Paper fills remain local mock records." },
    { id: "risk-lock", label: "Live Risk Lock", result: "Pass", description: "Live execution remains locked and unavailable." },
    { id: "journal", label: "Paper Journal", result: "Watch", description: "Journal state is fixture-backed and not persisted." }
  ],
  signalComparisons: [
    { id: "compare-btc", symbol: "BTCUSDT", omegaSignal: "Buy", testingSignal: "Buy", alignment: "Aligned", notes: "Mock testing signal agrees with OMEGA fixture." },
    { id: "compare-banknifty", symbol: "BANKNIFTY", omegaSignal: "Buy", testingSignal: "Watch", alignment: "Partial", notes: "Testing placeholder is less aggressive than OMEGA fixture." },
    { id: "compare-crude", symbol: "CRUDE", omegaSignal: "Sell", testingSignal: "Sell", alignment: "Aligned", notes: "Mock testing signal agrees with OMEGA fixture." }
  ],
  aiAccuracy: [
    { id: "direction-accuracy", label: "Direction Accuracy", value: "64%", sampleSize: "25 mock signals", status: "Mock" },
    { id: "confidence-accuracy", label: "Confidence Accuracy", value: "72%", sampleSize: "25 mock signals", status: "Mock" },
    { id: "reasoning-quality", label: "Reasoning Quality", value: "Review queued", sampleSize: "Fixture only", status: "Mock" }
  ]
};
