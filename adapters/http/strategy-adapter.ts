/**
 * HTTP Strategy Adapter
 * 
 * Implements the StrategyAdapter interface using HTTP calls.
 * Disabled by default. Enable via NEXT_PUBLIC_ADAPTER_PROVIDER=http
 */

import { getDataSource } from "../../lib/data-sources";
import type { DataSourceDescriptor } from "../../lib/data-sources";
import type { Strategy } from "../../lib/types";
import { getAdapterFactory } from "../../lib/adapter-factory";
import { mockStrategyAdapter } from "../strategy-adapter";

export interface StrategyAdapter {
  source: DataSourceDescriptor;
  getStrategies(): Promise<Strategy[]>;
}

/**
 * HTTP-based strategy adapter
 * 
 * Calls /api/v1/strategies
 * Falls back to mock adapter if HTTP is disabled or fails
 */
export const httpStrategyAdapter: StrategyAdapter = {
  source: getDataSource("rest"),

  async getStrategies(): Promise<Strategy[]> {
    const factory = getAdapterFactory();
    if (!factory.shouldUseHttp()) {
      return mockStrategyAdapter.getStrategies();
    }

    try {
      const client = factory.createHttpClient();
      const response = await client.get<{ items: Strategy[] }>("/api/v1/strategies");
      return response.items;
    } catch (error) {
      if (factory.shouldUseMockFallback()) {
        console.warn("Strategies HTTP request failed, falling back to mock", error);
        return mockStrategyAdapter.getStrategies();
      }
      throw error;
    }
  }
};
