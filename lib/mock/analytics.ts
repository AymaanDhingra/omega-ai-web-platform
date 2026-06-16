import type { AnalyticsGroup } from "../types";

export const analyticsGroups: AnalyticsGroup[] = [
  {
    id: "ai-accuracy",
    title: "AI Accuracy",
    description: "Mock tracking for AI direction, confidence calibration, and explanation quality.",
    metrics: [
      { id: "ai-direction", label: "Direction Match", value: "64%", description: "Signals that matched later mock trend direction.", tone: "ok" },
      { id: "ai-confidence", label: "Confidence Calibration", value: "72%", description: "Mock confidence alignment against outcomes.", tone: "flat" }
    ]
  },
  {
    id: "strategy-accuracy",
    title: "Strategy Accuracy",
    description: "Placeholder scorecards for strategy selection and regime fit.",
    metrics: [
      { id: "strategy-hit-rate", label: "Strategy Hit Rate", value: "58%", description: "Mock strategy signals ending favorable.", tone: "ok" },
      { id: "regime-fit", label: "Regime Fit", value: "High", description: "Current strategies aligned to expansion regime.", tone: "up" }
    ]
  },
  {
    id: "market-performance",
    title: "Market Performance",
    description: "Cross-market behavior placeholders for Indian, crypto, and global assets.",
    metrics: [
      { id: "market-breadth", label: "Market Breadth", value: "61%", description: "Mock positive-breadth reading across watchlist.", tone: "flat" },
      { id: "volatility", label: "Volatility", value: "Moderate", description: "Mock volatility regime remains tradable.", tone: "flat" }
    ]
  },
  {
    id: "paper-results",
    title: "Paper Trading Results",
    description: "Paper-trading scorecards before any broker integration exists.",
    metrics: [
      { id: "paper-pnl", label: "Paper PnL", value: "+INR 4,340", description: "Fixture-backed paper-trading result.", tone: "up" },
      { id: "paper-validation", label: "Validation", value: "Mock", description: "Paper validation has no external execution dependency.", tone: "flat" }
    ]
  },
  {
    id: "signal-statistics",
    title: "Signal Statistics",
    description: "Placeholder signal quality and alignment analytics.",
    metrics: [
      { id: "signal-count", label: "Signals", value: "3", description: "Active fixture trade signals.", tone: "flat" },
      { id: "avg-confidence", label: "Avg Confidence", value: "72%", description: "Average confidence across mock signals.", tone: "ok" }
    ]
  },
  {
    id: "portfolio-statistics",
    title: "Portfolio Statistics",
    description: "Portfolio allocation and risk placeholder metrics.",
    metrics: [
      { id: "cash-buffer", label: "Cash Buffer", value: "29.8%", description: "Mock liquidity held as cash.", tone: "ok" },
      { id: "open-positions", label: "Open Positions", value: "12", description: "Mock cross-market exposure count.", tone: "flat" }
    ]
  },
  {
    id: "historical-metrics",
    title: "Historical Metrics",
    description: "Placeholder for historical performance once data storage exists.",
    metrics: [
      { id: "sample-trades", label: "Sample Trades", value: "428", description: "Backtest fixture trade count.", tone: "flat" },
      { id: "max-drawdown", label: "Max Drawdown", value: "8.6%", description: "Mock historical drawdown.", tone: "warn" }
    ]
  }
];
