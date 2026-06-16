/**
 * HTTP Paper Trading Adapter
 * 
 * Implements the PaperTradingAdapter interface using HTTP calls.
 * Disabled by default. Enable via NEXT_PUBLIC_ADAPTER_PROVIDER=http
 */

import { getDataSource } from "../../lib/data-sources";
import type { DataSourceDescriptor } from "../../lib/data-sources";
import type { PaperAccount, PaperTrade } from "../../lib/contracts/paper-trading";
import { getAdapterFactory } from "../../lib/adapter-factory";
import { mockPaperTradingAdapter } from "../paper-trading-adapter";

export interface PaperTradingAdapter {
  source: DataSourceDescriptor;
  getAccounts(): Promise<PaperAccount[]>;
  getTrades(): Promise<PaperTrade[]>;
}

/**
 * HTTP-based paper trading adapter
 * 
 * Calls /api/v1/paper/accounts and /api/v1/paper/trades
 * Falls back to mock adapter if HTTP is disabled or fails
 */
export const httpPaperTradingAdapter: PaperTradingAdapter = {
  source: getDataSource("rest"),

  async getAccounts(): Promise<PaperAccount[]> {
    const factory = getAdapterFactory();
    if (!factory.shouldUseHttp()) {
      return mockPaperTradingAdapter.getAccounts();
    }

    try {
      const client = factory.createHttpClient();
      const response = await client.get<{ items: PaperAccount[] }>("/api/v1/paper/accounts");
      return response.items;
    } catch (error) {
      if (factory.shouldUseMockFallback()) {
        console.warn("Paper trading accounts HTTP request failed, falling back to mock", error);
        return mockPaperTradingAdapter.getAccounts();
      }
      throw error;
    }
  },

  async getTrades(): Promise<PaperTrade[]> {
    const factory = getAdapterFactory();
    if (!factory.shouldUseHttp()) {
      return mockPaperTradingAdapter.getTrades();
    }

    try {
      const client = factory.createHttpClient();
      const response = await client.get<{ items: PaperTrade[] }>("/api/v1/paper/trades");
      return response.items;
    } catch (error) {
      if (factory.shouldUseMockFallback()) {
        console.warn("Paper trading trades HTTP request failed, falling back to mock", error);
        return mockPaperTradingAdapter.getTrades();
      }
      throw error;
    }
  }
};
