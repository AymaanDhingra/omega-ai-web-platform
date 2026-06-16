import assert from "node:assert/strict";
import { test } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import AdminPage from "../app/admin/page";
import AIPage from "../app/ai/page";
import AnalyticsPage from "../app/analytics/page";
import BacktestingPage from "../app/backtesting/page";
import ChatPage from "../app/chat/page";
import Home from "../app/page";
import KnowledgePage from "../app/knowledge/page";
import MarketsPage from "../app/markets/page";
import NewsPage from "../app/news/page";
import PaperPage from "../app/paper/page";
import PortfolioPage from "../app/portfolio/page";
import SettingsPage from "../app/settings/page";
import StrategiesPage from "../app/strategies/page";
import TradesPage from "../app/trades/page";
import { aiApi } from "../api/ai";
import { analyticsApi } from "../api/analytics";
import { knowledgeApi } from "../api/knowledge";
import { marketApi } from "../api/market";
import { newsApi } from "../api/news";
import { paperTradingApi } from "../api/paperTrading";
import { portfolioApi } from "../api/portfolio";
import { strategyApi } from "../api/strategy";
import { systemApi } from "../api/system";
import { tradingViewTestingApi } from "../api/tradingViewTesting";
import { mockAISystemAdapter } from "../adapters/ai-system-adapter";
import { mockAnalyticsAdapter } from "../adapters/analytics-adapter";
import { mockKnowledgeAdapter } from "../adapters/knowledge-adapter";
import { mockMarketAdapter } from "../adapters/market-adapter";
import { mockNewsAdapter } from "../adapters/news-adapter";
import { mockPaperTradingAdapter } from "../adapters/paper-trading-adapter";
import { mockPortfolioAdapter } from "../adapters/portfolio-adapter";
import { mockStrategyAdapter } from "../adapters/strategy-adapter";
import { mockSystemAdapter } from "../adapters/system-adapter";
import { mockTradingViewTestingAdapter } from "../adapters/tradingview-testing-adapter";
import { MetricCard } from "../components/dashboard/MetricCard";
import { ModuleCard } from "../components/dashboard/ModuleCard";
import { NewsCard } from "../components/dashboard/NewsCard";
import { SystemHealth } from "../components/dashboard/SystemHealth";
import { EmptyState } from "../components/layout/EmptyState";
import { ErrorState } from "../components/layout/ErrorState";
import { LoadingState } from "../components/layout/LoadingState";
import { ModuleHeader } from "../components/layout/ModuleHeader";
import { PageHeader } from "../components/layout/PageHeader";
import { StatusBadge } from "../components/layout/StatusBadge";
import { MarketCard } from "../components/market/MarketCard";
import { TradingViewTestingModule } from "../components/modules/TradingViewTestingModule";
import { TradeCard } from "../components/trading/TradeCard";
import { CURRENT_API_VERSION, createMockResponseMeta } from "../lib/contracts/backend";
import { dataSources, getDataSource } from "../lib/data-sources";
import { createMockEventBus } from "../lib/events";
import { getFeatureFlagState } from "../lib/feature-flags";
import { systemStatuses } from "../lib/mock/ai";
import { marketAssets } from "../lib/mock/market";
import { omegaModules } from "../lib/mock/modules";
import { newsEvents } from "../lib/mock/news";
import { dashboardMetrics } from "../lib/mock/portfolio";
import { tradeSignals } from "../lib/mock/trading";
import { tradingViewTesting } from "../lib/mock/tradingview-testing";
import { failure, loading, offline, success, unavailable } from "../lib/result";
import { mockAISystemService } from "../services/ai-system-service";
import { mockKnowledgeService } from "../services/knowledge-service";
import { mockMarketService } from "../services/market-service";
import { mockNewsService } from "../services/news-service";
import { mockPortfolioService } from "../services/portfolio-service";
import { mockStrategyService } from "../services/strategy-service";

test("dashboard page renders from the mock service snapshot", async () => {
  const page = await Home();
  const html = renderToStaticMarkup(page);

  assert.match(html, /Autonomous Trading Operating Console/);
  assert.match(html, /System Health/);
  assert.match(html, /TradingView Testing Status/);
});

