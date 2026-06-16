/**
 * Feature Flags Tests
 *
 * Uses node:test (tsx --test) to match the project's existing test runner.
 * Previously used vitest; converted in Phase 7 Completion Pass to run in CI.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  FEATURE_FLAGS,
  isFeatureEnabled,
  getFeatureFlagState,
  isTradingViewEnabled,
  isPersistenceEnabled,
  isCacheEnabled,
  isSessionsEnabled,
  isRepositoriesEnabled,
  isHistoryEnabled,
  isSnapshotsEnabled,
  __setFeatureFlagForTest
} from "../lib/feature-flags";

describe("Feature Flags", () => {
  describe("FEATURE_FLAGS", () => {
    it("should have all core modules enabled", () => {
      assert.equal(FEATURE_FLAGS.ENABLE_MARKETS, true);
      assert.equal(FEATURE_FLAGS.ENABLE_AI, true);
      assert.equal(FEATURE_FLAGS.ENABLE_KNOWLEDGE, true);
      assert.equal(FEATURE_FLAGS.ENABLE_STRATEGIES, true);
      assert.equal(FEATURE_FLAGS.ENABLE_BACKTEST, true);
      assert.equal(FEATURE_FLAGS.ENABLE_PAPER, true);
      assert.equal(FEATURE_FLAGS.ENABLE_PORTFOLIO, true);
      assert.equal(FEATURE_FLAGS.ENABLE_TRADES, true);
      assert.equal(FEATURE_FLAGS.ENABLE_ANALYTICS, true);
      assert.equal(FEATURE_FLAGS.ENABLE_CHAT, true);
      assert.equal(FEATURE_FLAGS.ENABLE_NEWS, true);
      assert.equal(FEATURE_FLAGS.ENABLE_ADMIN, true);
      assert.equal(FEATURE_FLAGS.ENABLE_SETTINGS, true);
    });

    it("should have TradingView flags disabled by default", () => {
      // CRITICAL: TradingView is OPTIONAL - OMEGA functions without it
      assert.equal(FEATURE_FLAGS.ENABLE_TRADINGVIEW, false);
      assert.equal(FEATURE_FLAGS.ENABLE_TRADINGVIEW_CHARTS, false);
      assert.equal(FEATURE_FLAGS.ENABLE_TRADINGVIEW_WATCHLISTS, false);
      assert.equal(FEATURE_FLAGS.ENABLE_TRADINGVIEW_VALIDATION, false);
    });

    it("should have persistence flags enabled", () => {
      assert.equal(FEATURE_FLAGS.ENABLE_PERSISTENCE, true);
      assert.equal(FEATURE_FLAGS.ENABLE_CACHE, true);
      assert.equal(FEATURE_FLAGS.ENABLE_SESSIONS, true);
    });

    it("should have new persistence sub-layer flags enabled", () => {
      assert.equal(FEATURE_FLAGS.ENABLE_REPOSITORIES, true);
      assert.equal(FEATURE_FLAGS.ENABLE_HISTORY, true);
      assert.equal(FEATURE_FLAGS.ENABLE_SNAPSHOTS, true);
    });
  });

  describe("isFeatureEnabled", () => {
    it("should return correct state for enabled features", () => {
      assert.equal(isFeatureEnabled("ENABLE_MARKETS"), true);
      assert.equal(isFeatureEnabled("ENABLE_AI"), true);
    });

    it("should return correct state for disabled features", () => {
      assert.equal(isFeatureEnabled("ENABLE_TRADINGVIEW_CHARTS"), false);
      assert.equal(isFeatureEnabled("ENABLE_TRADINGVIEW"), false);
    });
  });

  describe("getFeatureFlagState", () => {
    it("should return a copy of all flags", () => {
      const state = getFeatureFlagState();
      assert.deepEqual(state, FEATURE_FLAGS);
      assert.notEqual(state, FEATURE_FLAGS); // Should be a copy
    });

    it("should include all 23 flags (13 core + 4 TradingView + 3 persistence + 3 sub-layer)", () => {
      const state = getFeatureFlagState();
      assert.equal(Object.keys(state).length, 23);
    });
  });

  describe("isTradingViewEnabled", () => {
    it("should return false when all TradingView flags are disabled", () => {
      // With default flags, TradingView should be disabled
      assert.equal(isTradingViewEnabled(), false);
    });

    it("should return true when umbrella ENABLE_TRADINGVIEW flag is set", () => {
      __setFeatureFlagForTest("ENABLE_TRADINGVIEW", true);
      try {
        assert.equal(isTradingViewEnabled(), true);
      } finally {
        __setFeatureFlagForTest("ENABLE_TRADINGVIEW", false);
      }
    });

    it("should return true when ENABLE_TRADINGVIEW_CHARTS is set (backward compat)", () => {
      __setFeatureFlagForTest("ENABLE_TRADINGVIEW_CHARTS", true);
      try {
        assert.equal(isTradingViewEnabled(), true);
      } finally {
        __setFeatureFlagForTest("ENABLE_TRADINGVIEW_CHARTS", false);
      }
    });

    it("should return true when ENABLE_TRADINGVIEW_WATCHLISTS is set (backward compat)", () => {
      __setFeatureFlagForTest("ENABLE_TRADINGVIEW_WATCHLISTS", true);
      try {
        assert.equal(isTradingViewEnabled(), true);
      } finally {
        __setFeatureFlagForTest("ENABLE_TRADINGVIEW_WATCHLISTS", false);
      }
    });

    it("should return true when ENABLE_TRADINGVIEW_VALIDATION is set (backward compat)", () => {
      __setFeatureFlagForTest("ENABLE_TRADINGVIEW_VALIDATION", true);
      try {
        assert.equal(isTradingViewEnabled(), true);
      } finally {
        __setFeatureFlagForTest("ENABLE_TRADINGVIEW_VALIDATION", false);
      }
    });
  });

  describe("isPersistenceEnabled", () => {
    it("should return true when persistence is enabled", () => {
      assert.equal(isPersistenceEnabled(), true);
    });
  });

  describe("isCacheEnabled", () => {
    it("should return true when cache is enabled", () => {
      assert.equal(isCacheEnabled(), true);
    });
  });

  describe("isSessionsEnabled", () => {
    it("should return true when sessions are enabled", () => {
      assert.equal(isSessionsEnabled(), true);
    });
  });

  describe("isRepositoriesEnabled (new in Phase 7 Completion Pass)", () => {
    it("should return true by default", () => {
      assert.equal(isRepositoriesEnabled(), true);
    });

    it("should reflect flag changes via __setFeatureFlagForTest", () => {
      __setFeatureFlagForTest("ENABLE_REPOSITORIES", false);
      try {
        assert.equal(isRepositoriesEnabled(), false);
      } finally {
        __setFeatureFlagForTest("ENABLE_REPOSITORIES", true);
      }
    });
  });

  describe("isHistoryEnabled (new in Phase 7 Completion Pass)", () => {
    it("should return true by default", () => {
      assert.equal(isHistoryEnabled(), true);
    });

    it("should reflect flag changes via __setFeatureFlagForTest", () => {
      __setFeatureFlagForTest("ENABLE_HISTORY", false);
      try {
        assert.equal(isHistoryEnabled(), false);
      } finally {
        __setFeatureFlagForTest("ENABLE_HISTORY", true);
      }
    });
  });

  describe("isSnapshotsEnabled (new in Phase 7 Completion Pass)", () => {
    it("should return true by default", () => {
      assert.equal(isSnapshotsEnabled(), true);
    });

    it("should reflect flag changes via __setFeatureFlagForTest", () => {
      __setFeatureFlagForTest("ENABLE_SNAPSHOTS", false);
      try {
        assert.equal(isSnapshotsEnabled(), false);
      } finally {
        __setFeatureFlagForTest("ENABLE_SNAPSHOTS", true);
      }
    });
  });

  describe("__setFeatureFlagForTest", () => {
    it("should restore state after try/finally", () => {
      const before = FEATURE_FLAGS.ENABLE_TRADINGVIEW;
      __setFeatureFlagForTest("ENABLE_TRADINGVIEW", !before);
      try {
        assert.equal(FEATURE_FLAGS.ENABLE_TRADINGVIEW, !before);
      } finally {
        __setFeatureFlagForTest("ENABLE_TRADINGVIEW", before);
      }
      assert.equal(FEATURE_FLAGS.ENABLE_TRADINGVIEW, before);
    });
  });
});
