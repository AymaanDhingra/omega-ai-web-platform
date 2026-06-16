import type { AnalyticsModelSet } from "../contracts/analytics";

export const analyticsModelSet: AnalyticsModelSet = {
  strategyPerformance: [
    { id: "trend-following-performance", strategyName: "Trend Following", winRate: "61%", expectancy: "+0.34R", drawdown: "6.4%", status: "Mock" },
    { id: "breakout-performance", strategyName: "Breakout", winRate: "57%", expectancy: "+0.27R", drawdown: "8.2%", status: "Mock" }
  ],
  aiAccuracy: [
    { id: "direction-accuracy-model", metric: "Direction Accuracy", score: "64%", confidenceBand: "Medium", reviewStatus: "Mock" },
    { id: "confidence-calibration-model", metric: "Confidence Calibration", score: "72%", confidenceBand: "Medium", reviewStatus: "Mock" }
  ],
  marketPerformance: [
    { id: "indian-market-performance", market: "Indian", breadth: "61%", volatility: "Moderate", regime: "Risk-on expansion" },
    { id: "crypto-market-performance", market: "Crypto", breadth: "58%", volatility: "Elevated", regime: "Expansion" }
  ],
  paperTradingPerformance: [
    { id: "paper-primary-performance", accountId: "paper-primary", pnl: "+INR 4,340", winRate: "58.6%", maxDrawdown: "8.6%" }
  ],
  portfolioMetrics: [
    { id: "portfolio-metrics-primary", allocation: "Diversified", exposure: "71%", cashBuffer: "29.8%", riskState: "Mock" }
  ],
  historicalMetrics: [
    { id: "historical-1m", period: "1M", totalReturn: "31.8%", sharpe: "1.42", tradeCount: 428 }
  ]
};
