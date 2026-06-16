import { getDataSource } from "../lib/data-sources";
import type { DataSourceDescriptor } from "../lib/data-sources";
import type {
  TradingViewAlertStatus,
  TradingViewChartStatus,
  TradingViewHistoricalValidation,
  TradingViewPaperComparison,
  TradingViewSignalValidation,
  TradingViewTestingContracts
} from "../lib/contracts/tradingview-testing";
import type { TradingViewTestingSummary } from "../lib/types";
import { mockTradingViewTestingService } from "../services/tradingview-testing-service";

export interface TradingViewTestingAdapter {
  source: DataSourceDescriptor;
  getTestingSummary(): Promise<TradingViewTestingSummary>;
  getTestingContracts(): Promise<TradingViewTestingContracts>;
  getChartStatus(): Promise<TradingViewChartStatus[]>;
  getSignalValidation(): Promise<TradingViewSignalValidation[]>;
  getPaperComparison(): Promise<TradingViewPaperComparison[]>;
  getAlertStatus(): Promise<TradingViewAlertStatus[]>;
  getHistoricalValidation(): Promise<TradingViewHistoricalValidation[]>;
}

export const mockTradingViewTestingAdapter: TradingViewTestingAdapter = {
  source: getDataSource("mock"),
  getTestingSummary: () => mockTradingViewTestingService.getTestingSummary(),
  getTestingContracts: () => mockTradingViewTestingService.getTestingContracts(),
  getChartStatus: () => mockTradingViewTestingService.getChartStatus(),
  getSignalValidation: () => mockTradingViewTestingService.getSignalValidation(),
  getPaperComparison: () => mockTradingViewTestingService.getPaperComparison(),
  getAlertStatus: () => mockTradingViewTestingService.getAlertStatus(),
  getHistoricalValidation: () => mockTradingViewTestingService.getHistoricalValidation()
};
