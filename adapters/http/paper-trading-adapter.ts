/**
 * HTTP Paper Trading Adapter
 * 
 * Implements the PaperTradingAdapter interface using HTTP calls.
 * Disabled by default. Enable via NEXT_PUBLIC_ADAPTER_PROVIDER=http
 */

import { getDataSource } from "../../lib/data-sources";
import type {
  PaperAccount,
  PaperOrder,
  PaperPerformanceMetrics,
  PaperPortfolio,
  PaperPosition,
  PaperTradingState,
  TradeJournalEntry
} from "../../lib/contracts/paper-trading";
import { getAdapterFactory } from "../../lib/adapter-factory";
import { mockPaperTradingAdapter, type PaperTradingAdapter } from "../paper-trading-adapter";

/**
 * HTTP-based paper trading adapter
 * 
 * Calls /api/v1/paper/*
 * Falls back to mock adapter if HTTP is disabled or fails
 */
export const httpPaperTradingAdapter: PaperTradingAdapter = {
  source: getDataSource("rest"),

  async getPaperTradingState(): Promise<PaperTradingState> {
    const factory = getAdapterFactory();
    if (!factory.shouldUseHttp()) {
      return mockPaperTradingAdapter.getPaperTradingState();
    }

    try {
      const client = factory.createHttpClient();
      return await client.get<PaperTradingState>("/api/v1/paper/state");
    } catch (error) {
      if (factory.shouldUseMockFallback()) {
        console.warn("Paper trading state HTTP request failed, falling back to mock", error);
        return mockPaperTradingAdapter.getPaperTradingState();
      }
      throw error;
    }
  },

  async getPaperAccounts(): Promise<PaperAccount[]> {
    const factory = getAdapterFactory();
    if (!factory.shouldUseHttp()) {
      return mockPaperTradingAdapter.getPaperAccounts();
    }

    try {
      const client = factory.createHttpClient();
      const response = await client.get<{ items: PaperAccount[] }>("/api/v1/paper/accounts");
      return response.items;
    } catch (error) {
      if (factory.shouldUseMockFallback()) {
        console.warn("Paper accounts HTTP request failed, falling back to mock", error);
        return mockPaperTradingAdapter.getPaperAccounts();
      }
      throw error;
    }
  },

  async getPaperOrders(): Promise<PaperOrder[]> {
    const factory = getAdapterFactory();
    if (!factory.shouldUseHttp()) {
      return mockPaperTradingAdapter.getPaperOrders();
    }

    try {
      const client = factory.createHttpClient();
      const response = await client.get<{ items: PaperOrder[] }>("/api/v1/paper/orders");
      return response.items;
    } catch (error) {
      if (factory.shouldUseMockFallback()) {
        console.warn("Paper orders HTTP request failed, falling back to mock", error);
        return mockPaperTradingAdapter.getPaperOrders();
      }
      throw error;
    }
  },

  async getPaperPositions(): Promise<PaperPosition[]> {
    const factory = getAdapterFactory();
    if (!factory.shouldUseHttp()) {
      return mockPaperTradingAdapter.getPaperPositions();
    }

    try {
      const client = factory.createHttpClient();
      const response = await client.get<{ items: PaperPosition[] }>("/api/v1/paper/positions");
      return response.items;
    } catch (error) {
      if (factory.shouldUseMockFallback()) {
        console.warn("Paper positions HTTP request failed, falling back to mock", error);
        return mockPaperTradingAdapter.getPaperPositions();
      }
      throw error;
    }
  },

  async getPaperPortfolios(): Promise<PaperPortfolio[]> {
    const factory = getAdapterFactory();
    if (!factory.shouldUseHttp()) {
      return mockPaperTradingAdapter.getPaperPortfolios();
    }

    try {
      const client = factory.createHttpClient();
      const response = await client.get<{ items: PaperPortfolio[] }>("/api/v1/paper/portfolios");
      return response.items;
    } catch (error) {
      if (factory.shouldUseMockFallback()) {
        console.warn("Paper portfolios HTTP request failed, falling back to mock", error);
        return mockPaperTradingAdapter.getPaperPortfolios();
      }
      throw error;
    }
  },

  async getTradeJournal(): Promise<TradeJournalEntry[]> {
    const factory = getAdapterFactory();
    if (!factory.shouldUseHttp()) {
      return mockPaperTradingAdapter.getTradeJournal();
    }

    try {
      const client = factory.createHttpClient();
      const response = await client.get<{ items: TradeJournalEntry[] }>("/api/v1/paper/journal");
      return response.items;
    } catch (error) {
      if (factory.shouldUseMockFallback()) {
        console.warn("Trade journal HTTP request failed, falling back to mock", error);
        return mockPaperTradingAdapter.getTradeJournal();
      }
      throw error;
    }
  },

  async getPerformanceMetrics(): Promise<PaperPerformanceMetrics[]> {
    const factory = getAdapterFactory();
    if (!factory.shouldUseHttp()) {
      return mockPaperTradingAdapter.getPerformanceMetrics();
    }

    try {
      const client = factory.createHttpClient();
      const response = await client.get<{ items: PaperPerformanceMetrics[] }>("/api/v1/paper/performance");
      return response.items;
    } catch (error) {
      if (factory.shouldUseMockFallback()) {
        console.warn("Performance metrics HTTP request failed, falling back to mock", error);
        return mockPaperTradingAdapter.getPerformanceMetrics();
      }
      throw error;
    }
  }
};
