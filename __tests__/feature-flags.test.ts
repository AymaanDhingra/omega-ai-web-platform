import { describe, it, expect } from "vitest";
import {
  FEATURE_FLAGS,
  isFeatureEnabled,
  getFeatureFlagState,
  isTradingViewEnabled,
  isPersistenceEnabled,
  isCacheEnabled,
  isSessionsEnabled
} from "../lib/feature-flags";

describe("Feature Flags", () => {
  describe("FEATURE_FLAGS", () => {
    it("should have all core modules enabled", () => {
      expect(FEATURE_FLAGS.ENABLE_MARKETS).toBe(true);
      expect(FEATURE_FLAGS.ENABLE_AI).toBe(true);
      expect(FEATURE_FLAGS.ENABLE_KNOWLEDGE).toBe(true);
      expect(FEATURE_FLAGS.ENABLE_STRATEGIES).toBe(true);
      expect(FEATURE_FLAGS.ENABLE_BACKTEST).toBe(true);
      expect(FEATURE_FLAGS.ENABLE_PAPER).toBe(true);
      expect(FEATURE_FLAGS.ENABLE_PORTFOLIO).toBe(true);
      expect(FEATURE_FLAGS.ENABLE_TRADES).toBe(true);
      expect(FEATURE_FLAGS.ENABLE_ANALYTICS).toBe(true);
      expect(FEATURE_FLAGS.ENABLE_CHAT).toBe(true);
      expect(FEATURE_FLAGS.ENABLE_NEWS).toBe(true);
      expect(FEATURE_FLAGS.ENABLE_ADMIN).toBe(true);
      expect(FEATURE_FLAGS.ENABLE_SETTINGS).toBe(true);
    });

    it("should have TradingView flags disabled by default", () => {
      // CRITICAL: TradingView is OPTIONAL - OMEGA functions without it
      expect(FEATURE_FLAGS.ENABLE_TRADINGVIEW_CHARTS).toBe(false);
      expect(FEATURE_FLAGS.ENABLE_TRADINGVIEW_WATCHLISTS).toBe(false);
      expect(FEATURE_FLAGS.ENABLE_TRADINGVIEW_VALIDATION).toBe(false);
    });

    it("should have persistence flags enabled", () => {
      expect(FEATURE_FLAGS.ENABLE_PERSISTENCE).toBe(true);
      expect(FEATURE_FLAGS.ENABLE_CACHE).toBe(true);
      expect(FEATURE_FLAGS.ENABLE_SESSIONS).toBe(true);
    });

    it("should expose the current canonical feature flag set", () => {
      expect(Object.keys(FEATURE_FLAGS)).toHaveLength(22);
    });
  });

  describe("isFeatureEnabled", () => {
    it("should return correct state for enabled features", () => {
      expect(isFeatureEnabled("ENABLE_MARKETS")).toBe(true);
      expect(isFeatureEnabled("ENABLE_AI")).toBe(true);
    });

    it("should return correct state for disabled features", () => {
      expect(isFeatureEnabled("ENABLE_TRADINGVIEW_CHARTS")).toBe(false);
    });
  });

  describe("getFeatureFlagState", () => {
    it("should return a copy of all flags", () => {
      const state = getFeatureFlagState();
      expect(state).toEqual(FEATURE_FLAGS);
      expect(state).not.toBe(FEATURE_FLAGS); // Should be a copy
    });
  });

  describe("isTradingViewEnabled", () => {
    it("should return false when all TradingView flags are disabled", () => {
      // With default flags, TradingView should be disabled
      expect(isTradingViewEnabled()).toBe(false);
    });
  });

  describe("isPersistenceEnabled", () => {
    it("should return true when persistence is enabled", () => {
      expect(isPersistenceEnabled()).toBe(true);
    });
  });

  describe("isCacheEnabled", () => {
    it("should return true when cache is enabled", () => {
      expect(isCacheEnabled()).toBe(true);
    });
  });

  describe("isSessionsEnabled", () => {
    it("should return true when sessions are enabled", () => {
      expect(isSessionsEnabled()).toBe(true);
    });
  });
});
