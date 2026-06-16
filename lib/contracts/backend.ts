import type {
  AIBrain,
  AnalyticsGroup,
  DashboardMetric,
  KnowledgeDocument,
  MarketAsset,
  ModuleDefinition,
  NewsEvent,
  Portfolio,
  Strategy,
  SystemStatus,
  TradeSignal
} from "../types";

export type ApiVersion = "v1";

export type ApiErrorCode =
  | "BAD_REQUEST"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "CONFLICT"
  | "RATE_LIMITED"
  | "PROVIDER_UNAVAILABLE"
  | "VALIDATION_ERROR"
  | "INTERNAL_ERROR";

export interface ApiError {
  code: ApiErrorCode;
  message: string;
  details?: Record<string, unknown>;
  retryable: boolean;
}

export interface ApiRequestMeta {
  requestId: string;
  version: ApiVersion;
  requestedAt: string;
  source: "frontend";
}

export interface ApiResponseMeta {
  requestId: string;
  version: ApiVersion;
  servedAt: string;
  mock: boolean;
}

export interface ApiSuccess<T> {
  ok: true;
  data: T;
  meta: ApiResponseMeta;
}

export interface ApiFailure {
  ok: false;
  error: ApiError;
  meta: ApiResponseMeta;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

export interface PaginationRequest {
  page?: number;
  pageSize?: number;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export type FilterOperator = "eq" | "neq" | "contains" | "gte" | "lte" | "in";

export interface FilterRule {
  field: string;
  operator: FilterOperator;
  value: string | number | boolean | string[] | number[];
}

export interface SortRule {
  field: string;
  direction: "asc" | "desc";
}

export interface QueryRequest extends PaginationRequest {
  filters?: FilterRule[];
  sort?: SortRule[];
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: PaginationMeta;
}

export interface MarketWatchlistRequest extends QueryRequest {
  groups?: string[];
  symbols?: string[];
}

export interface PortfolioSummaryRequest {
  accountId?: string;
  currency?: string;
}

export interface NewsRequest extends QueryRequest {
  sources?: string[];
  impact?: string[];
}

export interface KnowledgeSearchRequest extends QueryRequest {
  query?: string;
  documentTypes?: string[];
}

export interface StrategyRequest extends QueryRequest {
  status?: string[];
  regime?: string[];
}

export interface AIAnalysisRequest {
  symbol?: string;
  market?: string;
  prompt?: string;
}

export interface SystemStatusRequest {
  includeModules?: boolean;
  includeFlags?: boolean;
}

export interface BackendContractMap {
  marketWatchlist: {
    request: MarketWatchlistRequest;
    response: PaginatedResponse<MarketAsset>;
  };
  portfolioSummary: {
    request: PortfolioSummaryRequest;
    response: Portfolio;
  };
  newsEvents: {
    request: NewsRequest;
    response: PaginatedResponse<NewsEvent>;
  };
  knowledgeDocuments: {
    request: KnowledgeSearchRequest;
    response: PaginatedResponse<KnowledgeDocument>;
  };
  strategies: {
    request: StrategyRequest;
    response: PaginatedResponse<Strategy>;
  };
  aiAnalysis: {
    request: AIAnalysisRequest;
    response: AIBrain;
  };
  systemStatus: {
    request: SystemStatusRequest;
    response: {
      modules: ModuleDefinition[];
      statuses: SystemStatus[];
    };
  };
  dashboard: {
    request: SystemStatusRequest;
    response: {
      metrics: DashboardMetric[];
      signals: TradeSignal[];
      analytics: AnalyticsGroup[];
    };
  };
}

export const CURRENT_API_VERSION: ApiVersion = "v1";

export function createMockResponseMeta(requestId = "mock-request"): ApiResponseMeta {
  return {
    requestId,
    version: CURRENT_API_VERSION,
    servedAt: "mock-clock",
    mock: true
  };
}
