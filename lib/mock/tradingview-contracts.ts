import type { TradingViewTestingContracts } from "../contracts/tradingview-testing";

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
  ]
};
