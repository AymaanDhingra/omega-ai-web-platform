/**
 * HTTP Market Adapter
 * 
 * Implements the MarketAdapter interface using HTTP calls.
 * Disabled by default. Enable via NEXT_PUBLIC_ADAPTER_PROVIDER=http
 * 
 * This adapter demonstrates how to replace mock services with HTTP calls
 * while maintaining the same interface.
 */

import { getDataSource } from "../../lib/data-sources";
import type { DataSourceDescriptor } from "../../lib/data-sources";
import type { MarketAsset } from "../../lib/types";
import { getAdapterFactory } from "../../lib/adapter-factory";
import { mockMarketAdapter } from "../market-adapter";

export interface MarketAdapter {
  source: DataSourceDescriptor;
  getWatchlist(): Promise<MarketAsset[]>;
  getCandles(): Promise<[number, number, number, number][]>;
}

/**
 * HTTP-based market adapter
 * 
 * Calls /api/v1/markets/watchlist and /api/v1/markets/candles
 * Falls back to mock adapter if HTTP is disabled or fails
 */
export const httpMarketAdapter: MarketAdapter = {
  source: getDataSource("rest"),

  async getWatchlist(): Promise<MarketAsset[]> {
    const factory = getAdapterFactory();
    if (!factory.shouldUseHttp()) {
      return mockMarketAdapter.getWatchlist();
    }

    try {
      const client = factory.createHttpClient();
      const response = await client.get<{ items: MarketAsset[] }>("/api/v1/markets/watchlist");
      return response.items;
    } catch (error) {
      if (factory.shouldUseMockFallback()) {
        console.warn("Market watchlist HTTP request failed, falling back to mock", error);
        return mockMarketAdapter.getWatchlist();
      }
      throw error;
    }
  },

  async getCandles(): Promise<[number, number, number, number][]> {
    const factory = getAdapterFactory();
    if (!factory.shouldUseHttp()) {
      return mockMarketAdapter.getCandles();
    }

    try {
      const client = factory.createHttpClient();
      const response = await client.get<{ candles: [number, number, number, number][] }>(
        "/api/v1/markets/candles"
      );
      return response.candles;
    } catch (error) {
      if (factory.shouldUseMockFallback()) {
        console.warn("Market candles HTTP request failed, falling back to mock", error);
        return mockMarketAdapter.getCandles();
      }
      throw error;
    }
  }
};
