/**
 * Adapter configuration system
 * 
 * Enables switching between mock and HTTP adapters without changing page code.
 * Configuration is environment-based and can be overridden at runtime.
 * 
 * Design principles:
 * - Configuration drives adapter selection
 * - Mock adapters are the default
 * - HTTP adapters are opt-in via configuration
 * - No page rewrites needed when switching providers
 * - All adapters implement the same interface
 */

export type AdapterProvider = "mock" | "http";

export interface AdapterConfig {
  provider: AdapterProvider;
  httpBaseUrl?: string;
  httpTimeout?: number;
  httpRetries?: number;
  enableMockFallback?: boolean;
}

/**
 * Global adapter configuration
 * 
 * Defaults to mock provider. Can be overridden via environment variables:
 * - NEXT_PUBLIC_ADAPTER_PROVIDER: "mock" | "http"
 * - NEXT_PUBLIC_ADAPTER_HTTP_BASE_URL: string
 * - NEXT_PUBLIC_ADAPTER_HTTP_TIMEOUT: number
 * - NEXT_PUBLIC_ADAPTER_HTTP_RETRIES: number
 * - NEXT_PUBLIC_ADAPTER_ENABLE_MOCK_FALLBACK: "true" | "false"
 */
let globalAdapterConfig: AdapterConfig = {
  provider: (process.env.NEXT_PUBLIC_ADAPTER_PROVIDER as AdapterProvider) || "mock",
  httpBaseUrl: process.env.NEXT_PUBLIC_ADAPTER_HTTP_BASE_URL,
  httpTimeout: process.env.NEXT_PUBLIC_ADAPTER_HTTP_TIMEOUT
    ? parseInt(process.env.NEXT_PUBLIC_ADAPTER_HTTP_TIMEOUT, 10)
    : 30000,
  httpRetries: process.env.NEXT_PUBLIC_ADAPTER_HTTP_RETRIES
    ? parseInt(process.env.NEXT_PUBLIC_ADAPTER_HTTP_RETRIES, 10)
    : 3,
  enableMockFallback: process.env.NEXT_PUBLIC_ADAPTER_ENABLE_MOCK_FALLBACK !== "false"
};

/**
 * Get the current adapter configuration
 */
export function getAdapterConfig(): AdapterConfig {
  return { ...globalAdapterConfig };
}

/**
 * Update the adapter configuration at runtime
 * 
 * Useful for testing or dynamic provider switching.
 * Changes apply to all new adapter instances created after this call.
 */
export function setAdapterConfig(config: Partial<AdapterConfig>): void {
  globalAdapterConfig = {
    ...globalAdapterConfig,
    ...config
  };
}

/**
 * Reset adapter configuration to defaults
 */
export function resetAdapterConfig(): void {
  globalAdapterConfig = {
    provider: "mock",
    httpBaseUrl: undefined,
    httpTimeout: 30000,
    httpRetries: 3,
    enableMockFallback: true
  };
}

/**
 * Check if HTTP adapters are enabled
 */
export function isHttpAdapterEnabled(): boolean {
  return globalAdapterConfig.provider === "http" && !!globalAdapterConfig.httpBaseUrl;
}

/**
 * Check if mock fallback is enabled
 */
export function isMockFallbackEnabled(): boolean {
  return globalAdapterConfig.enableMockFallback === true;
}
