import { mockKnowledgeAdapter } from "../adapters/knowledge-adapter";
import type {
  KnowledgeItem,
  KnowledgeCollection,
  KnowledgeSearchQuery,
  KnowledgeSearchResult,
  KnowledgeFilter,
  KnowledgeRanking
} from "../lib/types";

/**
 * Knowledge Layer API
 * 
 * Frontend API contract for knowledge operations.
 * Calls adapter interfaces before reaching mock services.
 */

export const knowledgeApi = {
  // Legacy document operations
  getDocuments: () => mockKnowledgeAdapter.getDocuments(),
  
  // Item operations
  getItem: (id: string) => mockKnowledgeAdapter.getItem(id),
  listItems: (filter?: KnowledgeFilter) => mockKnowledgeAdapter.listItems(filter),
  createItem: (item: Omit<KnowledgeItem, "id" | "createdAt" | "updatedAt">) =>
    mockKnowledgeAdapter.createItem(item),
  updateItem: (id: string, updates: Partial<KnowledgeItem>) =>
    mockKnowledgeAdapter.updateItem(id, updates),
  deleteItem: (id: string) => mockKnowledgeAdapter.deleteItem(id),

  // Collection operations
  getCollection: (id: string) => mockKnowledgeAdapter.getCollection(id),
  listCollections: () => mockKnowledgeAdapter.listCollections(),
  createCollection: (collection: Omit<KnowledgeCollection, "id" | "createdAt" | "updatedAt">) =>
    mockKnowledgeAdapter.createCollection(collection),
  updateCollection: (id: string, updates: Partial<KnowledgeCollection>) =>
    mockKnowledgeAdapter.updateCollection(id, updates),
  deleteCollection: (id: string) => mockKnowledgeAdapter.deleteCollection(id),

  // Search operations
  search: (query: KnowledgeSearchQuery): Promise<KnowledgeSearchResult> =>
    mockKnowledgeAdapter.search(query),
  filter: (filter: KnowledgeFilter) => mockKnowledgeAdapter.filter(filter),
  rank: (items: KnowledgeItem[], query: string): Promise<KnowledgeRanking[]> =>
    mockKnowledgeAdapter.rank(items, query),

  // Relationship operations
  getRelationships: (itemId: string) => mockKnowledgeAdapter.getRelationships(itemId),

  // Snapshot operations
  getSnapshots: (itemId: string) => mockKnowledgeAdapter.getSnapshots(itemId),

  // Summary operations
  getSummary: (itemId: string) => mockKnowledgeAdapter.getSummary(itemId)
};
