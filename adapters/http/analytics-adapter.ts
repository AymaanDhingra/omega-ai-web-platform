/**
 * HTTP Analytics Adapter
 * 
 * Implements the AnalyticsAdapter interface using HTTP calls.
 * Disabled by default. Enable via NEXT_PUBLIC_ADAPTER_PROVIDER=http
 */

import { getDataSource } from "../../lib/data-sources";
import type { DataSourceDescriptor } from "../../lib/data-sources";
import type { AnalyticsGroup } from "../../lib/types";
import { getAdapterFactory } from "../../lib/adapter-factory";
import { mockAnalyticsAdapter } from "../analytics-adapter";

export interface AnalyticsAdapter {
  source: DataSourceDescriptor;
  getAnalyticsGroups(): Promise<AnalyticsGroup[]>;
}

/**
 * HTTP-based analytics adapter
 * 
 * Calls /api/v1/analytics
 * Falls back to mock adapter if HTTP is disabled or fails
 */
export const httpAnalyticsAdapter: AnalyticsAdapter = {
  source: getDataSource("rest"),

  async getAnalyticsGroups(): Promise<AnalyticsGroup[]> {
    const factory = getAdapterFactory();
    if (!factory.shouldUseHttp()) {
      return mockAnalyticsAdapter.getAnalyticsGroups();
    }

    try {
      const client = factory.createHttpClient();
      const response = await client.get<{ items: AnalyticsGroup[] }>("/api/v1/analytics");
      return response.items;
    } catch (error) {
      if (factory.shouldUseMockFallback()) {
        console.warn("Analytics HTTP request failed, falling back to mock", error);
        return mockAnalyticsAdapter.getAnalyticsGroups();
      }
      throw error;
    }
  }
};
