import type { BrokerConnection, RiskPermission, SystemLog } from "../types";

export const brokerConnections: BrokerConnection[] = [
  "Zerodha",
  "Upstox",
  "Angel One",
  "Dhan",
  "Fyers",
  "Binance",
  "Bybit",
  "OKX",
  "Coinbase",
  "Kraken"
].map((name) => ({
  id: name.toLowerCase().replaceAll(" ", "-"),
  name,
  status: "Locked"
}));

export const riskPermissions: RiskPermission[] = [
  { id: "live-orders", label: "Live orders", value: "Disabled" },
  { id: "paper-execution", label: "Paper execution", value: "Enabled" },
  { id: "max-leverage", label: "Max leverage", value: "1.5x" },
  { id: "correlation-cap", label: "Correlation cap", value: "0.62" },
  { id: "emergency-flatten", label: "Emergency flatten", value: "Armed" }
];

export const systemLogs: SystemLog[] = [
  { id: "market-scan", message: "Market scanner completed 15 symbols", tone: "ok" },
  { id: "backtest-queued", message: "Backtest queued for breakout strategy", tone: "flat" },
  { id: "knowledge-indexed", message: "Knowledge base indexed 2 documents", tone: "ok" },
  { id: "execution-locked", message: "Execution engine locked by policy", tone: "warn" }
];
