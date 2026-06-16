/**
 * TradingView Testing Domain Tests
 */

import { describe, it, expect } from "vitest";
import * as TradingViewDomain from "../../lib/domains/tradingview";

describe("TradingView Domain", () => {
  it("should export all TradingView types", () => {
    expect(TradingViewDomain).toBeDefined();
  });

  it("should have TVAlertStatus enum", () => {
    expect(TradingViewDomain.TVAlertStatusEnum).toBeDefined();
    expect(TradingViewDomain.TVAlertStatusEnum.RECEIVED).toBe("received");
    expect(TradingViewDomain.TVAlertStatusEnum.VALIDATED).toBe("validated");
  });

  it("should have TVSignalStatus enum", () => {
    expect(TradingViewDomain.TVSignalStatusEnum).toBeDefined();
    expect(TradingViewDomain.TVSignalStatusEnum.GENERATED).toBe("generated");
    expect(TradingViewDomain.TVSignalStatusEnum.MATCHED).toBe("matched");
  });
});
