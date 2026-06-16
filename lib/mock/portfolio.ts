import type { DashboardMetric, PaperTrade, Portfolio } from "../types";

export const dashboardMetrics: DashboardMetric[] = [
  { id: "portfolio-value", label: "Portfolio Value", value: "INR 24,82,450", delta: "+1.84%", tone: "up", icon: "dollar" },
  { id: "cash", label: "Cash", value: "INR 7,40,000", delta: "29.8%", tone: "flat", icon: "wallet" },
  { id: "daily-pnl", label: "Daily PnL", value: "INR 32,840", delta: "+0.92%", tone: "up", icon: "trend" },
  { id: "open-positions", label: "Open Positions", value: "12", delta: "4 markets", tone: "flat", icon: "layers" },
  { id: "win-rate", label: "Win Rate", value: "58.6%", delta: "+3.2%", tone: "up", icon: "target" },
  { id: "ai-confidence", label: "AI Confidence", value: "74%", delta: "stable", tone: "flat", icon: "brain" }
];

export const portfolio: Portfolio = {
  id: "mock-portfolio",
  currency: "INR",
  value: "INR 24,82,450",
  cash: "INR 7,40,000",
  dailyPnl: "INR 32,840",
  openPositions: 12,
  winRate: "58.6%",
  aiConfidence: "74%",
  allocation: [
    { label: "Indian Equities", value: "46%" },
    { label: "Crypto", value: "22%" },
    { label: "Commodities", value: "17%" },
    { label: "Cash", value: "15%" }
  ],
  positions: [
    { id: "pos-infy", symbol: "INFY", market: "Indian Equity", side: "Long", quantity: "120", averagePrice: "1,442.50", currentPrice: "1,486.35", pnl: "+INR 5,262", pnlPercent: "+3.04%", exposure: "INR 1,78,362" },
    { id: "pos-eth", symbol: "ETHUSDT", market: "Crypto Spot", side: "Long", quantity: "0.42", averagePrice: "5,640.00", currentPrice: "5,842.10", pnl: "+$84.88", pnlPercent: "+3.58%", exposure: "$2,453.68" },
    { id: "pos-tcs", symbol: "TCS", market: "Indian Equity", side: "Short", quantity: "50", averagePrice: "3,856.40", currentPrice: "3,894.80", pnl: "-INR 1,920", pnlPercent: "-1.00%", exposure: "INR 1,94,740" }
  ],
  equityCurve: [22, 28, 26, 33, 39, 37, 46, 51, 48, 58, 64, 62, 72, 78, 84, 81, 92]
};

export const paperTrades: PaperTrade[] = [
  { id: "paper-infy", symbol: "INFY", side: "Long", pnl: "+INR 5,840", mae: "-0.34R", mfe: "+1.26R" },
  { id: "paper-eth", symbol: "ETHUSDT", side: "Long", pnl: "+$420", mae: "-0.22R", mfe: "+1.08R" },
  { id: "paper-tcs", symbol: "TCS", side: "Short", pnl: "-INR 1,920", mae: "-0.78R", mfe: "+0.18R" }
];
