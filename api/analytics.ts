import { mockAnalyticsAdapter } from "../adapters/analytics-adapter";
import { mockTradingViewTestingAdapter } from "../adapters/tradingview-testing-adapter";

export const analyticsApi = {
  getAnalyticsGroups: () => mockAnalyticsAdapter.getAnalyticsGroups(),
  getAnalyticsModelSet: () => mockAnalyticsAdapter.getAnalyticsModelSet(),
  getTradingViewTestingSummary: () => mockTradingViewTestingAdapter.getTestingSummary()
};
