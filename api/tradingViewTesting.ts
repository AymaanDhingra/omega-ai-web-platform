import { mockTradingViewTestingAdapter } from "../adapters/tradingview-testing-adapter";

export const tradingViewTestingApi = {
  getTestingSummary: () => mockTradingViewTestingAdapter.getTestingSummary(),
  getTestingContracts: () => mockTradingViewTestingAdapter.getTestingContracts(),
  getChartStatus: () => mockTradingViewTestingAdapter.getChartStatus(),
  getSignalValidation: () => mockTradingViewTestingAdapter.getSignalValidation(),
  getPaperComparison: () => mockTradingViewTestingAdapter.getPaperComparison(),
  getAlertStatus: () => mockTradingViewTestingAdapter.getAlertStatus(),
  getHistoricalValidation: () => mockTradingViewTestingAdapter.getHistoricalValidation()
};
