/**
 * HTTP Portfolio Adapter
 * 
 * Implements the PortfolioAdapter interface using HTTP calls.
 * Disabled by default. Enable via NEXT_PUBLIC_ADAPTER_PROVIDER=http
 */

import { getDataSource } from "../../lib/data-sources";
import type { DashboardMetric, PaperTrade, Portfolio } from "../../lib/types";
import { getAdapterFactory } from "../../lib/adapter-factory";
import { mockPortfolioAdapter, type PortfolioAdapter } from "../portfolio-adapter";

/**
 * HTTP-based portfolio adapter
 * 
 * Calls /api/v1/portfolio/*
 * Falls back to mock adapter if HTTP is disabled or fails
 */
export const httpPortfolioAdapter: PortfolioAdapter = {
  source: getDataSource("rest"),

  async getDashboardMetrics(): Promise<DashboardMetric[]> {
    const factory = getAdapterFactory();
    if (!factory.shouldUseHttp()) {
      return mockPortfolioAdapter.getDashboardMetrics();
    }

    try {
      const client = factory.createHttpClient();
      const response = await client.get<{ items: DashboardMetric[] }>("/api/v1/portfolio/metrics");
      return response.items;
    } catch (error) {
      if (factory.shouldUseMockFallback()) {
        console.warn("Portfolio metrics HTTP request failed, falling back to mock", error);
        return mockPortfolioAdapter.getDashboardMetrics();
      }
      throw error;
    }
  },

  async getPortfolio(): Promise<Portfolio> {
    const factory = getAdapterFactory();
    if (!factory.shouldUseHttp()) {
      return mockPortfolioAdapter.getPortfolio();
    }

    try {
      const client = factory.createHttpClient();
      return await client.get<Portfolio>("/api/v1/portfolio");
    } catch (error) {
      if (factory.shouldUseMockFallback()) {
        console.warn("Portfolio HTTP request failed, falling back to mock", error);
        return mockPortfolioAdapter.getPortfolio();
      }
      throw error;
    }
  },

  async getPaperTrades(): Promise<PaperTrade[]> {
    const factory = getAdapterFactory();
    if (!factory.shouldUseHttp()) {
      return mockPortfolioAdapter.getPaperTrades();
    }

    try {
      const client = factory.createHttpClient();
      const response = await client.get<{ items: PaperTrade[] }>("/api/v1/portfolio/paper-trades");
      return response.items;
    } catch (error) {
      if (factory.shouldUseMockFallback()) {
        console.warn("Paper trades HTTP request failed, falling back to mock", error);
        return mockPortfolioAdapter.getPaperTrades();
      }
      throw error;
    }
  }
};
