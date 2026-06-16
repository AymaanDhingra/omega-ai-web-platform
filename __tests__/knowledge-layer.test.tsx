import { describe, it, expect } from "tsx/esm/test";
import { mockKnowledgeRepository } from "../lib/mock/knowledge-repository";
import { mockKnowledgeItems } from "../lib/mock/knowledge-items";
import { knowledgeSources, getEnabledKnowledgeSources } from "../lib/mock/knowledge-sources";
import { enhanceSignalWithKnowledge, validateSignalAgainstKnowledge } from "../lib/knowledge-integration";
import type { TradeSignal } from "../lib/types";

describe("Knowledge Intelligence Layer", () => {
  describe("Knowledge Repository", () => {
    it("should list all knowledge items", async () => {
      const items = await mockKnowledgeRepository.listItems();
      expect(items.length).toBeGreaterThan(0);
      expect(items[0].id).toBeDefined();
      expect(items[0].title).toBeDefined();
    });

    it("should filter knowledge items by category", async () => {
      const items = await mockKnowledgeRepository.listItems({
        categories: ["strategy"]
      });
      expect(items.length).toBeGreaterThan(0);
      items.forEach(item => {
        expect(item.category).toBe("strategy");
      });
    });

    it("should search knowledge items", async () => {
      const result = await mockKnowledgeRepository.search({
        query: "NIFTY",
        limit: 10
      });
      expect(result.items.length).toBeGreaterThan(0);
      expect(result.rankings.length).toBeGreaterThan(0);
      expect(result.totalCount).toBeGreaterThan(0);
    });
  });

  describe("Knowledge Sources", () => {
    it("should have multiple knowledge sources", () => {
      expect(knowledgeSources.length).toBeGreaterThan(0);
    });

    it("should have TradingView observations disabled by default", () => {
      const tvSource = knowledgeSources.find(s => s.id === "tradingview-observations");
      expect(tvSource?.enabled).toBe(false);
    });
  });

  describe("SignalFlow Integration", () => {
    it("should enhance signal with knowledge", async () => {
      const signal: TradeSignal = {
        id: "test-signal",
        market: "Indian Equities",
        symbol: "NIFTY50",
        direction: "Long",
        entry: "18000",
        stop: "17900",
        targets: "18100",
        confidence: 0.8,
        expectedValue: "100",
        risk: "0.5",
        reasoning: "Test signal"
      };

      const integration = await enhanceSignalWithKnowledge(signal, mockKnowledgeItems);
      expect(integration.signalId).toBe(signal.id);
      expect(integration.knowledgeItems.length).toBeGreaterThan(0);
      expect(integration.relevanceScore).toBeGreaterThanOrEqual(0);
      expect(integration.relevanceScore).toBeLessThanOrEqual(1);
    });
  });
});
