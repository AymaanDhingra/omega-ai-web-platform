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
  // Knowledge Intelligence Layer flags - Phase 9
  | "ENABLE_KNOWLEDGE_SEARCH"
  | "ENABLE_KNOWLEDGE_SUMMARY"
  | "ENABLE_KNOWLEDGE_AI"
  // TradingView flags (optional - OMEGA functions without TradingView)
  | "ENABLE_TRADINGVIEW_CHARTS"
  | "ENABLE_TRADINGVIEW_WATCHLISTS"
  | "ENABLE_TRADINGVIEW_VALIDATION"
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

// Knowledge Intelligence Layer Types
export type KnowledgeCategoryType =
  | "strategy"
  | "trade-journal"
  | "market-notes"
  | "research-notes"
  | "economic-events"
  | "ai-learnings"
  | "paper-trading-results"
  | "tradingview-observations"
  | "portfolio-notes"
  | "risk-rules"
  | "market-regime"
  | "signal-analysis";

export interface KnowledgeTag {
  id: string;
  name: string;
  category: KnowledgeCategoryType;
  weight: number;
  createdAt: string;
}

export interface KnowledgeReference {
  id: string;
  type: "internal" | "external" | "signal" | "trade" | "market";
  targetId: string;
  targetType: string;
  relationship: "related" | "supports" | "contradicts" | "extends" | "refines";
  confidence: number;
  createdAt: string;
}

export interface KnowledgeState {
  id: string;
  status: "active" | "archived" | "deprecated" | "under-review";
  validFrom: string;
  validUntil?: string;
  confidence: number;
  lastValidated: string;
  validationSource: string;
}

export interface KnowledgeSnapshot {
  id: string;
  knowledgeItemId: string;
  timestamp: string;
  content: string;
  metadata: Record<string, unknown>;
  state: KnowledgeState;
  tags: KnowledgeTag[];
}

export interface KnowledgeRelationship {
  id: string;
  sourceId: string;
  targetId: string;
  type: "related" | "supports" | "contradicts" | "extends" | "refines" | "depends-on";
  strength: number;
  reasoning: string;
  createdAt: string;
}

export interface KnowledgeItem {
  id: string;
  title: string;
  description: string;
  content: string;
  category: KnowledgeCategoryType;
  source: string;
  sourceId?: string;
  tags: KnowledgeTag[];
  references: KnowledgeReference[];
  state: KnowledgeState;
  metadata: {
    author?: string;
    market?: string;
    symbol?: string;
    timeframe?: string;
    regime?: string;
    confidence?: number;
    [key: string]: unknown;
  };
  createdAt: string;
  updatedAt: string;
  expiresAt?: string;
}

export interface KnowledgeCollection {
  id: string;
  name: string;
  description: string;
  category: KnowledgeCategoryType;
  items: KnowledgeItem[];
  relationships: KnowledgeRelationship[];
  metadata: {
    market?: string;
    regime?: string;
    period?: string;
    [key: string]: unknown;
  };
  createdAt: string;
  updatedAt: string;
}

export interface KnowledgeFilter {
  categories?: KnowledgeCategoryType[];
  tags?: string[];
  status?: KnowledgeState["status"][];
  minConfidence?: number;
  market?: string;
  symbol?: string;
  timeframe?: string;
  regime?: string;
  dateRange?: {
    from: string;
    to: string;
  };
  source?: string;
}

export interface KnowledgeRanking {
  itemId: string;
  score: number;
  factors: {
    recency: number;
    confidence: number;
    tagRelevance: number;
    relationshipStrength: number;
    validationStatus: number;
  };
  reasoning: string;
}

export interface KnowledgeSummary {
  id: string;
  itemId: string;
  summary: string;
  keyPoints: string[];
  implications: string[];
  relatedItems: string[];
  generatedAt: string;
  generatedBy: string;
}

export interface KnowledgeSearchQuery {
  query: string;
  filter?: KnowledgeFilter;
  limit?: number;
  offset?: number;
  includeRelationships?: boolean;
  includeSummaries?: boolean;
}

export interface KnowledgeSearchResult {
  items: KnowledgeItem[];
  rankings: KnowledgeRanking[];
  totalCount: number;
  hasMore: boolean;
  executedAt: string;
  queryTime: number;
}

export interface KnowledgeRepository {
  createItem(item: Omit<KnowledgeItem, "id" | "createdAt" | "updatedAt">): Promise<KnowledgeItem>;
  getItem(id: string): Promise<KnowledgeItem | null>;
  updateItem(id: string, updates: Partial<KnowledgeItem>): Promise<KnowledgeItem>;
  deleteItem(id: string): Promise<void>;
  listItems(filter?: KnowledgeFilter): Promise<KnowledgeItem[]>;
  createCollection(collection: Omit<KnowledgeCollection, "id" | "createdAt" | "updatedAt">): Promise<KnowledgeCollection>;
  getCollection(id: string): Promise<KnowledgeCollection | null>;
  updateCollection(id: string, updates: Partial<KnowledgeCollection>): Promise<KnowledgeCollection>;
  deleteCollection(id: string): Promise<void>;
  listCollections(): Promise<KnowledgeCollection[]>;
  search(query: KnowledgeSearchQuery): Promise<KnowledgeSearchResult>;
  filter(filter: KnowledgeFilter): Promise<KnowledgeItem[]>;
  rank(items: KnowledgeItem[], query: string): Promise<KnowledgeRanking[]>;
  createRelationship(relationship: Omit<KnowledgeRelationship, "id" | "createdAt">): Promise<KnowledgeRelationship>;
  getRelationships(itemId: string): Promise<KnowledgeRelationship[]>;
  deleteRelationship(id: string): Promise<void>;
  createSnapshot(snapshot: Omit<KnowledgeSnapshot, "id">): Promise<KnowledgeSnapshot>;
  getSnapshots(itemId: string): Promise<KnowledgeSnapshot[]>;
  createSummary(summary: Omit<KnowledgeSummary, "id" | "generatedAt">): Promise<KnowledgeSummary>;
  getSummary(itemId: string): Promise<KnowledgeSummary | null>;
}

export interface KnowledgeSource {
  id: string;
  type: KnowledgeCategoryType;
  name: string;
  description: string;
  enabled: boolean;
  priority: number;
  metadata: Record<string, unknown>;
}

export interface KnowledgeIntegration {
  id: string;
  signalId: string;
  knowledgeItems: KnowledgeItem[];
  relevanceScore: number;
  reasoning: string;
  appliedAt: string;
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
