/**
 * Persistence Module Exports
 * 
 * Central export point for all persistence contracts and implementations.
 * 
 * OMEGA Constitution: Mock implementations are the source of truth.
 */

// Core repository contracts
export type {
  Repository,
  Query,
  Filter,
  Sort,
  Pagination,
  PaginatedResult,
  RepositoryResult,
  RepositoryError,
  Identifiable,
  Timestamped,
  Archivable,
  Snapshot,
  HistoryEntry,
  HistoryRepository
} from "./repository";

// Mock repository implementation
export { MockRepository } from "./mock-repository";

// Domain-specific snapshots
export type {
  TradeSnapshotData,
  TradeSnapshot,
  PortfolioSnapshotData,
  PortfolioSnapshot,
  AISnapshotData,
  AISnapshot,
  MarketSnapshotData,
  MarketSnapshot,
  StrategySnapshotData,
  StrategySnapshot,
  PaperTradingSnapshotData,
  PaperTradingSnapshot,
  AnalyticsSnapshotData,
  AnalyticsSnapshot,
  KnowledgeSnapshotData,
  KnowledgeSnapshot,
  SystemSnapshotData,
  SystemSnapshot,
  TradingViewSnapshotData,
  TradingViewSnapshot
} from "./snapshots";

// History models
export type {
  TradeHistoryEntry,
  TradeHistory,
  SignalHistoryEntry,
  SignalHistory,
  PortfolioHistoryEntry,
  PortfolioHistory,
  StrategyHistoryEntry,
  StrategyHistory,
  AIHistoryEntry,
  AIHistory,
  KnowledgeHistoryEntry,
  KnowledgeHistory,
  AnalyticsHistoryEntry,
  AnalyticsHistory,
  PaperHistoryEntry,
  PaperHistory
} from "./history";

// Session abstractions
export type {
  Session,
  TradingSession,
  AISession,
  PaperTradingSession,
  TestingSession,
  ValidationSession,
  TradingViewTestingSession,
  SessionManager,
  OmegaSession
} from "./sessions";

// Cache abstractions
export type {
  Cache,
  CacheEntry,
  CacheStats,
  MarketCache,
  PortfolioCache,
  KnowledgeCache,
  AnalyticsCache,
  AIStateCache,
  SignalCache
} from "./cache";
export { MockCache } from "./cache";

// Domain repositories
export type {
  SignalRepository,
  TradeEntity,
  TradeRepository,
  OrderEntity,
  OrderRepository,
  PositionRepository,
  StrategyRepository,
  KnowledgeRepository,
  PaperTradingRepository,
  PortfolioRepository,
  AnalyticsRepository,
  AIRepository,
  EventRepository,
  MarketRepository,
  NewsRepository,
  TradingViewRepository
} from "./repositories";

// TradingView persistence (optional)
export type {
  TVSignalHistoryEntry,
  TVSignalHistory,
  TVAlertHistoryEntry,
  TVAlertHistory,
  TVValidationHistoryEntry,
  TVValidationHistory,
  TVPaperComparisonEntry,
  TVPaperComparison,
  TVTestingSession,
  TVPersistenceRepository
} from "./tradingview";
