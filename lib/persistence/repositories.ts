/**
 * Domain-Specific Repository Contracts
 * 
 * Specialized repositories for each domain entity.
 * All extend the generic Repository<T> interface with domain-specific methods.
 * 
 * OMEGA Constitution: Mock implementations are the source of truth.
 */

import type { Repository, RepositoryResult, Query } from "./repository";
import type {
  MarketAsset,
  TradeSignal,
  Portfolio,
  Position,
  Strategy,
  AIBrain,
  KnowledgeDocument,
  AnalyticsGroup,
  NewsEvent
} from "../types";
import type { PaperOrder, PaperPosition, TradeJournalEntry } from "../contracts/paper-trading";
import type { OmegaEvent } from "../events";

/**
 * Signal Repository - manages trade signals
 */
export interface SignalRepository extends Repository<TradeSignal> {
  findBySymbol(symbol: string): Promise<RepositoryResult<TradeSignal[]>>;
  findByDirection(direction: "Long" | "Short"): Promise<RepositoryResult<TradeSignal[]>>;
  findByConfidenceRange(min: number, max: number): Promise<RepositoryResult<TradeSignal[]>>;
  findActive(): Promise<RepositoryResult<TradeSignal[]>>;
  findExpired(): Promise<RepositoryResult<TradeSignal[]>>;
  markExecuted(id: string): Promise<RepositoryResult<TradeSignal>>;
  markExpired(id: string): Promise<RepositoryResult<TradeSignal>>;
}

/**
 * Trade Entity for repository
 */
export interface TradeEntity {
  id: string;
  signalId: string;
  symbol: string;
  market: string;
  direction: "Long" | "Short";
  status: "pending" | "open" | "managing" | "partial" | "closed" | "cancelled";
  entryPrice?: number;
  exitPrice?: number;
  quantity: number;
  stopLoss?: number;
  takeProfit?: number;
  pnl?: number;
  pnlPercent?: number;
  openedAt?: string;
  closedAt?: string;
  notes?: string;
}

/**
 * Trade Repository - manages trade lifecycle
 */
export interface TradeRepository extends Repository<TradeEntity> {
  findBySignal(signalId: string): Promise<RepositoryResult<TradeEntity[]>>;
  findBySymbol(symbol: string): Promise<RepositoryResult<TradeEntity[]>>;
  findByStatus(status: TradeEntity["status"]): Promise<RepositoryResult<TradeEntity[]>>;
  findOpen(): Promise<RepositoryResult<TradeEntity[]>>;
  findClosed(from?: string, to?: string): Promise<RepositoryResult<TradeEntity[]>>;
  updateStatus(id: string, status: TradeEntity["status"]): Promise<RepositoryResult<TradeEntity>>;
  closeTrade(id: string, exitPrice: number): Promise<RepositoryResult<TradeEntity>>;
}

/**
 * Order Entity for repository
 */
export interface OrderEntity {
  id: string;
  tradeId?: string;
  symbol: string;
  side: "buy" | "sell";
  type: "market" | "limit" | "stop" | "stop_limit";
  status: "pending" | "submitted" | "partial" | "filled" | "cancelled" | "rejected";
  quantity: number;
  price?: number;
  stopPrice?: number;
  filledQuantity: number;
  filledPrice?: number;
  createdAt: string;
  updatedAt: string;
  filledAt?: string;
}

/**
 * Order Repository - manages order lifecycle
 */
export interface OrderRepository extends Repository<OrderEntity> {
  findByTrade(tradeId: string): Promise<RepositoryResult<OrderEntity[]>>;
  findBySymbol(symbol: string): Promise<RepositoryResult<OrderEntity[]>>;
  findByStatus(status: OrderEntity["status"]): Promise<RepositoryResult<OrderEntity[]>>;
  findPending(): Promise<RepositoryResult<OrderEntity[]>>;
  updateStatus(id: string, status: OrderEntity["status"], filledPrice?: number): Promise<RepositoryResult<OrderEntity>>;
  cancelOrder(id: string): Promise<RepositoryResult<OrderEntity>>;
}

/**
 * Position Repository - manages open positions
 */
