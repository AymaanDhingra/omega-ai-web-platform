import type {
  KnowledgeItem,
  KnowledgeCollection,
  KnowledgeRepository,
  KnowledgeSearchQuery,
  KnowledgeSearchResult,
  KnowledgeFilter,
  KnowledgeRanking,
  KnowledgeRelationship,
  KnowledgeSnapshot,
  KnowledgeSummary
} from "../types";
import { mockKnowledgeItems } from "./knowledge-items";

/**
 * Mock Knowledge Repository
 * In-memory implementation for development and testing
 */

let knowledgeItems: KnowledgeItem[] = [...mockKnowledgeItems];
let knowledgeCollections: KnowledgeCollection[] = [];
let relationships: KnowledgeRelationship[] = [];
let snapshots: KnowledgeSnapshot[] = [];
let summaries: KnowledgeSummary[] = [];

function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function calculateRelevanceScore(
  item: KnowledgeItem,
  query: string,
  filter?: KnowledgeFilter
): number {
  let score = 0;

  // Text matching
  const queryLower = query.toLowerCase();
  if (item.title.toLowerCase().includes(queryLower)) score += 0.4;
  if (item.description.toLowerCase().includes(queryLower)) score += 0.2;
  if (item.content.toLowerCase().includes(queryLower)) score += 0.1;

  // Confidence boost
  score += (item.state.confidence * 0.2);

  // Recency boost
  const daysSinceUpdate = (Date.now() - new Date(item.updatedAt).getTime()) / (1000 * 60 * 60 * 24);
  const recencyScore = Math.max(0, 1 - daysSinceUpdate / 365);
  score += recencyScore * 0.1;

  // Filter matching
  if (filter) {
    if (filter.categories && filter.categories.includes(item.category)) score += 0.1;
    if (filter.minConfidence && item.state.confidence >= filter.minConfidence) score += 0.05;
    if (filter.status && filter.status.includes(item.state.status)) score += 0.05;
  }

  return Math.min(1, score);
}

