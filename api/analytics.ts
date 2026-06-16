import { mockAnalyticsAdapter } from "../adapters/analytics-adapter";
import { mockTradingViewTestingAdapter } from "../adapters/tradingview-testing-adapter";

export const analyticsApi = {
  getAnalyticsGroups: () => mockAnalyticsAdapter.getAnalyticsGroups(),
  getAnalyticsModelSet: () => mockAnalyticsAdapter.getAnalyticsModelSet(),
  getAdvancedAnalytics: () => mockAnalyticsAdapter.getAdvancedAnalytics(),
  getAnalyticsSummary: () => mockAnalyticsAdapter.getAdvancedAnalytics().summarize(),
  getAnalyticsSnapshot: () => mockAnalyticsAdapter.getAdvancedAnalytics().createSnapshot(),
  getTradingViewTestingSummary: () => mockTradingViewTestingAdapter.getTestingSummary()
};
