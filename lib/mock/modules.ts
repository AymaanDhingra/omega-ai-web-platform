import type { FeatureFlagName, ModuleDefinition, ModuleStatus, OmegaIcon } from "../types";

function moduleDefinition(input: {
  id: string;
  name: string;
  description: string;
  status: ModuleStatus;
  version: string;
  featureFlag: FeatureFlagName;
  icon: OmegaIcon;
  pageRoute: string;
  dependencies: string[];
  futureDependencies: string[];
  futureBackendDependency: string;
  futureAIDependency: string;
}): ModuleDefinition {
  return {
    ...input,
    enabled: true,
    route: input.pageRoute,
    currentStatus: input.status
  };
}

export const omegaModules: ModuleDefinition[] = [
  moduleDefinition({
    id: "dashboard",
    name: "Dashboard",
    description: "Command view for portfolio, risk, AI state, and system health.",
    status: "active",
    version: "0.3.0",
    featureFlag: "ENABLE_PORTFOLIO",
    icon: "gauge",
    pageRoute: "/",
    dependencies: ["Portfolio", "AI Brain", "System Health"],
    futureDependencies: ["PortfolioService", "AISystemService", "MarketService"],
    futureBackendDependency: "Dashboard summary API",
    futureAIDependency: "AI status and confidence evaluator"
  }),
  moduleDefinition({
    id: "market-watch",
    name: "Market Watch",
    description: "Multi-market watchlists, signals, and support/resistance context.",
    status: "mock",
    version: "0.3.0",
    featureFlag: "ENABLE_MARKETS",
    icon: "candles",
    pageRoute: "/markets",
    dependencies: ["MarketService"],
    futureDependencies: ["MarketDataProvider", "InstrumentRegistry"],
    futureBackendDependency: "Market quotes and candles API",
    futureAIDependency: "Market regime classifier"
  }),
  moduleDefinition({
    id: "ai-brain",
    name: "AI Brain",
    description: "Reasoning core for trend, momentum, liquidity, and regime analysis.",
    status: "mock",
    version: "0.3.0",
    featureFlag: "ENABLE_AI",
    icon: "brain",
    pageRoute: "/ai",
    dependencies: ["AISystemService", "KnowledgeService", "MarketService"],
    futureDependencies: ["AIProvider", "KnowledgeService", "MarketService"],
    futureBackendDependency: "AI run history API",
    futureAIDependency: "Provider-neutral model router"
  }),
  moduleDefinition({
    id: "knowledge-center",
    name: "Knowledge Center",
    description: "Document, rules, and historical data ingestion surface.",
    status: "mock",
    version: "0.3.0",
    featureFlag: "ENABLE_KNOWLEDGE",
    icon: "database",
    pageRoute: "/knowledge",
    dependencies: ["KnowledgeService"],
    futureDependencies: ["DocumentParser", "VectorStore", "ObjectStorage"],
    futureBackendDependency: "Knowledge ingestion API",
    futureAIDependency: "Retrieval tools"
  }),
  moduleDefinition({
    id: "strategy-lab",
    name: "Strategy Lab",
    description: "Strategy design, parameter review, and regime fit analysis.",
    status: "mock",
    version: "0.3.0",
    featureFlag: "ENABLE_STRATEGIES",
    icon: "flask",
    pageRoute: "/strategies",
    dependencies: ["StrategyService"],
    futureDependencies: ["StrategyService", "BacktestService"],
    futureBackendDependency: "Strategy registry API",
    futureAIDependency: "Strategy generation assistant"
  }),
  moduleDefinition({
    id: "backtesting",
    name: "Backtesting",
    description: "Walk-forward and historical simulation metrics.",
    status: "mock",
    version: "0.3.0",
    featureFlag: "ENABLE_BACKTEST",
    icon: "barChart",
    pageRoute: "/backtesting",
    dependencies: ["StrategyService", "PortfolioService"],
    futureDependencies: ["HistoricalDataProvider", "BacktestEngine"],
    futureBackendDependency: "Backtest runner API",
    futureAIDependency: "Backtest result explainer"
  }),
  moduleDefinition({
    id: "paper-trading",
    name: "Paper Trading",
    description: "Simulation ledger, journal, and equity curve before live execution.",
    status: "mock",
    version: "0.3.0",
    featureFlag: "ENABLE_PAPER",
    icon: "wallet",
    pageRoute: "/paper",
    dependencies: ["PortfolioService", "StrategyService"],
    futureDependencies: ["PaperBroker", "RiskService", "PortfolioService"],
    futureBackendDependency: "Paper trading ledger API",
    futureAIDependency: "Paper trade review assistant"
  }),
  moduleDefinition({
    id: "portfolio",
    name: "Portfolio",
    description: "Holdings, cash, exposure, allocation, and risk state.",
    status: "mock",
    version: "0.3.0",
    featureFlag: "ENABLE_PORTFOLIO",
    icon: "layers",
    pageRoute: "/portfolio",
    dependencies: ["PortfolioService"],
    futureDependencies: ["PostgreSQL", "BrokerReconciliation"],
    futureBackendDependency: "Portfolio accounting API",
    futureAIDependency: "Portfolio review assistant"
  }),
  moduleDefinition({
    id: "trade-center",
    name: "Trade Center",
    description: "Evidence-gated trade ideas with entry, stop, target, and risk.",
    status: "mock",
    version: "0.3.0",
    featureFlag: "ENABLE_TRADES",
    icon: "target",
    pageRoute: "/trades",
    dependencies: ["StrategyService", "AISystemService"],
    futureDependencies: ["SignalService", "RiskService"],
    futureBackendDependency: "Signal and order-intent API",
    futureAIDependency: "Signal rationale generator"
  }),
  moduleDefinition({
    id: "analytics",
    name: "Analytics",
    description: "Performance charts, heat maps, drawdown, and win-rate analysis.",
    status: "mock",
    version: "0.3.0",
    featureFlag: "ENABLE_ANALYTICS",
    icon: "lineChart",
    pageRoute: "/analytics",
    dependencies: ["AnalyticsService", "PortfolioService"],
    futureDependencies: ["AnalyticsService", "PortfolioSnapshots"],
    futureBackendDependency: "Analytics rollup API",
    futureAIDependency: "Performance anomaly summarizer"
  }),
  moduleDefinition({
    id: "ai-chat",
    name: "AI Chat",
    description: "Command center for analysis, scans, strategy drafts, and reviews.",
    status: "mock",
    version: "0.3.0",
    featureFlag: "ENABLE_CHAT",
    icon: "message",
    pageRoute: "/chat",
    dependencies: ["AISystemService"],
    futureDependencies: ["AIProvider", "ToolRegistry"],
    futureBackendDependency: "Conversation API",
    futureAIDependency: "Provider-neutral chat runtime"
  }),
  moduleDefinition({
    id: "news-intelligence",
    name: "News Intelligence",
    description: "Event detection, market news, and calendar risk monitoring.",
    status: "mock",
    version: "0.3.0",
    featureFlag: "ENABLE_NEWS",
    icon: "radio",
    pageRoute: "/news",
    dependencies: ["NewsService"],
    futureDependencies: ["NewsProvider", "EconomicCalendarProvider"],
    futureBackendDependency: "News and event API",
    futureAIDependency: "News impact classifier"
  }),
  moduleDefinition({
    id: "admin",
    name: "Admin",
    description: "System controls, permissions, provider settings, and audit logs.",
    status: "mock",
    version: "0.3.0",
    featureFlag: "ENABLE_ADMIN",
    icon: "settings",
    pageRoute: "/admin",
    dependencies: ["AISystemService"],
    futureDependencies: ["AuthService", "AuditLog", "SecretsManager"],
    futureBackendDependency: "Admin settings and audit API",
    futureAIDependency: "Operational diagnostics assistant"
  }),
  moduleDefinition({
    id: "settings",
    name: "Settings",
    description: "User preferences, platform configuration, and module toggles.",
    status: "mock",
    version: "0.3.0",
    featureFlag: "ENABLE_SETTINGS",
    icon: "settings",
    pageRoute: "/settings",
    dependencies: ["FeatureFlags", "ModuleRegistry"],
    futureDependencies: ["AuthService", "UserPreferences"],
    futureBackendDependency: "User settings API",
    futureAIDependency: "No AI dependency required"
  }),
  moduleDefinition({
    id: "tradingview-foundation",
    name: "TradingView Foundation",
    description: "Phase 7 foundation layer for future TradingView integration. Mock-only placeholders — no real widget, no real connection. TradingView remains OPTIONAL.",
    status: "placeholder",
    version: "0.1.0",
    featureFlag: "ENABLE_TRADINGVIEW",
    icon: "candles",
    pageRoute: "/tradingview",
    dependencies: ["dashboard"],
    futureDependencies: ["tradingview-provider"],
    futureBackendDependency: "TradingView chart and watchlist sync API",
    futureAIDependency: "Signal validation against TradingView indicators"
  })
];

export const primaryNavigationModuleIds = [
  "dashboard",
  "market-watch",
  "ai-brain",
  "knowledge-center",
  "strategy-lab",
  "backtesting",
  "paper-trading",
  "portfolio",
  "trade-center",
  "analytics",
  "ai-chat",
  "news-intelligence",
  "admin",
  "settings"
];
