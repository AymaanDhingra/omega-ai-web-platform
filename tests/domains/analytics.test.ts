/**
 * Analytics Domain Tests
 */

import { describe, it, expect } from "vitest";
import * as AnalyticsDomain from "../../lib/domains/analytics";

describe("Analytics Domain", () => {
  it("should export all analytics types", () => {
    expect(AnalyticsDomain).toBeDefined();
  });

  it("should have Period enum", () => {
    expect(AnalyticsDomain.PeriodEnum).toBeDefined();
    expect(AnalyticsDomain.PeriodEnum.ONE_DAY).toBe("1d");
    expect(AnalyticsDomain.PeriodEnum.ONE_YEAR).toBe("1y");
  });

  it("should have Trend enum", () => {
    expect(AnalyticsDomain.TrendEnum).toBeDefined();
    expect(AnalyticsDomain.TrendEnum.UP).toBe("up");
    expect(AnalyticsDomain.TrendEnum.DOWN).toBe("down");
  });

  it("should have Sentiment enum", () => {
    expect(AnalyticsDomain.SentimentEnum).toBeDefined();
    expect(AnalyticsDomain.SentimentEnum.BULLISH).toBe("bullish");
    expect(AnalyticsDomain.SentimentEnum.BEARISH).toBe("bearish");
  });
});
