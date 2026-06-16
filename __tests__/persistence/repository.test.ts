import { describe, it, expect, beforeEach } from "vitest";
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

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(entity);
      }
    });

    it("should return error for duplicate id", async () => {
      const entity: TestEntity = { id: "1", name: "Test", value: 100, category: "A" };
      await repository.save(entity);
      const result = await repository.save(entity);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.code).toBe("DUPLICATE");
      }
    });
  });

  describe("find", () => {
    it("should find an existing entity", async () => {
      const entity: TestEntity = { id: "1", name: "Test", value: 100, category: "A" };
      await repository.save(entity);
      const result = await repository.find("1");

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(entity);
      }
    });

    it("should return error for non-existent entity", async () => {
      const result = await repository.find("nonexistent");

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.code).toBe("NOT_FOUND");
      }
    });
  });

  describe("update", () => {
    it("should update an existing entity", async () => {
      const entity: TestEntity = { id: "1", name: "Test", value: 100, category: "A" };
      await repository.save(entity);
      const result = await repository.update("1", { value: 200 });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.value).toBe(200);
        expect(result.data.name).toBe("Test");
      }
    });

    it("should return error for non-existent entity", async () => {
      const result = await repository.update("nonexistent", { value: 200 });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.code).toBe("NOT_FOUND");
      }
    });
  });

  describe("delete", () => {
    it("should delete an existing entity", async () => {
      const entity: TestEntity = { id: "1", name: "Test", value: 100, category: "A" };
      await repository.save(entity);
      const result = await repository.delete("1");

      expect(result.success).toBe(true);
      expect(await repository.exists("1")).toBe(false);
    });

    it("should return error for non-existent entity", async () => {
      const result = await repository.delete("nonexistent");

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.code).toBe("NOT_FOUND");
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

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.length).toBe(3);
      }
    });

    it("should filter entities by equality", async () => {
      const result = await repository.findAll({
        filters: [{ field: "category", operator: "eq", value: "A" }]
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.length).toBe(2);
        expect(result.data.every(e => e.category === "A")).toBe(true);
      }
    });

    it("should filter entities by greater than", async () => {
      const result = await repository.findAll({
        filters: [{ field: "value", operator: "gt", value: 100 }]
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.length).toBe(2);
      }
    });

    it("should sort entities ascending", async () => {
      const result = await repository.findAll({
        sort: { field: "value", direction: "asc" }
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data[0].value).toBe(100);
        expect(result.data[2].value).toBe(200);
      }
    });

    it("should sort entities descending", async () => {
      const result = await repository.findAll({
        sort: { field: "value", direction: "desc" }
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data[0].value).toBe(200);
        expect(result.data[2].value).toBe(100);
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

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.items.length).toBe(10);
        expect(result.data.total).toBe(25);
        expect(result.data.totalPages).toBe(3);
        expect(result.data.hasNext).toBe(true);
        expect(result.data.hasPrevious).toBe(false);
      }
    });

    it("should return correct page", async () => {
      const result = await repository.search({
        pagination: { page: 2, pageSize: 10 }
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.items.length).toBe(10);
        expect(result.data.page).toBe(2);
        expect(result.data.hasNext).toBe(true);
        expect(result.data.hasPrevious).toBe(true);
      }
    });

    it("should handle last page", async () => {
      const result = await repository.search({
        pagination: { page: 3, pageSize: 10 }
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.items.length).toBe(5);
        expect(result.data.hasNext).toBe(false);
        expect(result.data.hasPrevious).toBe(true);
      }
    });
  });

  describe("archive and restore", () => {
    it("should archive an entity", async () => {
      const entity: TestEntity = { id: "1", name: "Test", value: 100, category: "A" };
      await repository.save(entity);
      await repository.archive("1");

      const result = await repository.findAll();
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.length).toBe(0);
      }
    });

    it("should restore an archived entity", async () => {
      const entity: TestEntity = { id: "1", name: "Test", value: 100, category: "A" };
      await repository.save(entity);
      await repository.archive("1");
      await repository.restore("1");

      const result = await repository.findAll();
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.length).toBe(1);
      }
    });
  });

  describe("snapshots", () => {
    it("should create a snapshot", async () => {
      const entity: TestEntity = { id: "1", name: "Test", value: 100, category: "A" };
      await repository.save(entity);
      const result = await repository.snapshot("1");

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.entityId).toBe("1");
        expect(result.data.entityType).toBe("TestEntity");
        expect(result.data.data).toEqual(entity);
        expect(result.data.version).toBe(1);
      }
    });

    it("should increment snapshot version", async () => {
      const entity: TestEntity = { id: "1", name: "Test", value: 100, category: "A" };
      await repository.save(entity);
      await repository.snapshot("1");
      const result = await repository.snapshot("1");

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.version).toBe(2);
      }
    });

    it("should retrieve all snapshots", async () => {
      const entity: TestEntity = { id: "1", name: "Test", value: 100, category: "A" };
      await repository.save(entity);
      await repository.snapshot("1");
      await repository.update("1", { value: 200 });
      await repository.snapshot("1");

      const result = await repository.getSnapshots("1");
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.length).toBe(2);
        expect(result.data[0].data.value).toBe(100);
        expect(result.data[1].data.value).toBe(200);
      }
    });
  });

  describe("utility methods", () => {
    it("should check existence", async () => {
      const entity: TestEntity = { id: "1", name: "Test", value: 100, category: "A" };
      await repository.save(entity);

      expect(await repository.exists("1")).toBe(true);
      expect(await repository.exists("nonexistent")).toBe(false);
    });

    it("should count entities", async () => {
      await repository.save({ id: "1", name: "A", value: 100, category: "A" });
      await repository.save({ id: "2", name: "B", value: 200, category: "B" });
      await repository.save({ id: "3", name: "C", value: 300, category: "A" });

      expect(await repository.count()).toBe(3);
      expect(await repository.count({
        filters: [{ field: "category", operator: "eq", value: "A" }]
      })).toBe(2);
    });
  });
});
