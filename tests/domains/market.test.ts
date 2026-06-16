/**
 * Market Domain Tests
 */

import { describe, it, expect } from "vitest";
import * as MarketDomain from "../../lib/domains/market";

describe("Market Domain", () => {
  it("should export all market types", () => {
    expect(MarketDomain).toBeDefined();
  });

  it("should have MarketType enum", () => {
    expect(MarketDomain.MarketTypeEnum).toBeDefined();
    expect(MarketDomain.MarketTypeEnum.EQUITY).toBe("equity");
    expect(MarketDomain.MarketTypeEnum.CRYPTO).toBe("crypto");
  });

  it("should have ExchangeType enum", () => {
    expect(MarketDomain.ExchangeTypeEnum).toBeDefined();
    expect(MarketDomain.ExchangeTypeEnum.NYSE).toBe("nyse");
    expect(MarketDomain.ExchangeTypeEnum.NASDAQ).toBe("nasdaq");
  });

  it("should have TradingSessionStatus enum", () => {
    expect(MarketDomain.TradingSessionStatusEnum).toBeDefined();
    expect(MarketDomain.TradingSessionStatusEnum.PRE_MARKET).toBe("pre-market");
    expect(MarketDomain.TradingSessionStatusEnum.OPEN).toBe("open");
  });

  it("should have MarketRegimeType enum", () => {
    expect(MarketDomain.MarketRegimeTypeEnum).toBeDefined();
    expect(MarketDomain.MarketRegimeTypeEnum.TRENDING_UP).toBe("trending-up");
    expect(MarketDomain.MarketRegimeTypeEnum.TRENDING_DOWN).toBe("trending-down");
  });

  it("should have LiquidityLevel enum", () => {
    expect(MarketDomain.LiquidityLevelEnum).toBeDefined();
    expect(MarketDomain.LiquidityLevelEnum.HIGH).toBe("high");
    expect(MarketDomain.LiquidityLevelEnum.LOW).toBe("low");
  });

  it("should have VolatilityLevel enum", () => {
    expect(MarketDomain.VolatilityLevelEnum).toBeDefined();
    expect(MarketDomain.VolatilityLevelEnum.LOW).toBe("low");
    expect(MarketDomain.VolatilityLevelEnum.HIGH).toBe("high");
  });
});