test("all app routes render their module pages", async () => {
  const pages = [
    ["/markets", MarketsPage, "Market Watch"],
    ["/ai", AIPage, "AI Brain"],
    ["/knowledge", KnowledgePage, "Knowledge Center"],
    ["/strategies", StrategiesPage, "Strategy Lab"],
    ["/backtesting", BacktestingPage, "Backtesting"],
    ["/paper", PaperPage, "Paper Trading"],
    ["/portfolio", PortfolioPage, "Portfolio"],
    ["/trades", TradesPage, "Trade Center"],
    ["/analytics", AnalyticsPage, "Analytics"],
    ["/chat", ChatPage, "AI Chat"],
    ["/news", NewsPage, "News Intelligence"],
    ["/admin", AdminPage, "Admin"],
    ["/settings", SettingsPage, "Settings"]
  ] as const;

  for (const [, Page, expectedText] of pages) {
    const html = renderToStaticMarkup(await Page());
    assert.match(html, new RegExp(expectedText));
    assert.match(html, /Live Trading Locked/);
  }
});

test("module registry loads enriched OMEGA modules", async () => {
  const modules = await mockAISystemService.getModules();
  const moduleIds = modules.map((moduleDefinition) => moduleDefinition.id);

  assert.equal(modules.length, 14);
  assert.ok(moduleIds.includes("dashboard"));
  assert.ok(moduleIds.includes("market-watch"));
  assert.ok(moduleIds.includes("ai-brain"));
  assert.ok(moduleIds.includes("news-intelligence"));
  assert.ok(moduleIds.includes("settings"));

  for (const moduleDefinition of modules) {
    assert.ok(moduleDefinition.version);
    assert.ok(moduleDefinition.featureFlag);
    assert.ok(moduleDefinition.pageRoute.startsWith("/"));
    assert.ok(moduleDefinition.currentStatus);
    assert.ok(moduleDefinition.futureBackendDependency);
    assert.ok(moduleDefinition.futureAIDependency);
  }
});

test("feature flags expose all frontend module gates", () => {
  const flags = getFeatureFlagState();

  // 13 core module flags + 3 TradingView flags + 3 persistence flags = 19 total
  assert.equal(Object.keys(flags).length, 19);
  assert.equal(flags.ENABLE_MARKETS, true);
  assert.equal(flags.ENABLE_AI, true);
  assert.equal(flags.ENABLE_SETTINGS, true);
  // TradingView flags default to false (optional)
  assert.equal(flags.ENABLE_TRADINGVIEW_CHARTS, false);
  assert.equal(flags.ENABLE_TRADINGVIEW_WATCHLISTS, false);
  assert.equal(flags.ENABLE_TRADINGVIEW_VALIDATION, false);
  // Persistence flags enabled
  assert.equal(flags.ENABLE_PERSISTENCE, true);
  assert.equal(flags.ENABLE_CACHE, true);
  assert.equal(flags.ENABLE_SESSIONS, true);
});

test("mock services respond with dashboard-ready data", async () => {
  const [markets, portfolio, news, aiBrain, strategies, documents, snapshot] = await Promise.all([
    mockMarketService.getWatchlist(),
    mockPortfolioService.getPortfolio(),
    mockNewsService.getNewsEvents(),
    mockAISystemService.getAIBrain(),
    mockStrategyService.getStrategies(),
    mockKnowledgeService.getDocuments(),
    systemApi.getDashboardSnapshot()
  ]);

  assert.ok(markets.length >= 10);
  assert.equal(portfolio.currency, "INR");
  assert.ok(news.length > 0);
  assert.equal(aiBrain.confidence, 74);
  assert.ok(strategies.length > 0);
  assert.ok(documents.length > 0);
  assert.equal(snapshot.modules.length, omegaModules.length);
  assert.ok(snapshot.analyticsGroups.length >= 7);
});

