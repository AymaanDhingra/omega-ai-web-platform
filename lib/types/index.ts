export type MarketGroup = "All" | "Indian" | "Crypto" | "Global";

export type Signal = "Buy" | "Sell" | "Watch" | "Neutral";

export type Direction = "Long" | "Short";

export type MetricTone = "up" | "down" | "flat" | "warn" | "ok";

export type ModuleStatus = "active" | "mock" | "planned" | "locked";

export type SystemHealthState = "Online" | "Offline" | "Mock" | "Locked";

export type FeatureFlagName =
  // Core module flags
  | "ENABLE_MARKETS"
  | "ENABLE_AI"
  | "ENABLE_KNOWLEDGE"
  | "ENABLE_STRATEGIES"
  | "ENABLE_BACKTEST"
  | "ENABLE_PAPER"
  | "ENABLE_PORTFOLIO"
  | "ENABLE_TRADES"
  | "ENABLE_ANALYTICS"
  | "ENABLE_CHAT"
  | "ENABLE_NEWS"
  | "ENABLE_ADMIN"
  | "ENABLE_SETTINGS"
  // TradingView flags (optional - OMEGA functions without TradingView)
  | "ENABLE_TRADINGVIEW_CHARTS"
  | "ENABLE_TRADINGVIEW_WATCHLISTS"
  | "ENABLE_TRADINGVIEW_VALIDATION"
  // Market intelligence flags
  | "ENABLE_MARKET_INTELLIGENCE"
  | "ENABLE_MARKET_ANALYSIS"
  | "ENABLE_MARKET_INSIGHTS"
  // Persistence flags
  | "ENABLE_PERSISTENCE"
  | "ENABLE_CACHE"
  | "ENABLE_SESSIONS";

export type OmegaIcon =
  | "activity"
  | "alert"
  | "barChart"
  | "bell"
  | "bot"
  | "brain"
  | "candles"
  | "check"
  | "cloud"
  | "cpu"
  | "database"
  | "dollar"
  | "file"
  | "flask"
  | "gauge"
  | "layers"
  | "lineChart"
  | "lock"
  | "message"
  | "pause"
  | "play"
  | "plug"
  | "radio"
  | "search"
  | "settings"
  | "shield"
  | "target"
  | "trend"
  | "upload"
  | "wallet";

export interface ModuleDefinition {
  id: string;
  name: string;
  description: string;
  status: ModuleStatus;
  version: string;
  featureFlag: FeatureFlagName;
  icon: OmegaIcon;
  enabled: boolean;
  route: string;
  pageRoute: string;
  dependencies: string[];
  futureDependencies: string[];
  currentStatus: ModuleStatus;
  futureBackendDependency: string;
  futureAIDependency: string;
}

export interface DashboardMetric {
  id: string;
  label: string;
  value: string;
  delta: string;
  tone: MetricTone;
  icon: OmegaIcon;
}

export interface MarketAsset {
  id: string;
  group: Exclude<MarketGroup, "All">;
  symbol: string;
  price: string;
  volume: string;
  trend: string;
  signal: Signal;
  confidence: number;
  support: string;
  resistance: string;
  change: number;
}

export interface TradeSignal {
  id: string;
  market: string;
  symbol: string;
  direction: Direction;
  entry: string;
  stop: string;
  targets: string;
  confidence: number;
  expectedValue: string;
  risk: string;
  reasoning: string;
}

export interface Position {
  id: string;
  symbol: string;
  market: string;
  side: Direction;
  quantity: string;
  averagePrice: string;
  currentPrice: string;
  pnl: string;
  pnlPercent: string;
  exposure: string;
}

export interface Portfolio {
  id: string;
  currency: string;
  value: string;
  cash: string;
  dailyPnl: string;
  openPositions: number;
  winRate: string;
  aiConfidence: string;
  allocation: { label: string; value: string }[];
  positions: Position[];
  equityCurve: number[];
}

export interface Strategy {
  id: string;
  name: string;
  regime: string;
  status: string;
  expectancy: string;
  sharpe: string;
  drawdown: string;
}

export interface BacktestMetric {
  id: string;
  label: string;
  value: string;
}

export interface PaperTrade {
  id: string;
  symbol: string;
  side: Direction;
  pnl: string;
  mae: string;
  mfe: string;
}

export interface NewsEvent {
  id: string;
  source: string;
  headline: string;
  impact: "High" | "Medium" | "Low";
  tone: MetricTone;
}

export interface AIState {
  id: string;
  label: string;
  value: number;
  status: string;
  icon: OmegaIcon;
}

export interface AILoop {
  id: string;
  label: string;
  status: "Running" | "Queued" | "Locked";
  icon: OmegaIcon;
}

export interface AIBrain {
  id: string;
  name: string;
  confidence: number;
  summary: string;
  capabilities: string[];
  states: AIState[];
  loops: AILoop[];
  confidenceCurve: number[];
}

export interface KnowledgeDocument {
  id: string;
  name: string;
  type: "PDF" | "DOCX" | "CSV" | "Excel" | "Rules" | "History";
  status: "Indexed" | "Queued" | "Mock";
  source: string;
}

export interface SystemStatus {
  id: string;
  name: string;
  state: SystemHealthState;
  description: string;
}

export interface TradingMode {
  id: string;
  label: string;
  icon: OmegaIcon;
  available: boolean;
}

export interface BrokerConnection {
  id: string;
  name: string;
  status: SystemHealthState;
}

export interface RiskPermission {
  id: string;
  label: string;
  value: string;
}

export interface SystemLog {
  id: string;
  message: string;
  tone: MetricTone;
}

