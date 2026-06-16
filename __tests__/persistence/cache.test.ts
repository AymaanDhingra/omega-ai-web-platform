import { describe, it, expect, beforeEach } from "vitest";
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

      expect(result).toEqual(data);
    });

    it("should return null for non-existent key", async () => {
      const result = await cache.get("nonexistent");
      expect(result).toBeNull();
    });

    it("should delete a value", async () => {
      await cache.set("key1", { id: "1", value: 100 });
      const deleted = await cache.delete("key1");

      expect(deleted).toBe(true);
      expect(await cache.get("key1")).toBeNull();
    });

    it("should check if key exists", async () => {
      await cache.set("key1", { id: "1", value: 100 });

      expect(await cache.has("key1")).toBe(true);
      expect(await cache.has("nonexistent")).toBe(false);
    });

    it("should clear all values", async () => {
      await cache.set("key1", { id: "1", value: 100 });
      await cache.set("key2", { id: "2", value: 200 });
      await cache.clear();

      expect(await cache.size()).toBe(0);
    });

    it("should return all keys", async () => {
      await cache.set("key1", { id: "1", value: 100 });
      await cache.set("key2", { id: "2", value: 200 });

      const keys = await cache.keys();
      expect(keys).toContain("key1");
      expect(keys).toContain("key2");
    });

    it("should return correct size", async () => {
      await cache.set("key1", { id: "1", value: 100 });
      await cache.set("key2", { id: "2", value: 200 });

      expect(await cache.size()).toBe(2);
    });
  });

  describe("batch operations", () => {
    it("should get many values", async () => {
      await cache.set("key1", { id: "1", value: 100 });
      await cache.set("key2", { id: "2", value: 200 });
      await cache.set("key3", { id: "3", value: 300 });

      const result = await cache.getMany(["key1", "key3", "nonexistent"]);

      expect(result.size).toBe(2);
      expect(result.get("key1")).toEqual({ id: "1", value: 100 });
      expect(result.get("key3")).toEqual({ id: "3", value: 300 });
    });

    it("should set many values", async () => {
      const entries = new Map<string, TestData>([
        ["key1", { id: "1", value: 100 }],
        ["key2", { id: "2", value: 200 }]
      ]);

      await cache.setMany(entries);

      expect(await cache.get("key1")).toEqual({ id: "1", value: 100 });
      expect(await cache.get("key2")).toEqual({ id: "2", value: 200 });
    });
  });

  describe("statistics", () => {
    it("should track hits and misses", async () => {
      await cache.set("key1", { id: "1", value: 100 });

      await cache.get("key1"); // hit
      await cache.get("key1"); // hit
      await cache.get("nonexistent"); // miss

      const stats = cache.getStats();
      expect(stats.hits).toBe(2);
      expect(stats.misses).toBe(1);
      expect(stats.hitRate).toBeCloseTo(0.667, 2);
    });
  });
});
