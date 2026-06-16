import type { FeatureFlagName } from "./types";

export const FEATURE_FLAGS: Record<FeatureFlagName, boolean> = {
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
  ENABLE_SETTINGS: true
};

export function isFeatureEnabled(flag: FeatureFlagName) {
  return FEATURE_FLAGS[flag];
}

export function getFeatureFlagState() {
  return FEATURE_FLAGS;
}
