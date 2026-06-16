/**
 * MockCache Tests
 *
 * Uses node:test (tsx --test) to match the project's existing test runner.
 * Previously used vitest; converted in Phase 7 Completion Pass to run in CI.
 */
import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { MockCache } from "../../lib/persistence/cache";

interface TestData {
  id: string;
  value: number;
}

describe("MockCache", () => {
  let cache: MockCache<TestData>;

  beforeEach(() => {
    cache = new MockCache<TestData>();
  });

  describe("basic operations", () => {
    it("should set and get a value", async () => {
      const data: TestData = { id: "1", value: 100 };
      await cache.set("key1", data);
      const result = await cache.get("key1");

      assert.deepEqual(result, data);
    });

    it("should return null for non-existent key", async () => {
      const result = await cache.get("nonexistent");
      assert.equal(result, null);
    });

    it("should delete a value", async () => {
      await cache.set("key1", { id: "1", value: 100 });
      const deleted = await cache.delete("key1");

      assert.equal(deleted, true);
      assert.equal(await cache.get("key1"), null);
    });

    it("should check if key exists", async () => {
      await cache.set("key1", { id: "1", value: 100 });

      assert.equal(await cache.has("key1"), true);
      assert.equal(await cache.has("nonexistent"), false);
    });

    it("should clear all values", async () => {
      await cache.set("key1", { id: "1", value: 100 });
      await cache.set("key2", { id: "2", value: 200 });
      await cache.clear();

      assert.equal(await cache.size(), 0);
    });

    it("should return all keys", async () => {
      await cache.set("key1", { id: "1", value: 100 });
      await cache.set("key2", { id: "2", value: 200 });

      const keys = await cache.keys();
      assert.ok(keys.includes("key1"));
      assert.ok(keys.includes("key2"));
    });

    it("should return correct size", async () => {
      await cache.set("key1", { id: "1", value: 100 });
      await cache.set("key2", { id: "2", value: 200 });

      assert.equal(await cache.size(), 2);
    });
  });

  describe("batch operations", () => {
    it("should get many values", async () => {
      await cache.set("key1", { id: "1", value: 100 });
      await cache.set("key2", { id: "2", value: 200 });
      await cache.set("key3", { id: "3", value: 300 });

      const result = await cache.getMany(["key1", "key3", "nonexistent"]);

      assert.equal(result.size, 2);
      assert.deepEqual(result.get("key1"), { id: "1", value: 100 });
      assert.deepEqual(result.get("key3"), { id: "3", value: 300 });
    });

    it("should set many values", async () => {
      const entries = new Map<string, TestData>([
        ["key1", { id: "1", value: 100 }],
        ["key2", { id: "2", value: 200 }]
      ]);

      await cache.setMany(entries);

      assert.deepEqual(await cache.get("key1"), { id: "1", value: 100 });
      assert.deepEqual(await cache.get("key2"), { id: "2", value: 200 });
    });
  });

  describe("statistics", () => {
    it("should track hits and misses", async () => {
      await cache.set("key1", { id: "1", value: 100 });

      await cache.get("key1"); // hit
      await cache.get("key1"); // hit
      await cache.get("nonexistent"); // miss

      const stats = cache.getStats();
      assert.equal(stats.hits, 2);
      assert.equal(stats.misses, 1);
      // hitRate = 2/3 ≈ 0.667
      assert.ok(Math.abs(stats.hitRate - 0.667) < 0.01);
    });
  });
});
