import { dashboardMetrics, paperTrades, portfolio } from "../lib/mock/portfolio";
import type { DashboardMetric, PaperTrade, Portfolio } from "../lib/types";

export interface PortfolioService {
  getDashboardMetrics(): Promise<DashboardMetric[]>;
  getPortfolio(): Promise<Portfolio>;
  getPaperTrades(): Promise<PaperTrade[]>;
}

export const mockPortfolioService: PortfolioService = {
  async getDashboardMetrics() {
    return dashboardMetrics;
  },
  async getPortfolio() {
    return portfolio;
  },
  async getPaperTrades() {
    return paperTrades;
  }
};
