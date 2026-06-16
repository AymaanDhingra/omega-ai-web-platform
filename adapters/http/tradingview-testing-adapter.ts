/**
 * HTTP TradingView Testing Adapter
 * 
 * Implements the TradingViewTestingAdapter interface using HTTP calls.
 * Disabled by default. Enable via NEXT_PUBLIC_ADAPTER_PROVIDER=http
 * 
 * TradingView remains a testing and validation component.
 * This adapter demonstrates how to integrate TradingView data without tight coupling.
 */

import { getDataSource } from "../../lib/data-sources";
import type {
  TradingViewAlertStatus,
  TradingViewChartStatus,
  TradingViewHistoricalValidation,
  TradingViewPaperComparison,
  TradingViewSignalValidation,
  TradingViewTestingContracts
} from "../../lib/contracts/tradingview-testing";
import type { TradingViewTestingSummary } from "../../lib/types";
import { getAdapterFactory } from "../../lib/adapter-factory";
import { mockTradingViewTestingAdapter, type TradingViewTestingAdapter } from "../tradingview-testing-adapter";

/**
 * HTTP-based TradingView testing adapter
 * 
 * Calls /api/v1/tradingview/*
 * Falls back to mock adapter if HTTP is disabled or fails
 */
export const httpTradingViewTestingAdapter: TradingViewTestingAdapter = {
  source: getDataSource("rest"),

  async getTestingSummary(): Promise<TradingViewTestingSummary> {
    const factory = getAdapterFactory();
    if (!factory.shouldUseHttp()) {
      return mockTradingViewTestingAdapter.getTestingSummary();
    }

    try {
      const client = factory.createHttpClient();
      return await client.get<TradingViewTestingSummary>("/api/v1/tradingview/summary");
    } catch (error) {
      if (factory.shouldUseMockFallback()) {
        console.warn("TradingView summary HTTP request failed, falling back to mock", error);
        return mockTradingViewTestingAdapter.getTestingSummary();
      }
      throw error;
    }
  },

  async getTestingContracts(): Promise<TradingViewTestingContracts> {
    const factory = getAdapterFactory();
    if (!factory.shouldUseHttp()) {
      return mockTradingViewTestingAdapter.getTestingContracts();
    }

    try {
      const client = factory.createHttpClient();
      return await client.get<TradingViewTestingContracts>("/api/v1/tradingview/contracts");
    } catch (error) {
      if (factory.shouldUseMockFallback()) {
        console.warn("TradingView contracts HTTP request failed, falling back to mock", error);
        return mockTradingViewTestingAdapter.getTestingContracts();
      }
      throw error;
    }
  },

  async getChartStatus(): Promise<TradingViewChartStatus[]> {
    const factory = getAdapterFactory();
    if (!factory.shouldUseHttp()) {
      return mockTradingViewTestingAdapter.getChartStatus();
    }

    try {
      const client = factory.createHttpClient();
      const response = await client.get<{ items: TradingViewChartStatus[] }>("/api/v1/tradingview/charts");
      return response.items;
    } catch (error) {
      if (factory.shouldUseMockFallback()) {
        console.warn("TradingView chart status HTTP request failed, falling back to mock", error);
        return mockTradingViewTestingAdapter.getChartStatus();
      }
      throw error;
    }
  },

  async getSignalValidation(): Promise<TradingViewSignalValidation[]> {
    const factory = getAdapterFactory();
    if (!factory.shouldUseHttp()) {
      return mockTradingViewTestingAdapter.getSignalValidation();
    }

    try {
      const client = factory.createHttpClient();
      const response = await client.get<{ items: TradingViewSignalValidation[] }>("/api/v1/tradingview/signals");
      return response.items;
    } catch (error) {
      if (factory.shouldUseMockFallback()) {
        console.warn("TradingView signal validation HTTP request failed, falling back to mock", error);
        return mockTradingViewTestingAdapter.getSignalValidation();
      }
      throw error;
    }
  },

  async getPaperComparison(): Promise<TradingViewPaperComparison[]> {
    const factory = getAdapterFactory();
    if (!factory.shouldUseHttp()) {
      return mockTradingViewTestingAdapter.getPaperComparison();
    }

    try {
      const client = factory.createHttpClient();
      const response = await client.get<{ items: TradingViewPaperComparison[] }>("/api/v1/tradingview/paper-comparison");
      return response.items;
    } catch (error) {
      if (factory.shouldUseMockFallback()) {
        console.warn("TradingView paper comparison HTTP request failed, falling back to mock", error);
        return mockTradingViewTestingAdapter.getPaperComparison();
      }
      throw error;
    }
  },

  async getAlertStatus(): Promise<TradingViewAlertStatus[]> {
    const factory = getAdapterFactory();
    if (!factory.shouldUseHttp()) {
      return mockTradingViewTestingAdapter.getAlertStatus();
    }

    try {
      const client = factory.createHttpClient();
      const response = await client.get<{ items: TradingViewAlertStatus[] }>("/api/v1/tradingview/alerts");
      return response.items;
    } catch (error) {
      if (factory.shouldUseMockFallback()) {
        console.warn("TradingView alert status HTTP request failed, falling back to mock", error);
        return mockTradingViewTestingAdapter.getAlertStatus();
      }
      throw error;
    }
  },

  async getHistoricalValidation(): Promise<TradingViewHistoricalValidation[]> {
    const factory = getAdapterFactory();
    if (!factory.shouldUseHttp()) {
      return mockTradingViewTestingAdapter.getHistoricalValidation();
    }

    try {
      const client = factory.createHttpClient();
      const response = await client.get<{ items: TradingViewHistoricalValidation[] }>("/api/v1/tradingview/historical");
      return response.items;
    } catch (error) {
      if (factory.shouldUseMockFallback()) {
        console.warn("TradingView historical validation HTTP request failed, falling back to mock", error);
        return mockTradingViewTestingAdapter.getHistoricalValidation();
      }
      throw error;
    }
  }
};
