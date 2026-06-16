/**
 * Strategy Domain Tests
 */

import { describe, it, expect } from "vitest";
import * as StrategyDomain from "../../lib/domains/strategy";

describe("Strategy Domain", () => {
  it("should export all strategy types", () => {
    expect(StrategyDomain).toBeDefined();
  });

  it("should have StrategyState enum", () => {
    expect(StrategyDomain.StrategyStateEnum).toBeDefined();
    expect(StrategyDomain.StrategyStateEnum.DRAFT).toBe("draft");
    expect(StrategyDomain.StrategyStateEnum.ACTIVE).toBe("active");
  });

  it("should have IndicatorType enum", () => {
    expect(StrategyDomain.IndicatorTypeEnum).toBeDefined();
    expect(StrategyDomain.IndicatorTypeEnum.SMA).toBe("sma");
    expect(StrategyDomain.IndicatorTypeEnum.RSI).toBe("rsi");
  });

  it("should have ConditionOperator enum", () => {
    expect(StrategyDomain.ConditionOperatorEnum).toBeDefined();
    expect(StrategyDomain.ConditionOperatorEnum.GT).toBe("gt");
    expect(StrategyDomain.ConditionOperatorEnum.LT).toBe("lt");
  });

  it("should have Period enum", () => {
    expect(StrategyDomain.PeriodEnum).toBeDefined();
    expect(StrategyDomain.PeriodEnum.ONE_DAY).toBe("1d");
    expect(StrategyDomain.PeriodEnum.ONE_YEAR).toBe("1y");
  });
});
