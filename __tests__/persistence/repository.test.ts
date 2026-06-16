/**
 * MockRepository Tests
 *
 * Uses node:test (tsx --test) to match the project's existing test runner.
 * Previously used vitest; converted in Phase 7 Completion Pass to run in CI.
 */
import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { MockRepository } from "../../lib/persistence/mock-repository";
import type { Identifiable } from "../../lib/persistence/repository";

interface TestEntity extends Identifiable {
  id: string;
  name: string;
  value: number;
  category: string;
}

describe("MockRepository", () => {
  let repository: MockRepository<TestEntity>;

  beforeEach(() => {
    repository = new MockRepository<TestEntity>("TestEntity");
  });

  describe("save", () => {
    it("should save a new entity", async () => {
      const entity: TestEntity = { id: "1", name: "Test", value: 100, category: "A" };
      const result = await repository.save(entity);

      assert.equal(result.success, true);
      if (result.success) {
        assert.deepEqual(result.data, entity);
      }
    });

    it("should return error for duplicate id", async () => {
      const entity: TestEntity = { id: "1", name: "Test", value: 100, category: "A" };
      await repository.save(entity);
      const result = await repository.save(entity);

      assert.equal(result.success, false);
      if (!result.success) {
        assert.equal(result.error.code, "DUPLICATE");
      }
    });
  });

  describe("find", () => {
    it("should find an existing entity", async () => {
      const entity: TestEntity = { id: "1", name: "Test", value: 100, category: "A" };
      await repository.save(entity);
      const result = await repository.find("1");

      assert.equal(result.success, true);
      if (result.success) {
        assert.deepEqual(result.data, entity);
      }
    });

    it("should return error for non-existent entity", async () => {
      const result = await repository.find("nonexistent");

      assert.equal(result.success, false);
      if (!result.success) {
        assert.equal(result.error.code, "NOT_FOUND");
      }
    });
  });

  describe("update", () => {
    it("should update an existing entity", async () => {
      const entity: TestEntity = { id: "1", name: "Test", value: 100, category: "A" };
      await repository.save(entity);
      const result = await repository.update("1", { value: 200 });

      assert.equal(result.success, true);
      if (result.success) {
        assert.equal(result.data.value, 200);
        assert.equal(result.data.name, "Test");
      }
    });

    it("should return error for non-existent entity", async () => {
      const result = await repository.update("nonexistent", { value: 200 });

      assert.equal(result.success, false);
      if (!result.success) {
        assert.equal(result.error.code, "NOT_FOUND");
      }
    });
  });

  describe("delete", () => {
    it("should delete an existing entity", async () => {
      const entity: TestEntity = { id: "1", name: "Test", value: 100, category: "A" };
      await repository.save(entity);
      const result = await repository.delete("1");

      assert.equal(result.success, true);
      assert.equal(await repository.exists("1"), false);
    });

    it("should return error for non-existent entity", async () => {
      const result = await repository.delete("nonexistent");

      assert.equal(result.success, false);
      if (!result.success) {
        assert.equal(result.error.code, "NOT_FOUND");
      }
    });
  });

  describe("findAll", () => {
    beforeEach(async () => {
      await repository.save({ id: "1", name: "Alpha", value: 100, category: "A" });
      await repository.save({ id: "2", name: "Beta", value: 200, category: "B" });
      await repository.save({ id: "3", name: "Gamma", value: 150, category: "A" });
    });

    it("should return all entities without query", async () => {
      const result = await repository.findAll();

      assert.equal(result.success, true);
      if (result.success) {
        assert.equal(result.data.length, 3);
      }
    });

    it("should filter entities by equality", async () => {
      const result = await repository.findAll({
        filters: [{ field: "category", operator: "eq", value: "A" }]
      });

      assert.equal(result.success, true);
      if (result.success) {
        assert.equal(result.data.length, 2);
        assert.ok(result.data.every(e => e.category === "A"));
      }
    });

    it("should filter entities by greater than", async () => {
      const result = await repository.findAll({
        filters: [{ field: "value", operator: "gt", value: 100 }]
      });

      assert.equal(result.success, true);
      if (result.success) {
        assert.equal(result.data.length, 2);
      }
    });

    it("should sort entities ascending", async () => {
      const result = await repository.findAll({
        sort: { field: "value", direction: "asc" }
      });

      assert.equal(result.success, true);
      if (result.success) {
        assert.equal(result.data[0].value, 100);
        assert.equal(result.data[2].value, 200);
      }
    });

    it("should sort entities descending", async () => {
      const result = await repository.findAll({
        sort: { field: "value", direction: "desc" }
      });

      assert.equal(result.success, true);
      if (result.success) {
        assert.equal(result.data[0].value, 200);
        assert.equal(result.data[2].value, 100);
      }
    });
  });

  describe("search with pagination", () => {
    beforeEach(async () => {
      for (let i = 1; i <= 25; i++) {
        await repository.save({ id: `${i}`, name: `Item ${i}`, value: i * 10, category: "A" });
      }
    });

    it("should paginate results", async () => {
      const result = await repository.search({
        pagination: { page: 1, pageSize: 10 }
      });

      assert.equal(result.success, true);
      if (result.success) {
        assert.equal(result.data.items.length, 10);
        assert.equal(result.data.total, 25);
        assert.equal(result.data.totalPages, 3);
        assert.equal(result.data.hasNext, true);
        assert.equal(result.data.hasPrevious, false);
      }
    });

    it("should return correct page", async () => {
      const result = await repository.search({
        pagination: { page: 2, pageSize: 10 }
      });

      assert.equal(result.success, true);
      if (result.success) {
        assert.equal(result.data.items.length, 10);
        assert.equal(result.data.page, 2);
        assert.equal(result.data.hasNext, true);
        assert.equal(result.data.hasPrevious, true);
      }
    });

    it("should handle last page", async () => {
      const result = await repository.search({
        pagination: { page: 3, pageSize: 10 }
      });

      assert.equal(result.success, true);
      if (result.success) {
        assert.equal(result.data.items.length, 5);
        assert.equal(result.data.hasNext, false);
        assert.equal(result.data.hasPrevious, true);
      }
    });
  });

  describe("archive and restore", () => {
    it("should archive an entity", async () => {
      const entity: TestEntity = { id: "1", name: "Test", value: 100, category: "A" };
      await repository.save(entity);
      await repository.archive("1");

      const result = await repository.findAll();
      assert.equal(result.success, true);
      if (result.success) {
        assert.equal(result.data.length, 0);
      }
    });

    it("should restore an archived entity", async () => {
      const entity: TestEntity = { id: "1", name: "Test", value: 100, category: "A" };
      await repository.save(entity);
      await repository.archive("1");
      await repository.restore("1");

      const result = await repository.findAll();
      assert.equal(result.success, true);
      if (result.success) {
        assert.equal(result.data.length, 1);
      }
    });
  });

  describe("snapshots", () => {
    it("should create a snapshot", async () => {
      const entity: TestEntity = { id: "1", name: "Test", value: 100, category: "A" };
      await repository.save(entity);
      const result = await repository.snapshot("1");

      assert.equal(result.success, true);
      if (result.success) {
        assert.equal(result.data.entityId, "1");
        assert.equal(result.data.entityType, "TestEntity");
        assert.deepEqual(result.data.data, entity);
        assert.equal(result.data.version, 1);
      }
    });

    it("should increment snapshot version", async () => {
      const entity: TestEntity = { id: "1", name: "Test", value: 100, category: "A" };
      await repository.save(entity);
      await repository.snapshot("1");
      const result = await repository.snapshot("1");

      assert.equal(result.success, true);
      if (result.success) {
        assert.equal(result.data.version, 2);
      }
    });

    it("should retrieve all snapshots", async () => {
      const entity: TestEntity = { id: "1", name: "Test", value: 100, category: "A" };
      await repository.save(entity);
      await repository.snapshot("1");
      await repository.update("1", { value: 200 });
      await repository.snapshot("1");

      const result = await repository.getSnapshots("1");
      assert.equal(result.success, true);
      if (result.success) {
        assert.equal(result.data.length, 2);
        assert.equal(result.data[0].data.value, 100);
        assert.equal(result.data[1].data.value, 200);
      }
    });
  });

  describe("utility methods", () => {
    it("should check existence", async () => {
      const entity: TestEntity = { id: "1", name: "Test", value: 100, category: "A" };
      await repository.save(entity);

      assert.equal(await repository.exists("1"), true);
      assert.equal(await repository.exists("nonexistent"), false);
    });

    it("should count entities", async () => {
      await repository.save({ id: "1", name: "A", value: 100, category: "A" });
      await repository.save({ id: "2", name: "B", value: 200, category: "B" });
      await repository.save({ id: "3", name: "C", value: 300, category: "A" });

      assert.equal(await repository.count(), 3);
      assert.equal(await repository.count({
        filters: [{ field: "category", operator: "eq", value: "A" }]
      }), 2);
    });
  });
});
