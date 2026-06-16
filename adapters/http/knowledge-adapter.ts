/**
 * HTTP Knowledge Adapter
 * 
 * Implements the KnowledgeAdapter interface using HTTP calls.
 * Disabled by default. Enable via NEXT_PUBLIC_ADAPTER_PROVIDER=http
 */

import { getDataSource } from "../../lib/data-sources";
import type { DataSourceDescriptor } from "../../lib/data-sources";
import type { KnowledgeDocument } from "../../lib/types";
import { getAdapterFactory } from "../../lib/adapter-factory";
import { mockKnowledgeAdapter } from "../knowledge-adapter";

export interface KnowledgeAdapter {
  source: DataSourceDescriptor;
  getDocuments(): Promise<KnowledgeDocument[]>;
}

/**
 * HTTP-based knowledge adapter
 * 
 * Calls /api/v1/knowledge/documents
 * Falls back to mock adapter if HTTP is disabled or fails
 */
export const httpKnowledgeAdapter: KnowledgeAdapter = {
  source: getDataSource("rest"),

  async getDocuments(): Promise<KnowledgeDocument[]> {
    const factory = getAdapterFactory();
    if (!factory.shouldUseHttp()) {
      return mockKnowledgeAdapter.getDocuments();
    }

    try {
      const client = factory.createHttpClient();
      const response = await client.get<{ items: KnowledgeDocument[] }>(
        "/api/v1/knowledge/documents"
      );
      return response.items;
    } catch (error) {
      if (factory.shouldUseMockFallback()) {
        console.warn("Knowledge documents HTTP request failed, falling back to mock", error);
        return mockKnowledgeAdapter.getDocuments();
      }
      throw error;
    }
  }
};
