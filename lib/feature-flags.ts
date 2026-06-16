import type { FeatureFlagName } from "./types";

/**
 * Feature Flags Configuration
 * 
 * Controls which features are enabled in OMEGA.
 * 
 * CRITICAL: TradingView flags default to FALSE.
 * OMEGA must function completely without TradingView.
 * 
 * OMEGA Constitution: TradingView remains optional.
 */
export const FEATURE_FLAGS: Record<FeatureFlagName, boolean> = {
  // Core module flags - all enabled
  ENABLE_MARKETS: true,
  ENABLE_AI: true,
  ENABLE_KNOWLEDGE: true,
  ENABLE_STRATEGIES: true,
  ENABLE_BACKTEST: true,
  ENABLE_PAPER: true,
  ENABLE_PORTFOLIO: true,
  ENABLE_TRADES: true,
  ENABLE_ANALYTICS: true,
  ENABLE_CHAT: true,
  ENABLE_NEWS: true,
  ENABLE_ADMIN: true,
  ENABLE_SETTINGS: true,

  /**
   * ENABLE_TRADINGVIEW — umbrella flag for all TradingView integration.
   * Gates the mock-only TradingView Foundation module and any future
   * TradingView provider contracts. Defaults to false; OMEGA functions
   * completely without TradingView.
   */
  ENABLE_TRADINGVIEW: false,

  // TradingView granular flags - OPTIONAL, default to false
  // Preserved for backward compatibility with existing callers.
  // OMEGA functions completely without TradingView.
  ENABLE_TRADINGVIEW_CHARTS: false,
  ENABLE_TRADINGVIEW_WATCHLISTS: false,
  ENABLE_TRADINGVIEW_VALIDATION: false,

  // Persistence flags - enabled for Phase 7
  ENABLE_PERSISTENCE: true,
  ENABLE_CACHE: true,
  ENABLE_SESSIONS: true,

  /**
   * ENABLE_REPOSITORIES — gates the domain-specific Repository<T> contract
   * layer in lib/persistence/repositories.ts. Mock-only contract layer;
   * no real database is connected.
   */
  ENABLE_REPOSITORIES: true,

  /**
   * ENABLE_HISTORY — gates the domain-specific history/audit-trail models
   * in lib/persistence/history.ts. Mock-only contract layer.
   */
  ENABLE_HISTORY: true,

  /**
   * ENABLE_SNAPSHOTS — gates the domain-specific snapshot contracts in
   * lib/persistence/snapshots.ts. Mock-only contract layer.
   */
  ENABLE_SNAPSHOTS: true,

  /**
   * ENABLE_PAPER_LIFECYCLE — gates the paper trading lifecycle event pipeline
   * (order created → filled → position opened → closed → journal entry → performance update).
   * Mock-only contract layer; no real execution engine is connected.
   */
  ENABLE_PAPER_LIFECYCLE: true,

  /**
   * ENABLE_SIGNAL_FLOW — gates the SignalFlowOrchestrator pipeline
   * (market analysis → AI analysis → signal generation → validation → order creation).
   * Mock-only contract layer; no real AI or broker is connected.
   */
  ENABLE_SIGNAL_FLOW: true,

  /**
   * ENABLE_PAPER_ANALYTICS — gates the extended paper trading analytics models
   * (Sharpe, Sortino, Calmar, profit factor, average duration, best/worst trade).
   * Mock-only contract layer.
   */
  ENABLE_PAPER_ANALYTICS: true,
};

export function isFeatureEnabled(flag: FeatureFlagName): boolean {
  return FEATURE_FLAGS[flag];
}

export function getFeatureFlagState(): Record<FeatureFlagName, boolean> {
  return { ...FEATURE_FLAGS };
}

/**
 * Check if TradingView integration is available.
 * Returns true when the umbrella flag OR any granular TradingView flag is enabled.
 * Backward-compatible: existing callers that relied on the granular flags continue
 * to work unchanged.
 */
export function isTradingViewEnabled(): boolean {
  return (
    FEATURE_FLAGS.ENABLE_TRADINGVIEW ||
    FEATURE_FLAGS.ENABLE_TRADINGVIEW_CHARTS ||
    FEATURE_FLAGS.ENABLE_TRADINGVIEW_WATCHLISTS ||
    FEATURE_FLAGS.ENABLE_TRADINGVIEW_VALIDATION
  );
}

/**
 * Check if persistence layer is available
 */
export function isPersistenceEnabled(): boolean {
  return FEATURE_FLAGS.ENABLE_PERSISTENCE;
}

/**
 * Check if caching is available
 */
export function isCacheEnabled(): boolean {
  return FEATURE_FLAGS.ENABLE_CACHE;
}

/**
 * Check if sessions are available
 */
export function isSessionsEnabled(): boolean {
  return FEATURE_FLAGS.ENABLE_SESSIONS;
}

/**
 * Check if the domain-specific Repository<T> contract layer is available.
 * Gates lib/persistence/repositories.ts — mock-only contract layer.
 */
export function isRepositoriesEnabled(): boolean {
  return FEATURE_FLAGS.ENABLE_REPOSITORIES;
}

/**
 * Check if the domain-specific history/audit-trail models are available.
 * Gates lib/persistence/history.ts — mock-only contract layer.
 */
export function isHistoryEnabled(): boolean {
  return FEATURE_FLAGS.ENABLE_HISTORY;
}

/**
 * Check if the domain-specific snapshot contracts are available.
 * Gates lib/persistence/snapshots.ts — mock-only contract layer.
 */
export function isSnapshotsEnabled(): boolean {
  return FEATURE_FLAGS.ENABLE_SNAPSHOTS;
}

/**
 * Check if the paper trading lifecycle event pipeline is available.
 * Gates order-created → filled → position-opened → closed → journal → performance events.
 */
export function isPaperLifecycleEnabled(): boolean {
  return FEATURE_FLAGS.ENABLE_PAPER_LIFECYCLE;
}

/**
 * Check if the SignalFlowOrchestrator pipeline is available.
 * Gates market-analysis → AI-analysis → signal-generation → validation → order-creation.
 */
export function isSignalFlowEnabled(): boolean {
  return FEATURE_FLAGS.ENABLE_SIGNAL_FLOW;
}

/**
 * Check if extended paper trading analytics models are available.
 * Gates Sharpe, Sortino, Calmar, profit factor, average duration, best/worst trade.
 */
export function isPaperAnalyticsEnabled(): boolean {
  return FEATURE_FLAGS.ENABLE_PAPER_ANALYTICS;
}

/**
 * Test-only: override a single feature flag value.
 * MUST be used inside a try/finally block to restore state.
 * Never call this in production code.
 *
 * @example
 * __setFeatureFlagForTest("ENABLE_TRADINGVIEW", true);
 * try { ... } finally { __setFeatureFlagForTest("ENABLE_TRADINGVIEW", false); }
 */
export function __setFeatureFlagForTest(flag: FeatureFlagName, value: boolean): void {
  FEATURE_FLAGS[flag] = value;
}
