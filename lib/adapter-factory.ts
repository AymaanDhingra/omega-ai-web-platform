/**
 * Adapter factory pattern
 * 
 * Creates adapter instances based on configuration.
 * Handles switching between mock and HTTP providers.
 * Implements fallback logic when configured.
 * 
 * Design principles:
 * - Factory creates adapters based on configuration
 * - Adapters are created on-demand
 * - Configuration changes affect new instances
 * - Fallback logic is transparent to consumers
 */

import { getAdapterConfig, isHttpAdapterEnabled, isMockFallbackEnabled } from "./adapter-config";
import type { HttpClient } from "./http/client";
import { createHttpClient } from "./http/client";

export interface AdapterFactory {
  createHttpClient(): HttpClient;
  shouldUseHttp(): boolean;
  shouldUseMockFallback(): boolean;
}

let httpClientInstance: HttpClient | null = null;

/**
 * Get or create the global HTTP client instance
 */
function getHttpClient(): HttpClient {
  if (!httpClientInstance) {
    const config = getAdapterConfig();
    httpClientInstance = createHttpClient({
      baseUrl: config.httpBaseUrl,
      timeout: config.httpTimeout,
      retries: config.httpRetries
    });
  }
  return httpClientInstance;
}

/**
 * Create a new adapter factory
 */
export function createAdapterFactory(): AdapterFactory {
  return {
    createHttpClient(): HttpClient {
      return getHttpClient();
    },

    shouldUseHttp(): boolean {
      return isHttpAdapterEnabled();
    },

    shouldUseMockFallback(): boolean {
      return isMockFallbackEnabled();
    }
  };
}

/**
 * Global adapter factory instance
 */
let globalFactory: AdapterFactory | null = null;

/**
 * Get the global adapter factory
 */
export function getAdapterFactory(): AdapterFactory {
  if (!globalFactory) {
    globalFactory = createAdapterFactory();
  }
  return globalFactory;
}

/**
 * Reset the global adapter factory
 * Useful for testing
 */
export function resetAdapterFactory(): void {
  globalFactory = null;
  httpClientInstance = null;
}
