/**
 * HTTP System Adapter
 * 
 * Implements the SystemAdapter interface using HTTP calls.
 * Disabled by default. Enable via NEXT_PUBLIC_ADAPTER_PROVIDER=http
 */

import { getDataSource } from "../../lib/data-sources";
import type { DataSourceDescriptor } from "../../lib/data-sources";
import type { DashboardSnapshot } from "../../lib/types";
import { getAdapterFactory } from "../../lib/adapter-factory";
import { mockSystemAdapter } from "../system-adapter";

export interface SystemAdapter {
  source: DataSourceDescriptor;
  getDashboardSnapshot(): Promise<DashboardSnapshot>;
}

/**
 * HTTP-based system adapter
 * 
 * Calls /api/v1/system/dashboard
 * Falls back to mock adapter if HTTP is disabled or fails
 */
export const httpSystemAdapter: SystemAdapter = {
  source: getDataSource("rest"),

  async getDashboardSnapshot(): Promise<DashboardSnapshot> {
    const factory = getAdapterFactory();
    if (!factory.shouldUseHttp()) {
      return mockSystemAdapter.getDashboardSnapshot();
    }

    try {
      const client = factory.createHttpClient();
      const response = await client.get<DashboardSnapshot>("/api/v1/system/dashboard");
      return response;
    } catch (error) {
      if (factory.shouldUseMockFallback()) {
        console.warn("System dashboard HTTP request failed, falling back to mock", error);
        return mockSystemAdapter.getDashboardSnapshot();
      }
      throw error;
    }
  }
};
