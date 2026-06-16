/**
 * HTTP AI System Adapter
 * 
 * Implements the AISystemAdapter interface using HTTP calls.
 * Disabled by default. Enable via NEXT_PUBLIC_ADAPTER_PROVIDER=http
 */

import { getDataSource } from "../../lib/data-sources";
import type { AIBrain, ModuleDefinition, SystemStatus, TradingMode } from "../../lib/types";
import { getAdapterFactory } from "../../lib/adapter-factory";
import { mockAISystemAdapter, type AISystemAdapter } from "../ai-system-adapter";

/**
 * HTTP-based AI system adapter
 * 
 * Calls /api/v1/ai/*
 * Falls back to mock adapter if HTTP is disabled or fails
 */
export const httpAISystemAdapter: AISystemAdapter = {
  source: getDataSource("rest"),

  async getAIBrain(): Promise<AIBrain> {
    const factory = getAdapterFactory();
    if (!factory.shouldUseHttp()) {
      return mockAISystemAdapter.getAIBrain();
    }

    try {
      const client = factory.createHttpClient();
      return await client.get<AIBrain>("/api/v1/ai/brain");
    } catch (error) {
      if (factory.shouldUseMockFallback()) {
        console.warn("AI brain HTTP request failed, falling back to mock", error);
        return mockAISystemAdapter.getAIBrain();
      }
      throw error;
    }
  },

  async getSystemStatuses(): Promise<SystemStatus[]> {
    const factory = getAdapterFactory();
    if (!factory.shouldUseHttp()) {
      return mockAISystemAdapter.getSystemStatuses();
    }

    try {
      const client = factory.createHttpClient();
      const response = await client.get<{ items: SystemStatus[] }>("/api/v1/ai/system-statuses");
      return response.items;
    } catch (error) {
      if (factory.shouldUseMockFallback()) {
        console.warn("System statuses HTTP request failed, falling back to mock", error);
        return mockAISystemAdapter.getSystemStatuses();
      }
      throw error;
    }
  },

  async getTradingModes(): Promise<TradingMode[]> {
    const factory = getAdapterFactory();
    if (!factory.shouldUseHttp()) {
      return mockAISystemAdapter.getTradingModes();
    }

    try {
      const client = factory.createHttpClient();
      const response = await client.get<{ items: TradingMode[] }>("/api/v1/ai/trading-modes");
      return response.items;
    } catch (error) {
      if (factory.shouldUseMockFallback()) {
        console.warn("Trading modes HTTP request failed, falling back to mock", error);
        return mockAISystemAdapter.getTradingModes();
      }
      throw error;
    }
  },

  async getChatCommands(): Promise<string[]> {
    const factory = getAdapterFactory();
    if (!factory.shouldUseHttp()) {
      return mockAISystemAdapter.getChatCommands();
    }

    try {
      const client = factory.createHttpClient();
      const response = await client.get<{ items: string[] }>("/api/v1/ai/chat-commands");
      return response.items;
    } catch (error) {
      if (factory.shouldUseMockFallback()) {
        console.warn("Chat commands HTTP request failed, falling back to mock", error);
        return mockAISystemAdapter.getChatCommands();
      }
      throw error;
    }
  },

  async getModules(): Promise<ModuleDefinition[]> {
    const factory = getAdapterFactory();
    if (!factory.shouldUseHttp()) {
      return mockAISystemAdapter.getModules();
    }

    try {
      const client = factory.createHttpClient();
      const response = await client.get<{ items: ModuleDefinition[] }>("/api/v1/ai/modules");
      return response.items;
    } catch (error) {
      if (factory.shouldUseMockFallback()) {
        console.warn("Modules HTTP request failed, falling back to mock", error);
        return mockAISystemAdapter.getModules();
      }
      throw error;
    }
  }
};
