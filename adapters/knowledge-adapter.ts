import { getDataSource } from "../lib/data-sources";
import type { DataSourceDescriptor } from "../lib/data-sources";
import type { KnowledgeDocument, KnowledgeRepository } from "../lib/types";
import { mockKnowledgeService } from "../services/knowledge-service";
import { mockKnowledgeRepository } from "../lib/mock/knowledge-repository";

export interface KnowledgeAdapter extends KnowledgeRepository {
  source: DataSourceDescriptor;
  getDocuments(): Promise<KnowledgeDocument[]>;
}

export const mockKnowledgeAdapter: KnowledgeAdapter = {
  source: getDataSource("mock"),
  getDocuments: () => mockKnowledgeService.getDocuments(),
  // Delegate all repository operations to mock repository
  createItem: (item) => mockKnowledgeRepository.createItem(item),
  getItem: (id) => mockKnowledgeRepository.getItem(id),
  updateItem: (id, updates) => mockKnowledgeRepository.updateItem(id, updates),
  deleteItem: (id) => mockKnowledgeRepository.deleteItem(id),
  listItems: (filter) => mockKnowledgeRepository.listItems(filter),
  createCollection: (collection) => mockKnowledgeRepository.createCollection(collection),
  getCollection: (id) => mockKnowledgeRepository.getCollection(id),
  updateCollection: (id, updates) => mockKnowledgeRepository.updateCollection(id, updates),
  deleteCollection: (id) => mockKnowledgeRepository.deleteCollection(id),
  listCollections: () => mockKnowledgeRepository.listCollections(),
  search: (query) => mockKnowledgeRepository.search(query),
  filter: (filter) => mockKnowledgeRepository.filter(filter),
  rank: (items, query) => mockKnowledgeRepository.rank(items, query),
  createRelationship: (relationship) => mockKnowledgeRepository.createRelationship(relationship),
  getRelationships: (itemId) => mockKnowledgeRepository.getRelationships(itemId),
  deleteRelationship: (id) => mockKnowledgeRepository.deleteRelationship(id),
  createSnapshot: (snapshot) => mockKnowledgeRepository.createSnapshot(snapshot),
  getSnapshots: (itemId) => mockKnowledgeRepository.getSnapshots(itemId),
  createSummary: (summary) => mockKnowledgeRepository.createSummary(summary),
  getSummary: (itemId) => mockKnowledgeRepository.getSummary(itemId)
};