export interface PositionRepository extends Repository<Position> {
  findBySymbol(symbol: string): Promise<RepositoryResult<Position | null>>;
  findByMarket(market: string): Promise<RepositoryResult<Position[]>>;
  findBySide(side: "Long" | "Short"): Promise<RepositoryResult<Position[]>>;
  updatePrice(symbol: string, currentPrice: string): Promise<RepositoryResult<Position>>;
  closePosition(symbol: string): Promise<RepositoryResult<Position>>;
  getTotalExposure(): Promise<RepositoryResult<number>>;
}

/**
 * Strategy Repository - manages trading strategies
 */
export interface StrategyRepository extends Repository<Strategy> {
  findByRegime(regime: string): Promise<RepositoryResult<Strategy[]>>;
  findByStatus(status: string): Promise<RepositoryResult<Strategy[]>>;
  findActive(): Promise<RepositoryResult<Strategy[]>>;
  updatePerformance(id: string, metrics: Partial<Strategy>): Promise<RepositoryResult<Strategy>>;
  activate(id: string): Promise<RepositoryResult<Strategy>>;
  deactivate(id: string): Promise<RepositoryResult<Strategy>>;
}

/**
 * Knowledge Repository - manages knowledge documents
 */
export interface KnowledgeRepository extends Repository<KnowledgeDocument> {
  findByType(type: KnowledgeDocument["type"]): Promise<RepositoryResult<KnowledgeDocument[]>>;
  findByStatus(status: KnowledgeDocument["status"]): Promise<RepositoryResult<KnowledgeDocument[]>>;
  findIndexed(): Promise<RepositoryResult<KnowledgeDocument[]>>;
  findQueued(): Promise<RepositoryResult<KnowledgeDocument[]>>;
  markIndexed(id: string): Promise<RepositoryResult<KnowledgeDocument>>;
  searchDocuments(query: string): Promise<RepositoryResult<KnowledgeDocument[]>>;
}

/**
 * Paper Trading Repository - manages paper trading state
 */
export interface PaperTradingRepository {
  // Orders
  saveOrder(order: PaperOrder): Promise<RepositoryResult<PaperOrder>>;
  findOrder(orderId: string): Promise<RepositoryResult<PaperOrder>>;
  findOrdersBySymbol(symbol: string): Promise<RepositoryResult<PaperOrder[]>>;
  findPendingOrders(): Promise<RepositoryResult<PaperOrder[]>>;
  updateOrderStatus(orderId: string, status: PaperOrder["status"]): Promise<RepositoryResult<PaperOrder>>;

  // Positions
  savePosition(position: PaperPosition): Promise<RepositoryResult<PaperPosition>>;
  findPosition(symbol: string): Promise<RepositoryResult<PaperPosition | null>>;
  findAllPositions(): Promise<RepositoryResult<PaperPosition[]>>;
  closePosition(symbol: string): Promise<RepositoryResult<PaperPosition>>;

  // Journal
  saveJournalEntry(entry: TradeJournalEntry): Promise<RepositoryResult<TradeJournalEntry>>;
  findJournalEntries(query?: Query<TradeJournalEntry>): Promise<RepositoryResult<TradeJournalEntry[]>>;
  getJournalStats(): Promise<RepositoryResult<{ totalTrades: number; winRate: number; totalPnL: number }>>;
}

/**
 * Portfolio Repository - manages portfolio state
 */
export interface PortfolioRepository extends Repository<Portfolio> {
  getCurrent(): Promise<RepositoryResult<Portfolio>>;
  updateValue(value: string): Promise<RepositoryResult<Portfolio>>;
  updateCash(cash: string): Promise<RepositoryResult<Portfolio>>;
  addPosition(position: Position): Promise<RepositoryResult<Portfolio>>;
  removePosition(symbol: string): Promise<RepositoryResult<Portfolio>>;
  updateAllocation(allocation: { label: string; value: string }[]): Promise<RepositoryResult<Portfolio>>;
  getEquityCurve(): Promise<RepositoryResult<number[]>>;
  appendEquityPoint(value: number): Promise<RepositoryResult<void>>;
}

/**
 * Analytics Repository - manages analytics data
 */
