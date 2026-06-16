/**
 * HTTP Portfolio Adapter
 * 
 * Implements the PortfolioAdapter interface using HTTP calls.
 * Disabled by default. Enable via NEXT_PUBLIC_ADAPTER_PROVIDER=http
 */

import { getDataSource } from "../../lib/data-sources";
import type { DataSourceDescriptor } from "../../lib/data-sources";
import type { Portfolio } from "../../lib/types";
import { getAdapterFactory } from "../../lib/adapter-factory";
import { mockPortfolioAdapter } from "../portfolio-adapter";

export interface PortfolioAdapter {
  source: DataSourceDescriptor;
  getSummary(): Promise<Portfolio>;
}

/**
 * HTTP-based portfolio adapter
 * 
 * Calls /api/v1/portfolio/summary
 * Falls back to mock adapter if HTTP is disabled or fails
 */
export const httpPortfolioAdapter: PortfolioAdapter = {
  source: getDataSource("rest"),

  async getSummary(): Promise<Portfolio> {
    const factory = getAdapterFactory();
    if (!factory.shouldUseHttp()) {
      return mockPortfolioAdapter.getSummary();
    }

    try {
      const client = factory.createHttpClient();
      const response = await client.get<Portfolio>("/api/v1/portfolio/summary");
      return response;
    } catch (error) {
      if (factory.shouldUseMockFallback()) {
        console.warn("Portfolio summary HTTP request failed, falling back to mock", error);
        return mockPortfolioAdapter.getSummary();
      }
      throw error;
    }
  }
};
