/**
 * Signal Flow Orchestrator Tests
 *
 * Tests the mock SignalFlowOrchestrator implementation.
 * Uses node:test to match the project's existing test runner.
 *
 * Phase 8: Paper Trading Architecture Extension
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { createMockSignalFlowOrchestrator } from "../lib/mock/signal-flow";
import type { SignalFlowPipelineResult } from "../lib/contracts/signal-flow";

const ALL_STAGES = [
  "market-analysis",
  "ai-analysis",
  "signal-generation",
  "signal-validation",
  "order-creation",
  "position-management",
  "trade-execution",
  "portfolio-update",
  "analytics-update",
  "tradingview-validation",
] as const;

describe("SignalFlowOrchestrator (mock)", () => {
  describe("executePipeline", () => {
    it("should return a valid pipeline result", async () => {
      const orchestrator = createMockSignalFlowOrchestrator();
      const result = await orchestrator.executePipeline("BTCUSDT");

      assert.ok(result.id, "Pipeline result must have an id");
      assert.equal(result.symbol, "BTCUSDT");
      assert.ok(result.startedAt, "Pipeline result must have startedAt");
      assert.equal(result.status, "completed");
    });

    it("should return a result with all 10 pipeline stages", async () => {
      const orchestrator = createMockSignalFlowOrchestrator();
      const result = await orchestrator.executePipeline("NIFTY");

      assert.equal(result.stages.length, 10, "Pipeline must have exactly 10 stages");

      const stageNames = result.stages.map((s) => s.stage);
      for (const stage of ALL_STAGES) {
        assert.ok(stageNames.includes(stage), `Stage '${stage}' must be present`);
      }
    });

    it("should skip tradingview-validation by default", async () => {
      const orchestrator = createMockSignalFlowOrchestrator();
      const result = await orchestrator.executePipeline("BTCUSDT");

      const tvStage = result.stages.find((s) => s.stage === "tradingview-validation");
      assert.ok(tvStage, "tradingview-validation stage must be present");
      assert.equal(tvStage.status, "skipped");
      assert.ok(tvStage.skippedReason, "Skipped stage must have a skippedReason");
    });

    it("should include tradingview-validation when skipTradingViewValidation is false", async () => {
      const orchestrator = createMockSignalFlowOrchestrator();
      const result = await orchestrator.executePipeline("BTCUSDT", {
        skipTradingViewValidation: false,
      });

      const tvStage = result.stages.find((s) => s.stage === "tradingview-validation");
      assert.ok(tvStage, "tradingview-validation stage must be present");
      assert.equal(tvStage.status, "completed");
      assert.equal(result.tradingViewValidated, true);
    });

    it("should accept a custom symbol", async () => {
      const orchestrator = createMockSignalFlowOrchestrator();
      const result = await orchestrator.executePipeline("INFY");
      assert.equal(result.symbol, "INFY");
    });

    it("should add executed pipeline to history", async () => {
      const orchestrator = createMockSignalFlowOrchestrator();
      const historyBefore = orchestrator.getPipelineHistory();
      await orchestrator.executePipeline("CRUDE");
      const historyAfter = orchestrator.getPipelineHistory();
      assert.equal(historyAfter.length, historyBefore.length + 1);
    });

    it("should return a result with completedAt set", async () => {
      const orchestrator = createMockSignalFlowOrchestrator();
      const result = await orchestrator.executePipeline("GOLD");
      assert.ok(result.completedAt, "completedAt must be set on a completed pipeline");
    });

    it("should return a result with portfolioImpact", async () => {
      const orchestrator = createMockSignalFlowOrchestrator();
      const result = await orchestrator.executePipeline("BTCUSDT");
      assert.ok(result.portfolioImpact, "portfolioImpact must be present");
      assert.ok(result.portfolioImpact.valueBefore);
      assert.ok(result.portfolioImpact.valueAfter);
      assert.ok(result.portfolioImpact.pnlImpact);
    });
  });

  describe("getActivePipelines", () => {
    it("should return an empty array when no pipelines are running", () => {
      const orchestrator = createMockSignalFlowOrchestrator();
      const active = orchestrator.getActivePipelines();
      assert.ok(Array.isArray(active), "getActivePipelines must return an array");
      assert.equal(active.length, 0);
    });
  });

  describe("getPipelineHistory", () => {
    it("should return pipeline history as an array", () => {
      const orchestrator = createMockSignalFlowOrchestrator();
      const history = orchestrator.getPipelineHistory();
      assert.ok(Array.isArray(history), "getPipelineHistory must return an array");
      assert.ok(history.length > 0, "History must contain at least the seed fixtures");
    });

    it("should respect the limit parameter", () => {
      const orchestrator = createMockSignalFlowOrchestrator();
      const history = orchestrator.getPipelineHistory(1);
      assert.equal(history.length, 1);
    });

    it("should return all history when limit is not specified", () => {
      const orchestrator = createMockSignalFlowOrchestrator();
      const all = orchestrator.getPipelineHistory();
      const limited = orchestrator.getPipelineHistory(all.length + 100);
      assert.equal(limited.length, all.length);
    });

    it("should contain pipelines with valid status values", () => {
      const orchestrator = createMockSignalFlowOrchestrator();
      const history = orchestrator.getPipelineHistory();
      const validStatuses = ["pending", "running", "completed", "failed", "skipped"];
      for (const pipeline of history) {
        assert.ok(
          validStatuses.includes(pipeline.status),
          `Pipeline status '${pipeline.status}' must be a valid SignalFlowStatus`
        );
      }
    });

    it("should include a failed pipeline in history fixtures", () => {
      const orchestrator = createMockSignalFlowOrchestrator();
      const history = orchestrator.getPipelineHistory();
      const failed = history.find((p: SignalFlowPipelineResult) => p.status === "failed");
      assert.ok(failed, "History must include at least one failed pipeline fixture");
    });
  });

  describe("getPipelineById", () => {
    it("should return a pipeline by its id", () => {
      const orchestrator = createMockSignalFlowOrchestrator();
      const history = orchestrator.getPipelineHistory();
      const first = history[0];
      const found = orchestrator.getPipelineById(first.id);
      assert.ok(found, "getPipelineById must return the pipeline");
      assert.equal(found.id, first.id);
    });

    it("should return null for an unknown id", () => {
      const orchestrator = createMockSignalFlowOrchestrator();
      const result = orchestrator.getPipelineById("non-existent-id-xyz");
      assert.equal(result, null);
    });

    it("should find a newly executed pipeline by id", async () => {
      const orchestrator = createMockSignalFlowOrchestrator();
      const executed = await orchestrator.executePipeline("BANKNIFTY");
      const found = orchestrator.getPipelineById(executed.id);
      assert.ok(found, "Newly executed pipeline must be findable by id");
      assert.equal(found.id, executed.id);
      assert.equal(found.symbol, "BANKNIFTY");
    });
  });

  describe("cancelPipeline", () => {
    it("should return true when cancelling an existing pipeline", () => {
      const orchestrator = createMockSignalFlowOrchestrator();
      const history = orchestrator.getPipelineHistory();
      const first = history[0];
      const result = orchestrator.cancelPipeline(first.id);
      assert.equal(result, true);
    });

    it("should return false when cancelling a non-existent pipeline", () => {
      const orchestrator = createMockSignalFlowOrchestrator();
      const result = orchestrator.cancelPipeline("non-existent-id-xyz");
      assert.equal(result, false);
    });

    it("should allow cancelling a newly executed pipeline", async () => {
      const orchestrator = createMockSignalFlowOrchestrator();
      const executed = await orchestrator.executePipeline("CRUDE");
      const result = orchestrator.cancelPipeline(executed.id);
      assert.equal(result, true);
    });
  });

  describe("stage structure", () => {
    it("each stage must have stage, status, and startedAt", async () => {
      const orchestrator = createMockSignalFlowOrchestrator();
      const result = await orchestrator.executePipeline("BTCUSDT");

      for (const stage of result.stages) {
        assert.ok(stage.stage, "Stage must have a stage name");
        assert.ok(stage.status, "Stage must have a status");
        assert.ok(stage.startedAt, "Stage must have startedAt");
      }
    });

    it("completed stages must have duration", async () => {
      const orchestrator = createMockSignalFlowOrchestrator();
      const result = await orchestrator.executePipeline("BTCUSDT");

      const completedStages = result.stages.filter((s) => s.status === "completed");
      for (const stage of completedStages) {
        assert.ok(
          typeof stage.duration === "number",
          `Completed stage '${stage.stage}' must have a numeric duration`
        );
      }
    });

    it("skipped stages must have skippedReason", async () => {
      const orchestrator = createMockSignalFlowOrchestrator();
      const result = await orchestrator.executePipeline("BTCUSDT", {
        skipTradingViewValidation: true,
      });

      const skippedStages = result.stages.filter((s) => s.status === "skipped");
      for (const stage of skippedStages) {
        assert.ok(
          stage.skippedReason,
          `Skipped stage '${stage.stage}' must have a skippedReason`
        );
      }
    });
  });
});