export interface AnalyticsRepository extends Repository<AnalyticsGroup> {
  findByTitle(title: string): Promise<RepositoryResult<AnalyticsGroup | null>>;
  getAllGroups(): Promise<RepositoryResult<AnalyticsGroup[]>>;
  updateMetric(groupId: string, metricId: string, value: string): Promise<RepositoryResult<AnalyticsGroup>>;
  getMetricHistory(metricId: string, from?: string, to?: string): Promise<RepositoryResult<{ timestamp: string; value: string }[]>>;
}

/**
 * AI Repository - manages AI brain state
 */
export interface AIRepository extends Repository<AIBrain> {
  getCurrentBrain(): Promise<RepositoryResult<AIBrain>>;
  updateConfidence(confidence: number): Promise<RepositoryResult<AIBrain>>;
  updateLoopStatus(loopId: string, status: "Running" | "Queued" | "Locked"): Promise<RepositoryResult<AIBrain>>;
  recordDecision(decision: { type: string; confidence: number; reasoning: string }): Promise<RepositoryResult<void>>;
  getDecisionHistory(limit?: number): Promise<RepositoryResult<{ type: string; confidence: number; reasoning: string; timestamp: string }[]>>;
  appendConfidencePoint(value: number): Promise<RepositoryResult<void>>;
}

/**
 * Event Repository - manages event history
 */
export interface EventRepository {
  save(event: OmegaEvent): Promise<RepositoryResult<OmegaEvent>>;
  findById(id: string): Promise<RepositoryResult<OmegaEvent>>;
  findByType(type: OmegaEvent["type"]): Promise<RepositoryResult<OmegaEvent[]>>;
  findByTimeRange(from: string, to: string): Promise<RepositoryResult<OmegaEvent[]>>;
  getRecent(limit: number): Promise<RepositoryResult<OmegaEvent[]>>;
  count(): Promise<number>;
}

/**
 * Market Repository - manages market data
 */
export interface MarketRepository extends Repository<MarketAsset> {
  findBySymbol(symbol: string): Promise<RepositoryResult<MarketAsset | null>>;
  findByGroup(group: string): Promise<RepositoryResult<MarketAsset[]>>;
  findBySignal(signal: MarketAsset["signal"]): Promise<RepositoryResult<MarketAsset[]>>;
  updatePrice(symbol: string, price: string, change: number): Promise<RepositoryResult<MarketAsset>>;
  getTopGainers(limit: number): Promise<RepositoryResult<MarketAsset[]>>;
  getTopLosers(limit: number): Promise<RepositoryResult<MarketAsset[]>>;
}

/**
 * News Repository - manages news events
 */
export interface NewsRepository extends Repository<NewsEvent> {
  findBySource(source: string): Promise<RepositoryResult<NewsEvent[]>>;
  findByImpact(impact: NewsEvent["impact"]): Promise<RepositoryResult<NewsEvent[]>>;
  findRecent(limit: number): Promise<RepositoryResult<NewsEvent[]>>;
  search(query: string): Promise<RepositoryResult<NewsEvent[]>>;
}

/**
 * TradingView Repository - manages TradingView testing data
 * TradingView remains optional - OMEGA functions without it
 */
export interface TradingViewRepository {
  // Connection state
  saveConnectionState(connected: boolean): Promise<RepositoryResult<void>>;
  getConnectionState(): Promise<RepositoryResult<boolean>>;

  // Chart state
  saveChartState(symbol: string, timeframe: string): Promise<RepositoryResult<void>>;
  getChartState(): Promise<RepositoryResult<{ symbol: string; timeframe: string } | null>>;

  // Watchlist
  saveWatchlist(symbols: string[]): Promise<RepositoryResult<void>>;
  getWatchlist(): Promise<RepositoryResult<string[]>>;
  addToWatchlist(symbol: string): Promise<RepositoryResult<void>>;
  removeFromWatchlist(symbol: string): Promise<RepositoryResult<void>>;

  // Signal comparisons
  saveComparison(comparison: {
    signalId: string;
    omegaSignal: string;
    tvSignal: string;
    aligned: boolean;
    notes?: string;
  }): Promise<RepositoryResult<void>>;
  getComparisons(): Promise<RepositoryResult<{
    signalId: string;
    omegaSignal: string;
    tvSignal: string;
    aligned: boolean;
    notes?: string;
  }[]>>;
  getAlignmentRate(): Promise<RepositoryResult<number>>;
}
