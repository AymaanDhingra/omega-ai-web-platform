import type { AnalyticsModelSet } from "../contracts/analytics";

export const analyticsModelSet: AnalyticsModelSet = {
  strategyPerformance: [
    {
      id: "trend-following-performance",
      strategyName: "Trend Following",
      winRate: "61%",
      expectancy: "+0.34R",
      drawdown: "6.4%",
      status: "Mock",
      totalTrades: 214,
      profitFactor: "1.82",
      sharpeRatio: "1.38",
      averageDuration: "3.2 days",
    },
    {
      id: "breakout-performance",
      strategyName: "Breakout",
      winRate: "57%",
      expectancy: "+0.27R",
      drawdown: "8.2%",
      status: "Mock",
      totalTrades: 178,
      profitFactor: "1.61",
      sharpeRatio: "1.14",
      averageDuration: "1.8 days",
    },
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
    {
      id: "paper-primary-performance",
      accountId: "paper-primary",
      pnl: "+INR 4,340",
      winRate: "58.6%",
      maxDrawdown: "8.6%",
      sharpeRatio: "1.42",
      sortinoRatio: "1.87",
      profitFactor: "1.74",
      averageDuration: "2.4 days",
      bestTrade: "+INR 1,820",
      worstTrade: "-INR 640",
    },
  ],
  portfolioMetrics: [
    { id: "portfolio-metrics-primary", allocation: "Diversified", exposure: "71%", cashBuffer: "29.8%", riskState: "Mock" }
  ],
  historicalMetrics: [
    { id: "historical-1m", period: "1M", totalReturn: "31.8%", sharpe: "1.42", tradeCount: 428 }
  ],
  signalFlowAnalytics: [
    {
      id: "signal-flow-analytics-primary",
      totalPipelines: 42,
      completedPipelines: 38,
      failedPipelines: 4,
      averageDuration: "680ms",
      averageConfidence: "0.67",
      stageSuccessRates: [
        { stage: "market-analysis", rate: "100%" },
        { stage: "ai-analysis", rate: "100%" },
        { stage: "signal-generation", rate: "90.5%" },
        { stage: "signal-validation", rate: "88.1%" },
        { stage: "order-creation", rate: "85.7%" },
        { stage: "position-management", rate: "85.7%" },
        { stage: "trade-execution", rate: "85.7%" },
        { stage: "portfolio-update", rate: "85.7%" },
        { stage: "analytics-update", rate: "85.7%" },
        { stage: "tradingview-validation", rate: "N/A (skipped)" },
      ],
      tradingViewAlignmentRate: "N/A",
      status: "Mock",
    },
  ],
};
