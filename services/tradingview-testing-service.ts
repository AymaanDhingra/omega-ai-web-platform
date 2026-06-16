import { tradingViewTesting } from "../lib/mock/tradingview-testing";
import { tradingViewTestingContracts } from "../lib/mock/tradingview-contracts";
import type { TradingViewTestingSummary } from "../lib/types";
import type {
  TradingViewAlertStatus,
  TradingViewChartStatus,
  TradingViewHistoricalValidation,
  TradingViewPaperComparison,
  TradingViewSignalValidation,
  TradingViewTestingContracts
} from "../lib/contracts/tradingview-testing";

export interface TradingViewTestingService {
  getTestingSummary(): Promise<TradingViewTestingSummary>;
  getTestingContracts(): Promise<TradingViewTestingContracts>;
  getChartStatus(): Promise<TradingViewChartStatus[]>;
  getSignalValidation(): Promise<TradingViewSignalValidation[]>;
  getPaperComparison(): Promise<TradingViewPaperComparison[]>;
  getAlertStatus(): Promise<TradingViewAlertStatus[]>;
  getHistoricalValidation(): Promise<TradingViewHistoricalValidation[]>;
}

export const mockTradingViewTestingService: TradingViewTestingService = {
  async getTestingSummary() {
    return tradingViewTesting;
  },
  async getTestingContracts() {
    return tradingViewTestingContracts;
  },
  async getChartStatus() {
    return tradingViewTestingContracts.chartStatus;
  },
  async getSignalValidation() {
    return tradingViewTestingContracts.signalValidation;
  },
  async getPaperComparison() {
    return tradingViewTestingContracts.paperComparison;
  },
  async getAlertStatus() {
    return tradingViewTestingContracts.alertStatus;
  },
  async getHistoricalValidation() {
    return tradingViewTestingContracts.historicalValidation;
  }
};
