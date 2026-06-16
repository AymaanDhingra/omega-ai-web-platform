import { getDataSource } from "../lib/data-sources";
import type { DataSourceDescriptor } from "../lib/data-sources";
import type { DashboardMetric, PaperTrade, Portfolio } from "../lib/types";
import { mockPortfolioService } from "../services/portfolio-service";

export interface PortfolioAdapter {
  source: DataSourceDescriptor;
  getDashboardMetrics(): Promise<DashboardMetric[]>;
  getPortfolio(): Promise<Portfolio>;
  getPaperTrades(): Promise<PaperTrade[]>;
}

export const mockPortfolioAdapter: PortfolioAdapter = {
  source: getDataSource("mock"),
  getDashboardMetrics: () => mockPortfolioService.getDashboardMetrics(),
  getPortfolio: () => mockPortfolioService.getPortfolio(),
  getPaperTrades: () => mockPortfolioService.getPaperTrades()
};
