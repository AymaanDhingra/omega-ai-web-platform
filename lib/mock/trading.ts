import type { BacktestMetric, Strategy, TradeSignal } from "../types";

export const tradeSignals: TradeSignal[] = [
  {
    id: "signal-btc-long",
    market: "Crypto Futures",
    symbol: "BTCUSDT",
    direction: "Long",
    entry: "104,000 - 104,350",
    stop: "101,850",
    targets: "106,800 / 109,400",
    confidence: 78,
    expectedValue: "+1.72R",
    risk: "Funding spike, failed reclaim below VWAP",
    reasoning: "Expansion regime, higher timeframe demand, volume impulse above range high."
  },
  {
    id: "signal-banknifty-long",
    market: "Indian F&O",
    symbol: "BANKNIFTY",
    direction: "Long",
    entry: "51,620 - 51,880",
    stop: "51,180",
    targets: "52,520 / 53,050",
    confidence: 72,
    expectedValue: "+1.38R",
    risk: "OI unwind near resistance, RBI headline sensitivity",
    reasoning: "Momentum breadth is improving while price holds above prior value area."
  },
  {
    id: "signal-crude-short",
    market: "Global Commodities",
    symbol: "CRUDE",
    direction: "Short",
    entry: "78.80 - 79.15",
    stop: "80.25",
    targets: "76.80 / 75.60",
    confidence: 66,
    expectedValue: "+1.21R",
    risk: "Supply shock or inventory surprise",
    reasoning: "Distribution structure, failed auction above resistance, weak demand response."
  }
];

export const strategies: Strategy[] = [
  { id: "trend-following", name: "Trend Following", regime: "Expansion", status: "Active", expectancy: "+0.34R", sharpe: "1.72", drawdown: "6.4%" },
  { id: "mean-reversion", name: "Mean Reversion", regime: "Balanced", status: "Throttled", expectancy: "+0.12R", sharpe: "1.08", drawdown: "4.1%" },
  { id: "breakout", name: "Breakout", regime: "Compression", status: "Testing", expectancy: "+0.27R", sharpe: "1.36", drawdown: "8.2%" },
  { id: "options-momentum", name: "Options Momentum", regime: "Event", status: "Queued", expectancy: "+0.19R", sharpe: "1.18", drawdown: "5.8%" }
];

export const backtestMetrics: BacktestMetric[] = [
  { id: "win-rate", label: "Win Rate", value: "57.9%" },
  { id: "profit-factor", label: "Profit Factor", value: "1.64" },
  { id: "sharpe", label: "Sharpe", value: "1.42" },
  { id: "drawdown", label: "Drawdown", value: "8.6%" },
  { id: "total-return", label: "Total Return", value: "31.8%" },
  { id: "trades", label: "Trades", value: "428" }
];
