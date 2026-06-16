/**
 * AI Domain Tests
 */

import { describe, it, expect } from "vitest";
import * as AIDomain from "../../lib/domains/ai";

describe("AI Domain", () => {
  it("should export all AI types", () => {
    expect(AIDomain).toBeDefined();
  });

  it("should have ConfidenceLevel enum", () => {
    expect(AIDomain.ConfidenceLevelEnum).toBeDefined();
    expect(AIDomain.ConfidenceLevelEnum.LOW).toBe("low");
    expect(AIDomain.ConfidenceLevelEnum.HIGH).toBe("high");
  });

  it("should have AISystemStatus enum", () => {
    expect(AIDomain.AISystemStatusEnum).toBeDefined();
    expect(AIDomain.AISystemStatusEnum.READY).toBe("ready");
    expect(AIDomain.AISystemStatusEnum.ANALYZING).toBe("analyzing");
  });

  it("should have LearningEventType enum", () => {
    expect(AIDomain.LearningEventTypeEnum).toBeDefined();
    expect(AIDomain.LearningEventTypeEnum.TRADE_RESULT).toBe("trade-result");
  });
});
