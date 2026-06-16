/**
 * HTTP News Adapter
 * 
 * Implements the NewsAdapter interface using HTTP calls.
 * Disabled by default. Enable via NEXT_PUBLIC_ADAPTER_PROVIDER=http
 */

import { getDataSource } from "../../lib/data-sources";
import type { NewsEvent } from "../../lib/types";
import { getAdapterFactory } from "../../lib/adapter-factory";
import { mockNewsAdapter, type NewsAdapter } from "../news-adapter";

/**
 * HTTP-based news adapter
 * 
 * Calls /api/v1/news
 * Falls back to mock adapter if HTTP is disabled or fails
 */
export const httpNewsAdapter: NewsAdapter = {
  source: getDataSource("rest"),

  async getNewsEvents(): Promise<NewsEvent[]> {
    const factory = getAdapterFactory();
    if (!factory.shouldUseHttp()) {
      return mockNewsAdapter.getNewsEvents();
    }

    try {
      const client = factory.createHttpClient();
      const response = await client.get<{ items: NewsEvent[] }>("/api/v1/news");
      return response.items;
    } catch (error) {
      if (factory.shouldUseMockFallback()) {
        console.warn("News HTTP request failed, falling back to mock", error);
        return mockNewsAdapter.getNewsEvents();
      }
      throw error;
    }
  }
};
