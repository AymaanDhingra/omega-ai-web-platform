/**
 * HTTP System Adapter
 * 
 * Implements the SystemAdapter interface using HTTP calls.
 * Disabled by default. Enable via NEXT_PUBLIC_ADAPTER_PROVIDER=http
 */

import { getDataSource } from "../../lib/data-sources";
import { getFeatureFlagState } from "../../lib/feature-flags";
import { brokerConnections, riskPermissions, systemLogs } from "../../lib/mock/admin";
import type { DashboardSnapshot, ModuleDefinition, SystemStatus } from "../../lib/types";
import { getAdapterFactory } from "../../lib/adapter-factory";
import { mockSystemAdapter, type SystemAdapter } from "../system-adapter";

/**
 * HTTP-based system adapter
 * 
 * Calls /api/v1/system/*
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
      return await client.get<DashboardSnapshot>("/api/v1/system/dashboard");
    } catch (error) {
      if (factory.shouldUseMockFallback()) {
        console.warn("System dashboard HTTP request failed, falling back to mock", error);
        return mockSystemAdapter.getDashboardSnapshot();
      }
      throw error;
    }
  },

  async getModules(): Promise<ModuleDefinition[]> {
    const factory = getAdapterFactory();
    if (!factory.shouldUseHttp()) {
      return mockSystemAdapter.getModules();
    }

    try {
      const client = factory.createHttpClient();
      const response = await client.get<{ items: ModuleDefinition[] }>("/api/v1/system/modules");
      return response.items;
    } catch (error) {
      if (factory.shouldUseMockFallback()) {
        console.warn("System modules HTTP request failed, falling back to mock", error);
        return mockSystemAdapter.getModules();
      }
      throw error;
    }
  },

  async getSystemStatuses(): Promise<SystemStatus[]> {
    const factory = getAdapterFactory();
    if (!factory.shouldUseHttp()) {
      return mockSystemAdapter.getSystemStatuses();
    }

    try {
      const client = factory.createHttpClient();
      const response = await client.get<{ items: SystemStatus[] }>("/api/v1/system/statuses");
      return response.items;
    } catch (error) {
      if (factory.shouldUseMockFallback()) {
        console.warn("System statuses HTTP request failed, falling back to mock", error);
        return mockSystemAdapter.getSystemStatuses();
      }
      throw error;
    }
  },

  async getBrokerConnections(): Promise<typeof brokerConnections> {
    const factory = getAdapterFactory();
    if (!factory.shouldUseHttp()) {
      return mockSystemAdapter.getBrokerConnections();
    }

    try {
      const client = factory.createHttpClient();
      return await client.get<typeof brokerConnections>("/api/v1/system/broker-connections");
    } catch (error) {
      if (factory.shouldUseMockFallback()) {
        console.warn("Broker connections HTTP request failed, falling back to mock", error);
        return mockSystemAdapter.getBrokerConnections();
      }
      throw error;
    }
  },

  async getRiskPermissions(): Promise<typeof riskPermissions> {
    const factory = getAdapterFactory();
    if (!factory.shouldUseHttp()) {
      return mockSystemAdapter.getRiskPermissions();
    }

    try {
      const client = factory.createHttpClient();
      return await client.get<typeof riskPermissions>("/api/v1/system/risk-permissions");
    } catch (error) {
      if (factory.shouldUseMockFallback()) {
        console.warn("Risk permissions HTTP request failed, falling back to mock", error);
        return mockSystemAdapter.getRiskPermissions();
      }
      throw error;
    }
  },

  async getSystemLogs(): Promise<typeof systemLogs> {
    const factory = getAdapterFactory();
    if (!factory.shouldUseHttp()) {
      return mockSystemAdapter.getSystemLogs();
    }

    try {
      const client = factory.createHttpClient();
      return await client.get<typeof systemLogs>("/api/v1/system/logs");
    } catch (error) {
      if (factory.shouldUseMockFallback()) {
        console.warn("System logs HTTP request failed, falling back to mock", error);
        return mockSystemAdapter.getSystemLogs();
      }
      throw error;
    }
  },

  async getFeatureFlags(): Promise<ReturnType<typeof getFeatureFlagState>> {
    const factory = getAdapterFactory();
    if (!factory.shouldUseHttp()) {
      return mockSystemAdapter.getFeatureFlags();
    }

    try {
      const client = factory.createHttpClient();
      return await client.get<ReturnType<typeof getFeatureFlagState>>("/api/v1/system/feature-flags");
    } catch (error) {
      if (factory.shouldUseMockFallback()) {
        console.warn("Feature flags HTTP request failed, falling back to mock", error);
        return mockSystemAdapter.getFeatureFlags();
      }
      throw error;
    }
  }
};
