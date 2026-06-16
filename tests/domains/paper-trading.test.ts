/**
 * Paper Trading Domain Tests
 */

import { describe, it, expect } from "vitest";
import * as PaperTradingDomain from "../../lib/domains/paper-trading";

describe("Paper Trading Domain", () => {
  it("should export all paper trading types", () => {
    expect(PaperTradingDomain).toBeDefined();
  });

  it("should have PaperTradingStatus enum", () => {
    expect(PaperTradingDomain.PaperTradingStatusEnum).toBeDefined();
    expect(PaperTradingDomain.PaperTradingStatusEnum.GENERATED).toBe("generated");
    expect(PaperTradingDomain.PaperTradingStatusEnum.EXECUTED).toBe("executed");
  });
});