export const mockKnowledgeRepository: KnowledgeRepository = {
  // Item operations
  async createItem(item) {
    const newItem: KnowledgeItem = {
      ...item,
      id: generateId("ki"),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    knowledgeItems.push(newItem);
    return newItem;
  },

  async getItem(id) {
    return knowledgeItems.find(item => item.id === id) || null;
  },

  async updateItem(id, updates) {
    const index = knowledgeItems.findIndex(item => item.id === id);
    if (index === -1) throw new Error(`Knowledge item ${id} not found`);
    const updated = {
      ...knowledgeItems[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    knowledgeItems[index] = updated;
    return updated;
  },

  async deleteItem(id) {
    knowledgeItems = knowledgeItems.filter(item => item.id !== id);
  },

  async listItems(filter) {
    let items = [...knowledgeItems];

    if (filter) {
      if (filter.categories) {
        items = items.filter(item => filter.categories!.includes(item.category));
      }
      if (filter.tags) {
        items = items.filter(item =>
          filter.tags!.some(tag =>
            item.tags.some(t => t.name.toLowerCase() === tag.toLowerCase())
          )
        );
      }
      if (filter.status) {
        items = items.filter(item => filter.status!.includes(item.state.status));
      }
      if (filter.minConfidence) {
        items = items.filter(item => item.state.confidence >= filter.minConfidence!);
      }
      if (filter.market) {
        items = items.filter(item => item.metadata.market === filter.market);
      }
      if (filter.symbol) {
        items = items.filter(item => item.metadata.symbol === filter.symbol);
      }
    }

    return items;
  },

  // Collection operations
  async createCollection(collection) {
    const newCollection: KnowledgeCollection = {
      ...collection,
      id: generateId("kc"),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    knowledgeCollections.push(newCollection);
    return newCollection;
  },

  async getCollection(id) {
    return knowledgeCollections.find(c => c.id === id) || null;
  },

  async updateCollection(id, updates) {
    const index = knowledgeCollections.findIndex(c => c.id === id);
    if (index === -1) throw new Error(`Knowledge collection ${id} not found`);
    const updated = {
      ...knowledgeCollections[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    knowledgeCollections[index] = updated;
    return updated;
  },

  async deleteCollection(id) {
    knowledgeCollections = knowledgeCollections.filter(c => c.id !== id);
  },

  async listCollections() {
    return [...knowledgeCollections];
  },

  // Search operations
  async search(query) {
    const startTime = Date.now();
    let results = await this.listItems(query.filter);

    // Calculate rankings
    const rankings = results.map(item => ({
      itemId: item.id,
      score: calculateRelevanceScore(item, query.query, query.filter),
      factors: {
        recency: Math.max(0, 1 - (Date.now() - new Date(item.updatedAt).getTime()) / (1000 * 60 * 60 * 24 * 365)),
        confidence: item.state.confidence,
        tagRelevance: item.tags.length > 0 ? 0.8 : 0.3,
        relationshipStrength: 0.5,
        validationStatus: item.state.status === "active" ? 1 : 0.5
      },
      reasoning: `Matched on ${query.query} with confidence ${item.state.confidence}`
    }));

    // Sort by score
    rankings.sort((a, b) => b.score - a.score);
    const sortedIds = rankings.map(r => r.itemId);
    results = results.sort((a, b) => sortedIds.indexOf(a.id) - sortedIds.indexOf(b.id));

    // Apply pagination
    const offset = query.offset || 0;
    const limit = query.limit || 20;
    const paginatedResults = results.slice(offset, offset + limit);
    const paginatedRankings = rankings.slice(offset, offset + limit);

    return {
      items: paginatedResults,
      rankings: paginatedRankings,
      totalCount: results.length,
      hasMore: offset + limit < results.length,
      executedAt: new Date().toISOString(),
      queryTime: Date.now() - startTime
    };
  },

  async filter(filter) {
    return this.listItems(filter);
  },

  async rank(items, query) {
    return items.map(item => ({
      itemId: item.id,
      score: calculateRelevanceScore(item, query),
      factors: {
        recency: Math.max(0, 1 - (Date.now() - new Date(item.updatedAt).getTime()) / (1000 * 60 * 60 * 24 * 365)),
        confidence: item.state.confidence,
        tagRelevance: item.tags.length > 0 ? 0.8 : 0.3,
        relationshipStrength: 0.5,
        validationStatus: item.state.status === "active" ? 1 : 0.5
      },
      reasoning: `Ranked for query: ${query}`
    }));
  },

  // Relationship operations
  async createRelationship(relationship) {
    const newRelationship: KnowledgeRelationship = {
      ...relationship,
      id: generateId("kr"),
      createdAt: new Date().toISOString()
    };
    relationships.push(newRelationship);
    return newRelationship;
  },

  async getRelationships(itemId) {
    return relationships.filter(r => r.sourceId === itemId || r.targetId === itemId);
  },

  async deleteRelationship(id) {
    relationships = relationships.filter(r => r.id !== id);
  },

  // Snapshot operations
  async createSnapshot(snapshot) {
    const newSnapshot: KnowledgeSnapshot = {
      ...snapshot,
      id: generateId("ks")
    };
    snapshots.push(newSnapshot);
    return newSnapshot;
  },

  async getSnapshots(itemId) {
    return snapshots.filter(s => s.knowledgeItemId === itemId);
  },

  // Summary operations
  async createSummary(summary) {
    const newSummary: KnowledgeSummary = {
      ...summary,
      id: generateId("ks"),
      generatedAt: new Date().toISOString()
    };
    summaries.push(newSummary);
    return newSummary;
  },

  async getSummary(itemId) {
    return summaries.find(s => s.itemId === itemId) || null;
  }
};
