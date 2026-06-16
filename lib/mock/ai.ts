import type { AIBrain, SystemStatus, TradingMode } from "../types";

export const tradingModes: TradingMode[] = [
  { id: "research", label: "Research", icon: "search", available: true },
  { id: "analysis", label: "Analysis", icon: "brain", available: true },
  { id: "backtesting", label: "Backtesting", icon: "barChart", available: true },
  { id: "paper-trading", label: "Paper Trading", icon: "wallet", available: true },
  { id: "live-trading", label: "Live Trading", icon: "plug", available: false },
  { id: "autonomous", label: "Autonomous", icon: "bot", available: false },
  { id: "self-learning", label: "Self Learning", icon: "cpu", available: true }
];

export const aiBrain: AIBrain = {
  id: "mock-ai-brain",
  name: "Reasoning Core",
  confidence: 74,
  summary: "Trend, momentum, liquidity, and regime analysis are simulated through mock state.",
  capabilities: ["Trend", "Momentum", "Volatility", "Liquidity", "Market Regime", "Strategy Selection"],
  states: [
    { id: "learning", label: "Learning", value: 82, status: "active", icon: "database" },
    { id: "analyzing", label: "Analyzing", value: 76, status: "active", icon: "brain" },
    { id: "backtesting", label: "Backtesting", value: 61, status: "queued", icon: "barChart" },
    { id: "paper-trading", label: "Paper Trading", value: 68, status: "active", icon: "wallet" },
    { id: "live-trading", label: "Live Trading", value: 0, status: "locked", icon: "lock" },
    { id: "emergency", label: "Emergency", value: 4, status: "armed", icon: "alert" }
  ],
  loops: [
    { id: "market-scanner", label: "Market Scanner", status: "Running", icon: "activity" },
    { id: "news-scanner", label: "News Scanner", status: "Running", icon: "radio" },
    { id: "pattern-scanner", label: "Pattern Scanner", status: "Running", icon: "search" },
    { id: "strategy-engine", label: "Strategy Engine", status: "Running", icon: "flask" },
    { id: "backtester", label: "Backtester", status: "Queued", icon: "barChart" },
    { id: "portfolio-monitor", label: "Portfolio Monitor", status: "Running", icon: "wallet" },
    { id: "learning-engine", label: "Learning Engine", status: "Running", icon: "database" },
    { id: "execution-engine", label: "Execution Engine", status: "Locked", icon: "lock" }
  ],
  confidenceCurve: [52, 55, 54, 58, 62, 64, 61, 66, 69, 68, 71, 73, 70, 74, 76, 75, 78]
};

export const systemStatuses: SystemStatus[] = [
  { id: "frontend", name: "Frontend", state: "Online", description: "Next.js dashboard shell is available." },
  { id: "ai-core", name: "AI Core", state: "Mock", description: "Provider-free reasoning state is simulated." },
  { id: "market-data", name: "Market Data", state: "Mock", description: "Watchlists use static mock fixtures." },
  { id: "portfolio", name: "Portfolio", state: "Mock", description: "Portfolio state is sourced from mock services." },
  { id: "knowledge-base", name: "Knowledge Base", state: "Mock", description: "Uploads are local UI state only." },
  { id: "paper-trading", name: "Paper Trading", state: "Mock", description: "Paper trades are fixture-backed." },
  { id: "live-trading", name: "Live Trading", state: "Locked", description: "Live orders are disabled by design." },
  { id: "broker-connections", name: "Broker Connections", state: "Locked", description: "No broker adapters are connected." },
  { id: "news-engine", name: "News Engine", state: "Mock", description: "News intelligence uses mock events." }
];

export const chatCommands = ["Analyze BTC", "Find NIFTY trades", "Build strategy", "Backtest strategy", "Portfolio review", "Market scan"];
