import { mockPaperTradingAdapter } from "../adapters/paper-trading-adapter";
import { mockPortfolioAdapter } from "../adapters/portfolio-adapter";
import { mockTradingViewTestingAdapter } from "../adapters/tradingview-testing-adapter";

export const paperTradingApi = {
  getPaperTrades: () => mockPortfolioAdapter.getPaperTrades(),
  getPaperTradingState: () => mockPaperTradingAdapter.getPaperTradingState(),
  getPaperAccounts: () => mockPaperTradingAdapter.getPaperAccounts(),
  getPaperOrders: () => mockPaperTradingAdapter.getPaperOrders(),
  getPaperPositions: () => mockPaperTradingAdapter.getPaperPositions(),
  getPaperPortfolios: () => mockPaperTradingAdapter.getPaperPortfolios(),
  getTradeJournal: () => mockPaperTradingAdapter.getTradeJournal(),
  getPerformanceMetrics: () => mockPaperTradingAdapter.getPerformanceMetrics(),
  getPaperTradingValidation: async () => {
    const summary = await mockTradingViewTestingAdapter.getTestingSummary();
    return summary.paperTradingValidation;
  }
};
