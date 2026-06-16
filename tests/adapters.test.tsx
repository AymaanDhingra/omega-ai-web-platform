import { describe, it, assert } from "tsx/esm/test";
import type { MarketAdapter } from "../adapters/market-adapter";
import type { PortfolioAdapter } from "../adapters/portfolio-adapter";
import type { AISystemAdapter } from "../adapters/ai-system-adapter";
import type { KnowledgeAdapter } from "../adapters/knowledge-adapter";
import type { StrategyAdapter } from "../adapters/strategy-adapter";
import type { NewsAdapter } from "../adapters/news-adapter";
import type { AnalyticsAdapter } from "../adapters/analytics-adapter";
import type { PaperTradingAdapter } from "../adapters/paper-trading-adapter";
import type { TradingViewTestingAdapter } from "../adapters/tradingview-testing-adapter";
import type { SystemAdapter } from "../adapters/system-adapter";
import { mockMarketAdapter } from "../adapters/market-adapter";
import { mockPortfolioAdapter } from "../adapters/portfolio-adapter";
import { mockAISystemAdapter } from "../adapters/ai-system-adapter";
import { mockKnowledgeAdapter } from "../adapters/knowledge-adapter";
import { mockStrategyAdapter } from "../adapters/strategy-adapter";
import { mockNewsAdapter } from "../adapters/news-adapter";
import { mockAnalyticsAdapter } from "../adapters/analytics-adapter";
import { mockPaperTradingAdapter } from "../adapters/paper-trading-adapter";
import { mockTradingViewTestingAdapter } from "../adapters/tradingview-testing-adapter";
import { mockSystemAdapter } from "../adapters/system-adapter";
import { httpMarketAdapter } from "../adapters/http/market-adapter";
import { httpPortfolioAdapter } from "../adapters/http/portfolio-adapter";
import { httpAISystemAdapter } from "../adapters/http/ai-system-adapter";
import { httpKnowledgeAdapter } from "../adapters/http/knowledge-adapter";
import { httpStrategyAdapter } from "../adapters/http/strategy-adapter";
import { httpNewsAdapter } from "../adapters/http/news-adapter";
import { httpAnalyticsAdapter } from "../adapters/http/analytics-adapter";
import { httpPaperTradingAdapter } from "../adapters/http/paper-trading-adapter";
import { httpTradingViewTestingAdapter } from "../adapters/http/tradingview-testing-adapter";
import { httpSystemAdapter } from "../adapters/http/system-adapter";
import {
  getAdapterConfig,
  setAdapterConfig,
  resetAdapterConfig,
  isHttpAdapterEnabled,
  isMockFallbackEnabled
} from "../lib/adapter-config";
import { getAdapterFactory, resetAdapterFactory } from "../lib/adapter-factory";