export interface AnalyticsMetric {
  id: string;
  label: string;
  value: string;
  description: string;
  tone: MetricTone;
}

export interface AnalyticsGroup {
  id: string;
  title: string;
  description: string;
  metrics: AnalyticsMetric[];
}

export interface TradingViewStatus {
  id: string;
  state: SystemHealthState;
  description: string;
}

export interface TestingStatus {
  id: string;
  label: string;
  state: SystemHealthState;
  lastRun: string;
}

export interface PaperTradingValidation {
  id: string;
  label: string;
  result: "Pass" | "Watch" | "Blocked";
  description: string;
}

export interface SignalComparison {
  id: string;
  symbol: string;
  omegaSignal: Signal;
  testingSignal: Signal;
  alignment: string;
  notes: string;
}

export interface AIAccuracyTracking {
  id: string;
  label: string;
  value: string;
  sampleSize: string;
  status: SystemHealthState;
}

export interface TradingViewTestingSummary {
  status: TradingViewStatus;
  testingStatuses: TestingStatus[];
  paperTradingValidation: PaperTradingValidation[];
  signalComparisons: SignalComparison[];
  aiAccuracy: AIAccuracyTracking[];
}

export interface DashboardSnapshot {
  modules: ModuleDefinition[];
  metrics: DashboardMetric[];
  marketAssets: MarketAsset[];
  tradeSignals: TradeSignal[];
  portfolio: Portfolio;
  strategies: Strategy[];
  backtestMetrics: BacktestMetric[];
  paperTrades: PaperTrade[];
  aiBrain: AIBrain;
  knowledgeDocuments: KnowledgeDocument[];
  newsEvents: NewsEvent[];
  systemStatuses: SystemStatus[];
  tradingModes: TradingMode[];
  brokerConnections: BrokerConnection[];
  riskPermissions: RiskPermission[];
  systemLogs: SystemLog[];
  chatCommands: string[];
  candles: [number, number, number, number][];
  analyticsGroups: AnalyticsGroup[];
  tradingViewTesting: TradingViewTestingSummary;
}

export type MarketCondition = "bullish" | "bearish" | "neutral" | "volatile" | "consolidating";
export type MarketTrend = "uptrend" | "downtrend" | "sideways" | "reversal" | "breakout";
export type MarketSentiment = "very-bullish" | "bullish" | "neutral" | "bearish" | "very-bearish";
export type MarketRegime = "trending" | "ranging" | "volatile" | "calm" | "transition";
export type MarketEventType = "economic" | "sector" | "news" | "volatility" | "session" | "tradingview" | "paper-trading";

export interface MarketContext {
  id: string;
  timestamp: string;
  market: string;
  symbol?: string;
  condition: MarketCondition;
  trend: MarketTrend;
  sentiment: MarketSentiment;
  regime: MarketRegime;
  volatility: number;
  volume: string;
  price?: string;
  source: string;
  metadata: Record<string, unknown>;
}

export interface MarketEvent {
  id: string;
  type: MarketEventType;
  timestamp: string;
  market: string;
  symbol?: string;
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  sentiment: MarketSentiment;
  source: string;
  metadata: Record<string, unknown>;
}

export interface MarketObservation {
  id: string;
  timestamp: string;
  market: string;
  symbol?: string;
  observation: string;
  confidence: number;
  source: "economic" | "sector" | "news" | "volatility" | "session" | "tradingview" | "paper-trading" | "mock";
  metadata: Record<string, unknown>;
}

export interface MarketInsight {
  id: string;
  timestamp: string;
  market: string;
  symbol?: string;
  insight: string;
  implications: string[];
  confidence: number;
  relatedEvents: string[];
  relatedObservations: string[];
  metadata: Record<string, unknown>;
}

export interface MarketRisk {
  id: string;
  timestamp: string;
  market: string;
  symbol?: string;
  riskType: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low";
  probability: number;
  impact: number;
  mitigation: string[];
  metadata: Record<string, unknown>;
}

export interface MarketOpportunity {
  id: string;
  timestamp: string;
  market: string;
  symbol?: string;
  opportunityType: string;
  description: string;
  potential: number;
  timeframe: string;
  requirements: string[];
  metadata: Record<string, unknown>;
}

export interface MarketAnalysis {
  id: string;
  timestamp: string;
  market: string;
  symbol?: string;
  context: MarketContext;
  observations: MarketObservation[];
  insights: MarketInsight[];
  risks: MarketRisk[];
  opportunities: MarketOpportunity[];
  summary: string;
  confidence: number;
  metadata: Record<string, unknown>;
}

export interface MarketSummary {
  id: string;
  timestamp: string;
  market: string;
  summary: string;
  keyPoints: string[];
  risks: string[];
  opportunities: string[];
  nextActions: string[];
  generatedAt: string;
  generatedBy: "mock-market-intelligence" | "ai-analysis";
}

export interface MarketIntelligenceRepository {
  getContexts(market?: string): Promise<MarketContext[]>;
  getEvents(market?: string): Promise<MarketEvent[]>;
  getObservations(market?: string): Promise<MarketObservation[]>;
  getInsights(market?: string): Promise<MarketInsight[]>;
  getRisks(market?: string): Promise<MarketRisk[]>;
  getOpportunities(market?: string): Promise<MarketOpportunity[]>;
  analyzeMarket(market: string, symbol?: string): Promise<MarketAnalysis>;
  summarizeMarket(market: string): Promise<MarketSummary>;
}

export interface MarketIntelligenceSignalInput {
  signalId: string;
  market: string;
  symbol: string;
  analysis: MarketAnalysis;
  relevanceScore: number;
  reasoning: string;
  appliedAt: string;
}
