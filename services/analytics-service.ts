import { analyticsGroups } from "../lib/mock/analytics";
import { analyticsModelSet } from "../lib/mock/analytics-models";
import { tradingViewTesting } from "../lib/mock/tradingview-testing";
import type { AnalyticsModelSet } from "../lib/contracts/analytics";
import type { AnalyticsGroup, TradingViewTestingSummary } from "../lib/types";

export interface AnalyticsService {
  getAnalyticsGroups(): Promise<AnalyticsGroup[]>;
  getAnalyticsModelSet(): Promise<AnalyticsModelSet>;
  getTradingViewTestingSummary(): Promise<TradingViewTestingSummary>;
}

export const mockAnalyticsService: AnalyticsService = {
  async getAnalyticsGroups() {
    return analyticsGroups;
  },
  async getAnalyticsModelSet() {
    return analyticsModelSet;
  },
  async getTradingViewTestingSummary() {
    return tradingViewTesting;
  }
};
