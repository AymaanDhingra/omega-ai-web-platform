/**
 * Generic HTTP client abstraction
 * 
 * Provides a transport-independent interface for making HTTP requests.
 * Supports future extensions for WebSocket, gRPC, and other transports.
 * 
 * Design principles:
 * - Keep transport independent
 * - Support request/response metadata
 * - Handle errors consistently
 * - Enable request/response interceptors
 * - Support timeout and retry policies
 */

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface HttpRequestConfig {
  method: HttpMethod;
  url: string;
  headers?: Record<string, string>;
  body?: unknown;
  timeout?: number;
  retries?: number;
}

export interface HttpResponseConfig {
  status: number;
  headers: Record<string, string>;
  body: unknown;
  duration: number;
}

export interface HttpError extends Error {
  status?: number;
  code?: string;
  retryable: boolean;
}

export interface HttpClientConfig {
  baseUrl?: string;
  timeout?: number;
  retries?: number;
  headers?: Record<string, string>;
}

export interface HttpClient {
  get<T>(url: string, config?: Partial<HttpRequestConfig>): Promise<T>;
  post<T>(url: string, body?: unknown, config?: Partial<HttpRequestConfig>): Promise<T>;
  put<T>(url: string, body?: unknown, config?: Partial<HttpRequestConfig>): Promise<T>;
  patch<T>(url: string, body?: unknown, config?: Partial<HttpRequestConfig>): Promise<T>;
  delete<T>(url: string, config?: Partial<HttpRequestConfig>): Promise<T>;
  request<T>(config: HttpRequestConfig): Promise<T>;
}

/**
 * Default HTTP client implementation using fetch API
 * 
 * This is a basic implementation suitable for browser and Node.js environments.
 * Future implementations may use axios, got, or other HTTP libraries.
 */
export class FetchHttpClient implements HttpClient {
  private baseUrl: string;
  private timeout: number;
  private retries: number;
  private defaultHeaders: Record<string, string>;

  constructor(config: HttpClientConfig = {}) {
    this.baseUrl = config.baseUrl || "";
    this.timeout = config.timeout || 30000;
    this.retries = config.retries || 3;
    this.defaultHeaders = {
      "Content-Type": "application/json",
      ...config.headers
    };
  }

  async get<T>(url: string, config?: Partial<HttpRequestConfig>): Promise<T> {
    return this.request<T>({
      method: "GET",
      url,
      ...config
    });
  }

  async post<T>(url: string, body?: unknown, config?: Partial<HttpRequestConfig>): Promise<T> {
    return this.request<T>({
      method: "POST",
      url,
      body,
      ...config
    });
  }

  async put<T>(url: string, body?: unknown, config?: Partial<HttpRequestConfig>): Promise<T> {
    return this.request<T>({
      method: "PUT",
      url,
      body,
      ...config
    });
  }

  async patch<T>(url: string, body?: unknown, config?: Partial<HttpRequestConfig>): Promise<T> {
    return this.request<T>({
      method: "PATCH",
      url,
      body,
      ...config
    });
  }

  async delete<T>(url: string, config?: Partial<HttpRequestConfig>): Promise<T> {
    return this.request<T>({
      method: "DELETE",
      url,
      ...config
    });
  }

  async request<T>(config: HttpRequestConfig): Promise<T> {
    const url = this.baseUrl ? `${this.baseUrl}${config.url}` : config.url;
    const timeout = config.timeout || this.timeout;
    const retries = config.retries ?? this.retries;

    let lastError: HttpError | null = null;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const response = await fetch(url, {
          method: config.method,
          headers: {
            ...this.defaultHeaders,
            ...config.headers
          },
          body: config.body ? JSON.stringify(config.body) : undefined,
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const error: HttpError = new Error(`HTTP ${response.status}`);
          error.status = response.status;
          error.retryable = response.status >= 500 || response.status === 429;
          lastError = error;

          if (!error.retryable) {
            throw error;
          }

          if (attempt < retries) {
            await this.delay(Math.pow(2, attempt) * 100);
            continue;
          }

          throw error;
        }

        const data = await response.json();
        return data as T;
      } catch (error) {
        if (error instanceof Error) {
          const httpError: HttpError = error as HttpError;
          httpError.retryable = httpError.retryable ?? true;
          lastError = httpError;
        }

        if (attempt < retries) {
          await this.delay(Math.pow(2, attempt) * 100);
          continue;
        }

        throw lastError || error;
      }
    }

    throw lastError || new Error("Request failed");
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

/**
 * Create a new HTTP client instance
 */
export function createHttpClient(config?: HttpClientConfig): HttpClient {
  return new FetchHttpClient(config);
}
