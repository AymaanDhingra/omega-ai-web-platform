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
import type { DataSourceDescriptor } from "../../lib/data-sources";
import type { TradingViewTestingData } from "../../lib/contracts/tradingview-testing";
import { getAdapterFactory } from "../../lib/adapter-factory";
import { mockTradingViewTestingAdapter } from "../tradingview-testing-adapter";

export interface TradingViewTestingAdapter {
  source: DataSourceDescriptor;
  getTestingData(): Promise<TradingViewTestingData>;
}

/**
 * HTTP-based TradingView testing adapter
 * 
 * Calls /api/v1/tradingview/testing
 * Falls back to mock adapter if HTTP is disabled or fails
 */
export const httpTradingViewTestingAdapter: TradingViewTestingAdapter = {
  source: getDataSource("rest"),

  async getTestingData(): Promise<TradingViewTestingData> {
    const factory = getAdapterFactory();
    if (!factory.shouldUseHttp()) {
      return mockTradingViewTestingAdapter.getTestingData();
    }

    try {
      const client = factory.createHttpClient();
      const response = await client.get<TradingViewTestingData>("/api/v1/tradingview/testing");
      return response;
    } catch (error) {
      if (factory.shouldUseMockFallback()) {
        console.warn(
          "TradingView testing data HTTP request failed, falling back to mock",
          error
        );
        return mockTradingViewTestingAdapter.getTestingData();
      }
      throw error;
    }
  }
};
