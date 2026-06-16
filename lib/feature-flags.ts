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
  
  // TradingView flags - OPTIONAL, default to false
  // OMEGA functions completely without TradingView
  ENABLE_TRADINGVIEW_CHARTS: false,
  ENABLE_TRADINGVIEW_WATCHLISTS: false,
  ENABLE_TRADINGVIEW_VALIDATION: false,
  
  // Market intelligence flags - mock enabled
  ENABLE_MARKET_INTELLIGENCE: true,
  ENABLE_MARKET_ANALYSIS: true,
  ENABLE_MARKET_INSIGHTS: true,
  
  // Persistence flags - enabled for Phase 7
  ENABLE_PERSISTENCE: true,
  ENABLE_CACHE: true,
  ENABLE_SESSIONS: true
};

export function isFeatureEnabled(flag: FeatureFlagName): boolean {
  return FEATURE_FLAGS[flag];
}

export function getFeatureFlagState(): Record<FeatureFlagName, boolean> {
  return { ...FEATURE_FLAGS };
}

/**
 * Check if TradingView integration is available
 * Returns true only if at least one TradingView feature is enabled
 */
export function isTradingViewEnabled(): boolean {
  return (
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
