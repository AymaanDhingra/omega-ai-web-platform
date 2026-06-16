/**
 * HTTP Strategy Adapter
 * 
 * Implements the StrategyAdapter interface using HTTP calls.
 * Disabled by default. Enable via NEXT_PUBLIC_ADAPTER_PROVIDER=http
 */

import { getDataSource } from "../../lib/data-sources";
import type { BacktestMetric, Strategy, TradeSignal } from "../../lib/types";
import { getAdapterFactory } from "../../lib/adapter-factory";
import { mockStrategyAdapter, type StrategyAdapter } from "../strategy-adapter";

/**
 * HTTP-based strategy adapter
 * 
 * Calls /api/v1/strategies/*
 * Falls back to mock adapter if HTTP is disabled or fails
 */
export const httpStrategyAdapter: StrategyAdapter = {
  source: getDataSource("rest"),

  async getTradeSignals(): Promise<TradeSignal[]> {
    const factory = getAdapterFactory();
    if (!factory.shouldUseHttp()) {
      return mockStrategyAdapter.getTradeSignals();
    }

    try {
      const client = factory.createHttpClient();
      const response = await client.get<{ items: TradeSignal[] }>("/api/v1/strategies/signals");
      return response.items;
    } catch (error) {
      if (factory.shouldUseMockFallback()) {
        console.warn("Trade signals HTTP request failed, falling back to mock", error);
        return mockStrategyAdapter.getTradeSignals();
      }
      throw error;
    }
  },

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
  },

  async getBacktestMetrics(): Promise<BacktestMetric[]> {
    const factory = getAdapterFactory();
    if (!factory.shouldUseHttp()) {
      return mockStrategyAdapter.getBacktestMetrics();
    }

    try {
      const client = factory.createHttpClient();
      const response = await client.get<{ items: BacktestMetric[] }>("/api/v1/strategies/backtest");
      return response.items;
    } catch (error) {
      if (factory.shouldUseMockFallback()) {
        console.warn("Backtest metrics HTTP request failed, falling back to mock", error);
        return mockStrategyAdapter.getBacktestMetrics();
      }
      throw error;
    }
  }
};