test("frontend API contracts mirror mock service capabilities", async () => {
  const [markets, portfolio, news, documents, strategies, paperTrades, analytics, analyticsModelSet, aiBrain, modules, tradingViewContracts, dashboard] = await Promise.all([
    marketApi.getWatchlist(),
    portfolioApi.getPortfolio(),
    newsApi.getNewsEvents(),
    knowledgeApi.getDocuments(),
    strategyApi.getStrategies(),
    paperTradingApi.getPaperTrades(),
    analyticsApi.getAnalyticsGroups(),
    analyticsApi.getAnalyticsModelSet(),
    aiApi.getAIBrain(),
    systemApi.getModules(),
    tradingViewTestingApi.getTestingContracts(),
    systemApi.getDashboardSnapshot()
  ]);

  assert.ok(markets.length > 0);
  assert.equal(portfolio.id, "mock-portfolio");
  assert.ok(news.length > 0);
  assert.ok(documents.length > 0);
  assert.ok(strategies.length > 0);
  assert.ok(paperTrades.length > 0);
  assert.ok(analytics.length > 0);
  assert.ok(analyticsModelSet.aiAccuracy.length > 0);
  assert.equal(aiBrain.id, "mock-ai-brain");
  assert.equal(modules.length, omegaModules.length);
  assert.ok(tradingViewContracts.chartStatus.length > 0);
  assert.equal(dashboard.modules.length, omegaModules.length);
});

test("adapter layer exposes mock sources and hides service implementation", async () => {
  const adapters = [
    mockMarketAdapter,
    mockPortfolioAdapter,
    mockAISystemAdapter,
    mockKnowledgeAdapter,
    mockStrategyAdapter,
    mockAnalyticsAdapter,
    mockPaperTradingAdapter,
    mockTradingViewTestingAdapter,
    mockNewsAdapter,
    mockSystemAdapter
  ];

  for (const adapter of adapters) {
    assert.equal(adapter.source.id, "mock");
    assert.equal(adapter.source.kind, "Mock");
  }

  const [markets, portfolio, aiBrain, documents, strategies, analyticsModelSet, paperState, tradingViewContracts, news, dashboard] = await Promise.all([
    mockMarketAdapter.getWatchlist(),
    mockPortfolioAdapter.getPortfolio(),
    mockAISystemAdapter.getAIBrain(),
    mockKnowledgeAdapter.getDocuments(),
    mockStrategyAdapter.getStrategies(),
    mockAnalyticsAdapter.getAnalyticsModelSet(),
    mockPaperTradingAdapter.getPaperTradingState(),
    mockTradingViewTestingAdapter.getTestingContracts(),
    mockNewsAdapter.getNewsEvents(),
    mockSystemAdapter.getDashboardSnapshot()
  ]);

  assert.ok(markets.length > 0);
  assert.equal(portfolio.currency, "INR");
  assert.equal(aiBrain.id, "mock-ai-brain");
  assert.ok(documents.length > 0);
  assert.ok(strategies.length > 0);
  assert.ok(analyticsModelSet.strategyPerformance.length > 0);
  assert.ok(paperState.accounts.length > 0);
  assert.ok(tradingViewContracts.signalValidation.length > 0);
  assert.ok(news.length > 0);
  assert.equal(dashboard.modules.length, omegaModules.length);
});

test("backend contracts, data sources, and app result states are stable", () => {
  const meta = createMockResponseMeta("smoke-contract");
  const mockSource = getDataSource("mock");
  const tradingViewSource = getDataSource("tradingview");
  const stateModels = [
    loading("Loading contracts"),
    success({ ok: true }, "Contracts ready"),
    failure("MOCK_ERROR", "Mock failure", true),
    offline("Mock offline"),
    unavailable("Mock unavailable")
  ];

  assert.equal(CURRENT_API_VERSION, "v1");
  assert.equal(meta.requestId, "smoke-contract");
  assert.equal(meta.mock, true);
  assert.equal(dataSources.length, 7);
  assert.equal(mockSource.enabled, true);
  assert.equal(tradingViewSource.kind, "TradingView");
  assert.equal(tradingViewSource.enabled, false);
  assert.deepEqual(
    stateModels.map((stateModel) => stateModel.state),
    ["loading", "success", "error", "offline", "unavailable"]
  );
});

