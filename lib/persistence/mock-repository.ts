/**
 * Mock Repository Implementation
 * 
 * In-memory implementation of the Repository interface.
 * Used for development, testing, and as the default provider.
 * 
 * OMEGA Constitution: Mock implementations are the source of truth.
 */

import type {
  Repository,
  Identifiable,
  Query,
  RepositoryResult,
  PaginatedResult,
  Snapshot,
  Filter
} from "./repository";

export class MockRepository<T extends Identifiable> implements Repository<T> {
  protected entities: Map<string, T> = new Map();
  protected snapshots: Map<string, Snapshot<T>[]> = new Map();
  protected archived: Set<string> = new Set();
  protected entityType: string;
  private snapshotVersion: Map<string, number> = new Map();

  constructor(entityType: string, seed: T[] = []) {
    this.entityType = entityType;
    seed.forEach(entity => this.entities.set(entity.id, entity));
  }

  async save(entity: T): Promise<RepositoryResult<T>> {
    if (this.entities.has(entity.id)) {
      return {
        success: false,
        error: {
          code: "DUPLICATE",
          message: `Entity with id ${entity.id} already exists`
        }
      };
    }
    this.entities.set(entity.id, { ...entity });
    return { success: true, data: { ...entity } };
  }

  async update(id: string, partial: Partial<T>): Promise<RepositoryResult<T>> {
    const existing = this.entities.get(id);
    if (!existing) {
      return {
        success: false,
        error: {
          code: "NOT_FOUND",
          message: `Entity with id ${id} not found`
        }
      };
    }
    const updated = { ...existing, ...partial, id } as T;
    this.entities.set(id, updated);
    return { success: true, data: { ...updated } };
  }

  async delete(id: string): Promise<RepositoryResult<void>> {
    if (!this.entities.has(id)) {
      return {
        success: false,
        error: {
          code: "NOT_FOUND",
          message: `Entity with id ${id} not found`
        }
      };
    }
    this.entities.delete(id);
    this.snapshots.delete(id);
    this.archived.delete(id);
    return { success: true, data: undefined };
  }

  async find(id: string): Promise<RepositoryResult<T>> {
    const entity = this.entities.get(id);
    if (!entity) {
      return {
        success: false,
        error: {
          code: "NOT_FOUND",
          message: `Entity with id ${id} not found`
        }
      };
    }
    return { success: true, data: { ...entity } };
  }

  async findAll(query?: Query<T>): Promise<RepositoryResult<T[]>> {
    let items = Array.from(this.entities.values())
      .filter(e => !this.archived.has(e.id));

    if (query?.filters) {
      items = this.applyFilters(items, query.filters);
    }

    if (query?.sort) {
      items = this.applySort(items, query.sort.field, query.sort.direction);
    }

    return { success: true, data: items.map(e => ({ ...e })) };
  }

  async search(query: Query<T>): Promise<RepositoryResult<PaginatedResult<T>>> {
    const allResult = await this.findAll(query);
    if (!allResult.success) {
      return allResult as RepositoryResult<PaginatedResult<T>>;
    }

    const page = query.pagination?.page ?? 1;
    const pageSize = query.pagination?.pageSize ?? 20;
    const total = allResult.data.length;
    const totalPages = Math.ceil(total / pageSize);
    const start = (page - 1) * pageSize;
    const items = allResult.data.slice(start, start + pageSize);

    return {
      success: true,
      data: {
        items,
        total,
        page,
        pageSize,
        totalPages,
        hasNext: page < totalPages,
        hasPrevious: page > 1
      }
    };
  }

  async archive(id: string): Promise<RepositoryResult<T>> {
    const entity = this.entities.get(id);
    if (!entity) {
      return {
        success: false,
        error: {
          code: "NOT_FOUND",
          message: `Entity with id ${id} not found`
        }
      };
    }
    this.archived.add(id);
    return { success: true, data: { ...entity } };
  }

  async restore(id: string): Promise<RepositoryResult<T>> {
    const entity = this.entities.get(id);
    if (!entity) {
      return {
        success: false,
        error: {
          code: "NOT_FOUND",
          message: `Entity with id ${id} not found`
        }
      };
    }
    this.archived.delete(id);
    return { success: true, data: { ...entity } };
  }

  async snapshot(id: string): Promise<RepositoryResult<Snapshot<T>>> {
    const entity = this.entities.get(id);
    if (!entity) {
      return {
        success: false,
        error: {
          code: "NOT_FOUND",
          message: `Entity with id ${id} not found`
        }
      };
    }

    const version = (this.snapshotVersion.get(id) ?? 0) + 1;
    this.snapshotVersion.set(id, version);

    const snap: Snapshot<T> = {
      id: `${id}-snapshot-${version}`,
      entityId: id,
      entityType: this.entityType,
      data: { ...entity },
      createdAt: new Date().toISOString(),
      version
    };

    const existing = this.snapshots.get(id) ?? [];
    this.snapshots.set(id, [...existing, snap]);

    return { success: true, data: snap };
  }

  async getSnapshots(id: string): Promise<RepositoryResult<Snapshot<T>[]>> {
    const snaps = this.snapshots.get(id) ?? [];
    return { success: true, data: [...snaps] };
  }

  async exists(id: string): Promise<boolean> {
    return this.entities.has(id);
  }

  async count(query?: Query<T>): Promise<number> {
    const result = await this.findAll(query);
    return result.success ? result.data.length : 0;
  }

  // Helper methods
  protected applyFilters(items: T[], filters: Filter<T>[]): T[] {
    return items.filter(item => {
      return filters.every(filter => {
        const value = item[filter.field];
        switch (filter.operator) {
          case "eq": return value === filter.value;
          case "ne": return value !== filter.value;
          case "gt": return (value as number) > (filter.value as number);
          case "gte": return (value as number) >= (filter.value as number);
          case "lt": return (value as number) < (filter.value as number);
          case "lte": return (value as number) <= (filter.value as number);
          case "in": return (filter.value as unknown[]).includes(value);
          case "contains": return String(value).includes(String(filter.value));
          case "startsWith": return String(value).startsWith(String(filter.value));
          default: return true;
        }
      });
    });
  }

  protected applySort(items: T[], field: keyof T, direction: "asc" | "desc"): T[] {
    return [...items].sort((a, b) => {
      const aVal = a[field];
      const bVal = b[field];
      const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      return direction === "asc" ? cmp : -cmp;
    });
  }
}
