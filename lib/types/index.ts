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
  // Experience Engine flags
  | "ENABLE_EXPERIENCE"
  | "ENABLE_EXPERIENCE_PATTERNS"
  | "ENABLE_EXPERIENCE_KNOWLEDGE"
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

export type ExperienceCategory =
  | "paper-trade"
  | "paper-portfolio"
  | "signalflow-outcome"
  | "analytics"
  | "tradingview-observation"
  | "market-intelligence"
  | "knowledge-feedback";

export type ExperienceOutcome = "success" | "failure" | "neutral" | "inconclusive";

export interface ExperienceLesson {
  id: string;
  title: string;
  lesson: string;
  confidence: number;
  appliesTo: string[];
  createdAt: string;
}

export interface ExperiencePattern {
  id: string;
  name: string;
  category: "winning-setup" | "losing-setup" | "market-condition" | "strategy-behaviour" | "confidence-pattern" | "trading-session";
  description: string;
  occurrences: number;
  confidence: number;
  relatedExperienceIds: string[];
  metadata: Record<string, unknown>;
}

export interface ExperienceRecord {
  id: string;
  category: ExperienceCategory;
  source: string;
  timestamp: string;
  title: string;
  summary: string;
  outcome: ExperienceOutcome;
  symbol?: string;
  market?: string;
  signalId?: string;
  paperTradeId?: string;
  analyticsRefs: string[];
  tradingViewRefs: string[];
  marketIntelligenceRefs: string[];
  lessons: ExperienceLesson[];
  patterns: string[];
  confidence: number;
  metadata: Record<string, unknown>;
}

export interface ExperienceSnapshot {
  id: string;
  timestamp: string;
  records: ExperienceRecord[];
  patterns: ExperiencePattern[];
  lessons: ExperienceLesson[];
  summary: string;
  generatedBy: "mock-experience-engine";
}

export interface ExperienceFilter {
  category?: ExperienceCategory;
  outcome?: ExperienceOutcome;
  symbol?: string;
  market?: string;
  minConfidence?: number;
  patternId?: string;
}

export interface ExperienceSearch {
  query?: string;
  filter?: ExperienceFilter;
  limit?: number;
}

export interface ExperienceSummary {
  totalRecords: number;
  successCount: number;
  failureCount: number;
  topPatterns: ExperiencePattern[];
  keyLessons: ExperienceLesson[];
  knowledgeUpdateSummary: string;
}

export interface ExperienceRepository {
  listRecords(filter?: ExperienceFilter): Promise<ExperienceRecord[]>;
  search(search: ExperienceSearch): Promise<ExperienceRecord[]>;
  getRecord(id: string): Promise<ExperienceRecord | null>;
  listLessons(): Promise<ExperienceLesson[]>;
  listPatterns(): Promise<ExperiencePattern[]>;
  detectPatterns(): Promise<ExperiencePattern[]>;
  createSnapshot(): Promise<ExperienceSnapshot>;
  summarize(): Promise<ExperienceSummary>;
  prepareKnowledgeUpdates(): Promise<KnowledgeDocument[]>;
}

export interface ExperienceSignalFlowFeedback {
  signalId: string;
  symbol: string;
  market: string;
  experienceIds: string[];
  patternIds: string[];
  lessons: ExperienceLesson[];
  reasoning: string;
  appliedAt: string;
}