test("paper trading contracts expose account, order, position, journal, and performance mocks", async () => {
  const [state, accounts, orders, positions, portfolios, journal, performance] = await Promise.all([
    paperTradingApi.getPaperTradingState(),
    paperTradingApi.getPaperAccounts(),
    paperTradingApi.getPaperOrders(),
    paperTradingApi.getPaperPositions(),
    paperTradingApi.getPaperPortfolios(),
    paperTradingApi.getTradeJournal(),
    paperTradingApi.getPerformanceMetrics()
  ]);

  assert.equal(state.accounts[0].status, "Mock");
  assert.equal(accounts[0].currency, "INR");
  assert.ok(orders.length > 0);
  assert.ok(positions.length > 0);
  assert.ok(portfolios[0].equityCurve.length > 0);
  assert.ok(journal[0].thesis.length > 0);
  assert.ok(performance[0].totalTrades > 0);
});

test("TradingView testing contracts stay mock-only and complete", async () => {
  const [contracts, chartStatus, signalValidation, paperComparison, alertStatus, historicalValidation] = await Promise.all([
    tradingViewTestingApi.getTestingContracts(),
    tradingViewTestingApi.getChartStatus(),
    tradingViewTestingApi.getSignalValidation(),
    tradingViewTestingApi.getPaperComparison(),
    tradingViewTestingApi.getAlertStatus(),
    tradingViewTestingApi.getHistoricalValidation()
  ]);

  assert.equal(chartStatus[0].state, "Mock");
  assert.equal(paperComparison[0].status, "Mock");
  assert.equal(alertStatus[0].state, "Mock");
  assert.equal(historicalValidation[0].status, "Mock");
  assert.equal(contracts.chartStatus.length, chartStatus.length);
  assert.equal(contracts.signalValidation.length, signalValidation.length);
});

test("mock event bus publishes, unsubscribes, and retains event history", () => {
  const eventBus = createMockEventBus();
  const receivedEvents: string[] = [];
  const unsubscribe = eventBus.subscribe((event) => {
    receivedEvents.push(event.type);
  });

  eventBus.publish({
    id: "event-market-update",
    type: "market.update",
    createdAt: "mock-clock",
    payload: marketAssets[0]
  });

  unsubscribe();

  eventBus.publish({
    id: "event-news-received",
    type: "news.received",
    createdAt: "mock-clock",
    payload: newsEvents[0]
  });

  assert.deepEqual(receivedEvents, ["market.update"]);
  assert.equal(eventBus.history().length, 2);
  assert.equal(eventBus.history()[1].type, "news.received");
});

test("core UI cards and reusable layout states render representative mock data", () => {
  const html = [
    renderToStaticMarkup(<MetricCard metric={dashboardMetrics[0]} />),
    renderToStaticMarkup(<MarketCard market={marketAssets[0]} />),
    renderToStaticMarkup(<TradeCard signal={tradeSignals[0]} />),
    renderToStaticMarkup(<SystemHealth statuses={systemStatuses} />),
    renderToStaticMarkup(<ModuleCard module={omegaModules[0]} />),
    renderToStaticMarkup(<NewsCard event={newsEvents[0]} />),
    renderToStaticMarkup(<PageHeader title="Test Page" description="Mock page" icon="gauge" module={omegaModules[0]} />),
    renderToStaticMarkup(<ModuleHeader module={omegaModules[0]} />),
    renderToStaticMarkup(<StatusBadge label="Mock" />),
    renderToStaticMarkup(<LoadingState />),
    renderToStaticMarkup(<EmptyState title="Empty" message="No mock records." />),
    renderToStaticMarkup(<ErrorState message="Mock error state." />)
  ].join("\n");

  assert.match(html, /Portfolio Value/);
  assert.match(html, /NIFTY/);
  assert.match(html, /BTCUSDT/);
  assert.match(html, /Frontend/);
  assert.match(html, /Dashboard/);
  assert.match(html, /Economic Calendar/);
  assert.match(html, /Loading mock module/);
  assert.match(html, /Mock error state/);
});

test("TradingView testing placeholder renders without real integration", async () => {
  const summary = await analyticsApi.getTradingViewTestingSummary();
  const validations = await paperTradingApi.getPaperTradingValidation();
  const html = renderToStaticMarkup(<TradingViewTestingModule summary={tradingViewTesting} />);

  assert.equal(summary.status.state, "Mock");
  assert.ok(validations.length > 0);
  assert.match(html, /TradingView Testing Status/);
  assert.match(html, /Signal Comparison/);
  assert.match(html, /BTCUSDT/);
});