describe("Adapter Interface Compatibility", () => {
  it("Market adapters implement same interface", async () => {
    // Mock adapter
    assert(mockMarketAdapter.source !== undefined);
    assert(typeof mockMarketAdapter.getWatchlist === "function");
    assert(typeof mockMarketAdapter.getCandles === "function");

    // HTTP adapter
    assert(httpMarketAdapter.source !== undefined);
    assert(typeof httpMarketAdapter.getWatchlist === "function");
    assert(typeof httpMarketAdapter.getCandles === "function");

    // Both should return data
    const mockWatchlist = await mockMarketAdapter.getWatchlist();
    assert(Array.isArray(mockWatchlist));
    assert(mockWatchlist.length > 0);
  });

  it("Portfolio adapters implement same interface", async () => {
    assert(mockPortfolioAdapter.source !== undefined);
    assert(typeof mockPortfolioAdapter.getSummary === "function");

    assert(httpPortfolioAdapter.source !== undefined);
    assert(typeof httpPortfolioAdapter.getSummary === "function");

    const mockPortfolio = await mockPortfolioAdapter.getSummary();
    assert(mockPortfolio !== undefined);
  });

  it("AI System adapters implement same interface", async () => {
    assert(mockAISystemAdapter.source !== undefined);
    assert(typeof mockAISystemAdapter.getAIBrain === "function");

    assert(httpAISystemAdapter.source !== undefined);
    assert(typeof httpAISystemAdapter.getAIBrain === "function");

    const mockAI = await mockAISystemAdapter.getAIBrain();
    assert(mockAI !== undefined);
  });

  it("Knowledge adapters implement same interface", async () => {
    assert(mockKnowledgeAdapter.source !== undefined);
    assert(typeof mockKnowledgeAdapter.getDocuments === "function");

    assert(httpKnowledgeAdapter.source !== undefined);
    assert(typeof httpKnowledgeAdapter.getDocuments === "function");

    const mockDocs = await mockKnowledgeAdapter.getDocuments();
    assert(Array.isArray(mockDocs));
  });

  it("Strategy adapters implement same interface", async () => {
    assert(mockStrategyAdapter.source !== undefined);
    assert(typeof mockStrategyAdapter.getStrategies === "function");

    assert(httpStrategyAdapter.source !== undefined);
    assert(typeof httpStrategyAdapter.getStrategies === "function");

    const mockStrategies = await mockStrategyAdapter.getStrategies();
    assert(Array.isArray(mockStrategies));
  });

  it("News adapters implement same interface", async () => {
    assert(mockNewsAdapter.source !== undefined);
    assert(typeof mockNewsAdapter.getNews === "function");

    assert(httpNewsAdapter.source !== undefined);
    assert(typeof httpNewsAdapter.getNews === "function");

    const mockNews = await mockNewsAdapter.getNews();
    assert(Array.isArray(mockNews));
  });

  it("Analytics adapters implement same interface", async () => {
    assert(mockAnalyticsAdapter.source !== undefined);
    assert(typeof mockAnalyticsAdapter.getAnalyticsGroups === "function");

    assert(httpAnalyticsAdapter.source !== undefined);
    assert(typeof httpAnalyticsAdapter.getAnalyticsGroups === "function");

    const mockAnalytics = await mockAnalyticsAdapter.getAnalyticsGroups();
    assert(Array.isArray(mockAnalytics));
  });

  it("Paper Trading adapters implement same interface", async () => {
    assert(mockPaperTradingAdapter.source !== undefined);
    assert(typeof mockPaperTradingAdapter.getAccounts === "function");
    assert(typeof mockPaperTradingAdapter.getTrades === "function");

    assert(httpPaperTradingAdapter.source !== undefined);
    assert(typeof httpPaperTradingAdapter.getAccounts === "function");
    assert(typeof httpPaperTradingAdapter.getTrades === "function");

    const mockAccounts = await mockPaperTradingAdapter.getAccounts();
    assert(Array.isArray(mockAccounts));
  });

  it("TradingView Testing adapters implement same interface", async () => {
    assert(mockTradingViewTestingAdapter.source !== undefined);
    assert(typeof mockTradingViewTestingAdapter.getTestingData === "function");

    assert(httpTradingViewTestingAdapter.source !== undefined);
    assert(typeof httpTradingViewTestingAdapter.getTestingData === "function");

    const mockData = await mockTradingViewTestingAdapter.getTestingData();
    assert(mockData !== undefined);
  });

  it("System adapters implement same interface", async () => {
    assert(mockSystemAdapter.source !== undefined);
    assert(typeof mockSystemAdapter.getDashboardSnapshot === "function");

    assert(httpSystemAdapter.source !== undefined);
    assert(typeof httpSystemAdapter.getDashboardSnapshot === "function");

    const mockSnapshot = await mockSystemAdapter.getDashboardSnapshot();
    assert(mockSnapshot !== undefined);
  });
});

describe("Adapter Configuration", () => {
  afterEach(() => {
    resetAdapterConfig();
    resetAdapterFactory();
  });

  it("defaults to mock provider", () => {
    resetAdapterConfig();
    const config = getAdapterConfig();
    assert(config.provider === "mock");
  });

  it("can be configured to use HTTP", () => {
    setAdapterConfig({
      provider: "http",
      httpBaseUrl: "http://localhost:8000"
    });
    const config = getAdapterConfig();
    assert(config.provider === "http");
    assert(config.httpBaseUrl === "http://localhost:8000");
  });

  it("enables mock fallback by default", () => {
    resetAdapterConfig();
    assert(isMockFallbackEnabled() === true);
  });

  it("can disable mock fallback", () => {
    setAdapterConfig({ enableMockFallback: false });
    assert(isMockFallbackEnabled() === false);
  });

  it("HTTP adapter is disabled by default", () => {
    resetAdapterConfig();
    assert(isHttpAdapterEnabled() === false);
  });

  it("HTTP adapter is enabled when configured", () => {
    setAdapterConfig({
      provider: "http",
      httpBaseUrl: "http://localhost:8000"
    });
    assert(isHttpAdapterEnabled() === true);
  });

  it("can reset configuration", () => {
    setAdapterConfig({
      provider: "http",
      httpBaseUrl: "http://localhost:8000"
    });
    resetAdapterConfig();
    const config = getAdapterConfig();
    assert(config.provider === "mock");
    assert(config.httpBaseUrl === undefined);
  });
});

describe("Adapter Factory", () => {
  afterEach(() => {
    resetAdapterConfig();
    resetAdapterFactory();
  });

  it("creates HTTP client when configured", () => {
    setAdapterConfig({
      provider: "http",
      httpBaseUrl: "http://localhost:8000"
    });
    const factory = getAdapterFactory();
    const client = factory.createHttpClient();
    assert(client !== undefined);
    assert(typeof client.get === "function");
    assert(typeof client.post === "function");
  });

  it("reports HTTP adapter status correctly", () => {
    resetAdapterConfig();
    const factory = getAdapterFactory();
    assert(factory.shouldUseHttp() === false);

    setAdapterConfig({
      provider: "http",
      httpBaseUrl: "http://localhost:8000"
    });
    const factory2 = getAdapterFactory();
    assert(factory2.shouldUseHttp() === true);
  });

  it("reports mock fallback status correctly", () => {
    const factory = getAdapterFactory();
    assert(factory.shouldUseMockFallback() === true);

    setAdapterConfig({ enableMockFallback: false });
    const factory2 = getAdapterFactory();
    assert(factory2.shouldUseMockFallback() === false);
  });
});
