/**
 * Persistence Module Exports
 * 
 * Central export point for all persistence contracts and implementations.
 */

export type {
  Repository,
  Query,
  Filter,
  Sort,
  Pagination,
  PaginatedResult,
  RepositoryResult,
  RepositoryError,
  Identifiable,
  Timestamped,
  Archivable,
  Snapshot,
  HistoryEntry,
  HistoryRepository
} from "./repository";

export { MockRepository } from "./mock-repository";
