import { mockPortfolioAdapter } from "../adapters/portfolio-adapter";

export const portfolioApi = {
  getDashboardMetrics: () => mockPortfolioAdapter.getDashboardMetrics(),
  getPortfolio: () => mockPortfolioAdapter.getPortfolio(),
  getPaperTrades: () => mockPortfolioAdapter.getPaperTrades()
};
