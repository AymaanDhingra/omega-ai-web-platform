import { describe, it, assert } from "tsx/esm/test";
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

describe("Adapter Integration", () => {
  it("all mock adapters return valid data", async () => {
    const watchlist = await mockMarketAdapter.getWatchlist();
    assert(Array.isArray(watchlist));
    assert(watchlist.length > 0);

    const portfolio = await mockPortfolioAdapter.getSummary();
    assert(portfolio !== undefined);
    assert(portfolio.totalValue !== undefined);

    const ai = await mockAISystemAdapter.getAIBrain();
    assert(ai !== undefined);
    assert(ai.confidence !== undefined);

    const docs = await mockKnowledgeAdapter.getDocuments();
    assert(Array.isArray(docs));

    const strategies = await mockStrategyAdapter.getStrategies();
    assert(Array.isArray(strategies));

    const news = await mockNewsAdapter.getNews();
    assert(Array.isArray(news));

    const analytics = await mockAnalyticsAdapter.getAnalytics();
    assert(Array.isArray(analytics));

    const accounts = await mockPaperTradingAdapter.getAccounts();
    assert(Array.isArray(accounts));

    const trades = await mockPaperTradingAdapter.getTrades();
    assert(Array.isArray(trades));

    const tvData = await mockTradingViewTestingAdapter.getTestingData();
    assert(tvData !== undefined);

    const snapshot = await mockSystemAdapter.getDashboardSnapshot();
    assert(snapshot !== undefined);
  });

  it("all adapters have valid data sources", async () => {
    assert(mockMarketAdapter.source !== undefined);
    assert(mockMarketAdapter.source.type !== undefined);

    assert(mockPortfolioAdapter.source !== undefined);
    assert(mockPortfolioAdapter.source.type !== undefined);

    assert(mockAISystemAdapter.source !== undefined);
    assert(mockAISystemAdapter.source.type !== undefined);

    assert(mockKnowledgeAdapter.source !== undefined);
    assert(mockKnowledgeAdapter.source.type !== undefined);

    assert(mockStrategyAdapter.source !== undefined);
    assert(mockStrategyAdapter.source.type !== undefined);

    assert(mockNewsAdapter.source !== undefined);
    assert(mockNewsAdapter.source.type !== undefined);

    assert(mockAnalyticsAdapter.source !== undefined);
    assert(mockAnalyticsAdapter.source.type !== undefined);

    assert(mockPaperTradingAdapter.source !== undefined);
    assert(mockPaperTradingAdapter.source.type !== undefined);

    assert(mockTradingViewTestingAdapter.source !== undefined);
    assert(mockTradingViewTestingAdapter.source.type !== undefined);

    assert(mockSystemAdapter.source !== undefined);
    assert(mockSystemAdapter.source.type !== undefined);
  });
});
