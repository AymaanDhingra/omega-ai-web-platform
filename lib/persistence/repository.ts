/**
 * Generic Repository Interface
 * 
 * Defines the canonical persistence contract for all domain entities.
 * All implementations are mock-first. Future providers (database, API, etc.)
 * must implement this exact interface.
 * 
 * OMEGA Constitution: Mock adapters are the source of truth.
 */

export interface Query<T> {
  filters?: Filter<T>[];
  sort?: Sort<T>;
  pagination?: Pagination;
}

export interface Filter<T> {
  field: keyof T;
  operator: "eq" | "ne" | "gt" | "gte" | "lt" | "lte" | "in" | "contains" | "startsWith";
  value: unknown;
}

export interface Sort<T> {
  field: keyof T;
  direction: "asc" | "desc";
}

export interface Pagination {
  page: number;
  pageSize: number;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export type RepositoryResult<T> = 
  | { success: true; data: T }
  | { success: false; error: RepositoryError };

export interface RepositoryError {
  code: "NOT_FOUND" | "DUPLICATE" | "VALIDATION" | "CONFLICT" | "UNAVAILABLE";
  message: string;
  details?: Record<string, unknown>;
}

export interface Identifiable {
  id: string;
}

export interface Timestamped {
  createdAt: string;
  updatedAt: string;
}

export interface Archivable {
  archivedAt?: string;
  archived: boolean;
}

/**
 * Generic Repository Interface
 * 
 * All domain repositories must implement this interface.
 * Provides consistent CRUD, search, archive, and snapshot operations.
 */
export interface Repository<T extends Identifiable> {
  /**
   * Save a new entity
   */
  save(entity: T): Promise<RepositoryResult<T>>;

  /**
   * Update an existing entity
   */
  update(id: string, partial: Partial<T>): Promise<RepositoryResult<T>>;

  /**
   * Delete an entity by ID
   */
  delete(id: string): Promise<RepositoryResult<void>>;

  /**
   * Find an entity by ID
   */
  find(id: string): Promise<RepositoryResult<T>>;

  /**
   * Find all entities matching a query
   */
  findAll(query?: Query<T>): Promise<RepositoryResult<T[]>>;

  /**
   * Search with pagination
   */
  search(query: Query<T>): Promise<RepositoryResult<PaginatedResult<T>>>;

  /**
   * Archive an entity (soft delete)
   */
  archive(id: string): Promise<RepositoryResult<T>>;

  /**
   * Restore an archived entity
   */
  restore(id: string): Promise<RepositoryResult<T>>;

  /**
   * Create a point-in-time snapshot
   */
  snapshot(id: string): Promise<RepositoryResult<Snapshot<T>>>;

  /**
   * Get all snapshots for an entity
   */
  getSnapshots(id: string): Promise<RepositoryResult<Snapshot<T>[]>>;

  /**
   * Check if an entity exists
   */
  exists(id: string): Promise<boolean>;

  /**
   * Count entities matching a query
   */
  count(query?: Query<T>): Promise<number>;
}

/**
 * Snapshot represents a point-in-time copy of an entity
 */
export interface Snapshot<T> {
  id: string;
  entityId: string;
  entityType: string;
  data: T;
  createdAt: string;
  reason?: string;
  version: number;
}

/**
 * History entry for tracking changes
 */
export interface HistoryEntry<T> {
  id: string;
  entityId: string;
  entityType: string;
  action: "created" | "updated" | "deleted" | "archived" | "restored";
  before?: Partial<T>;
  after?: Partial<T>;
  changedFields?: (keyof T)[];
  timestamp: string;
  actor?: string;
}

/**
 * History repository for audit trails
 */
export interface HistoryRepository<T extends Identifiable> {
  record(entry: Omit<HistoryEntry<T>, "id" | "timestamp">): Promise<RepositoryResult<HistoryEntry<T>>>;
  getHistory(entityId: string): Promise<RepositoryResult<HistoryEntry<T>[]>>;
  getHistoryRange(entityId: string, from: string, to: string): Promise<RepositoryResult<HistoryEntry<T>[]>>;
}
