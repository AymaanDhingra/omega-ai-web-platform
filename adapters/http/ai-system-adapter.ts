/**
 * HTTP AI System Adapter
 * 
 * Implements the AISystemAdapter interface using HTTP calls.
 * Disabled by default. Enable via NEXT_PUBLIC_ADAPTER_PROVIDER=http
 */

import { getDataSource } from "../../lib/data-sources";
import type { DataSourceDescriptor } from "../../lib/data-sources";
import type { AIBrain } from "../../lib/types";
import { getAdapterFactory } from "../../lib/adapter-factory";
import { mockAISystemAdapter } from "../ai-system-adapter";

export interface AISystemAdapter {
  source: DataSourceDescriptor;
  getAIBrain(): Promise<AIBrain>;
}

/**
 * HTTP-based AI system adapter
 * 
 * Calls /api/v1/ai/brain
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
      const response = await client.get<AIBrain>("/api/v1/ai/brain");
      return response;
    } catch (error) {
      if (factory.shouldUseMockFallback()) {
        console.warn("AI brain HTTP request failed, falling back to mock", error);
        return mockAISystemAdapter.getAIBrain();
      }
      throw error;
    }
  }
};
