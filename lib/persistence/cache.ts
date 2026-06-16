/**
 * Cache Abstractions
 * 
 * Caching layer for frequently accessed data.
 * Reduces load on data sources and improves response times.
 * 
 * OMEGA Constitution: Mock implementations are the source of truth.
 */

import type { MarketAsset, Portfolio, TradeSignal, AIBrain, AnalyticsGroup, KnowledgeDocument } from "../types";

/**
 * Generic Cache Interface
 */
export interface Cache<T> {
  get(key: string): Promise<T | null>;
  set(key: string, value: T, ttlSeconds?: number): Promise<void>;
  delete(key: string): Promise<boolean>;
  has(key: string): Promise<boolean>;
  clear(): Promise<void>;
  keys(): Promise<string[]>;
  size(): Promise<number>;
  getMany(keys: string[]): Promise<Map<string, T>>;
  setMany(entries: Map<string, T>, ttlSeconds?: number): Promise<void>;
}

/**
 * Cache Entry with metadata
 */
export interface CacheEntry<T> {
  key: string;
  value: T;
  createdAt: string;
  expiresAt?: string;
  ttlSeconds?: number;
  hits: number;
  lastAccessedAt: string;
}

/**
 * Cache Statistics
 */
export interface CacheStats {
  hits: number;
  misses: number;
  hitRate: number;
  size: number;
  maxSize: number;
  evictions: number;
  oldestEntry?: string;
  newestEntry?: string;
}

/**
 * Market Cache - caches market data for quick access
 */
export interface MarketCache extends Cache<MarketAsset> {
  getBySymbol(symbol: string): Promise<MarketAsset | null>;
  getByGroup(group: string): Promise<MarketAsset[]>;
  getTopMovers(limit: number): Promise<{ gainers: MarketAsset[]; losers: MarketAsset[] }>;
  invalidateSymbol(symbol: string): Promise<void>;
  invalidateGroup(group: string): Promise<void>;
  getLastUpdate(): Promise<string | null>;
}

/**
 * Portfolio Cache - caches portfolio state
 */
export interface PortfolioCache extends Cache<Portfolio> {
  getCurrentPortfolio(): Promise<Portfolio | null>;
  getPositionValue(symbol: string): Promise<number | null>;
  getTotalValue(): Promise<number | null>;
  getCashBalance(): Promise<number | null>;
  invalidatePositions(): Promise<void>;
  getEquityCurve(): Promise<number[] | null>;
}

/**
 * Knowledge Cache - caches knowledge base queries
 */
export interface KnowledgeCache extends Cache<KnowledgeDocument[]> {
  getDocument(documentId: string): Promise<KnowledgeDocument | null>;
  getByType(type: string): Promise<KnowledgeDocument[]>;
  getByStatus(status: string): Promise<KnowledgeDocument[]>;
  cacheQueryResult(query: string, results: KnowledgeDocument[]): Promise<void>;
  getQueryResult(query: string): Promise<KnowledgeDocument[] | null>;
  invalidateDocument(documentId: string): Promise<void>;
}

/**
 * Analytics Cache - caches analytics computations
 */
export interface AnalyticsCache extends Cache<AnalyticsGroup> {
  getMetric(metricId: string): Promise<{ value: string; tone: string } | null>;
  getGroupMetrics(groupId: string): Promise<AnalyticsGroup | null>;
  getAllGroups(): Promise<AnalyticsGroup[]>;
  invalidateMetric(metricId: string): Promise<void>;
  invalidateGroup(groupId: string): Promise<void>;
  getComputedAt(): Promise<string | null>;
}

/**
 * AI State Cache - caches AI brain state
 */
export interface AIStateCache extends Cache<AIBrain> {
  getCurrentBrain(): Promise<AIBrain | null>;
  getConfidence(): Promise<number | null>;
  getActiveLoops(): Promise<string[]>;
  getDecisionHistory(limit: number): Promise<{ type: string; confidence: number; timestamp: string }[]>;
  invalidateBrain(): Promise<void>;
  cacheDecision(decision: { type: string; confidence: number; reasoning: string }): Promise<void>;
}

/**
 * Signal Cache - caches trade signals
 */
export interface SignalCache extends Cache<TradeSignal> {
  getActiveSignals(): Promise<TradeSignal[]>;
  getBySymbol(symbol: string): Promise<TradeSignal[]>;
  getByDirection(direction: "Long" | "Short"): Promise<TradeSignal[]>;
  getHighConfidence(minConfidence: number): Promise<TradeSignal[]>;
  invalidateSignal(signalId: string): Promise<void>;
  invalidateBySymbol(symbol: string): Promise<void>;
  getSignalCount(): Promise<number>;
}

/**
 * Mock Cache Implementation
 */
export class MockCache<T> implements Cache<T> {
  protected store: Map<string, CacheEntry<T>> = new Map();
  protected stats: CacheStats = {
    hits: 0,
    misses: 0,
    hitRate: 0,
    size: 0,
    maxSize: 1000,
    evictions: 0
  };

  async get(key: string): Promise<T | null> {
    const entry = this.store.get(key);
    if (!entry) {
      this.stats.misses++;
      this.updateHitRate();
      return null;
    }
    if (entry.expiresAt && new Date(entry.expiresAt) < new Date()) {
      this.store.delete(key);
      this.stats.misses++;
      this.updateHitRate();
      return null;
    }
    entry.hits++;
    entry.lastAccessedAt = new Date().toISOString();
    this.stats.hits++;
    this.updateHitRate();
    return entry.value;
  }

  async set(key: string, value: T, ttlSeconds?: number): Promise<void> {
    const now = new Date();
    const entry: CacheEntry<T> = {
      key,
      value,
      createdAt: now.toISOString(),
      expiresAt: ttlSeconds ? new Date(now.getTime() + ttlSeconds * 1000).toISOString() : undefined,
      ttlSeconds,
      hits: 0,
      lastAccessedAt: now.toISOString()
    };
    this.store.set(key, entry);
    this.stats.size = this.store.size;
  }

  async delete(key: string): Promise<boolean> {
    const result = this.store.delete(key);
    this.stats.size = this.store.size;
    return result;
  }

  async has(key: string): Promise<boolean> {
    return this.store.has(key);
  }

  async clear(): Promise<void> {
    this.store.clear();
    this.stats.size = 0;
  }

  async keys(): Promise<string[]> {
    return Array.from(this.store.keys());
  }

  async size(): Promise<number> {
    return this.store.size;
  }

  async getMany(keys: string[]): Promise<Map<string, T>> {
    const result = new Map<string, T>();
    for (const key of keys) {
      const value = await this.get(key);
      if (value !== null) {
        result.set(key, value);
      }
    }
    return result;
  }

  async setMany(entries: Map<string, T>, ttlSeconds?: number): Promise<void> {
    for (const [key, value] of entries) {
      await this.set(key, value, ttlSeconds);
    }
  }

  getStats(): CacheStats {
    return { ...this.stats };
  }

  private updateHitRate(): void {
    const total = this.stats.hits + this.stats.misses;
    this.stats.hitRate = total > 0 ? this.stats.hits / total : 0;
  }
}
