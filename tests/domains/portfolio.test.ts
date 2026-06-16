/**
 * Portfolio Domain Tests
 */

import { describe, it, expect } from "vitest";
import * as PortfolioDomain from "../../lib/domains/portfolio";

describe("Portfolio Domain", () => {
  it("should export all portfolio types", () => {
    expect(PortfolioDomain).toBeDefined();
  });

  it("should have PortfolioStatus enum", () => {
    expect(PortfolioDomain.PortfolioStatusEnum).toBeDefined();
    expect(PortfolioDomain.PortfolioStatusEnum.HEALTHY).toBe("healthy");
    expect(PortfolioDomain.PortfolioStatusEnum.CRITICAL).toBe("critical");
  });
});
