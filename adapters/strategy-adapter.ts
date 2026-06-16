import { getDataSource } from "../lib/data-sources";
import type { DataSourceDescriptor } from "../lib/data-sources";
import type { BacktestMetric, Strategy, TradeSignal } from "../lib/types";
import { mockStrategyService } from "../services/strategy-service";

export interface StrategyAdapter {
  source: DataSourceDescriptor;
  getTradeSignals(): Promise<TradeSignal[]>;
  getStrategies(): Promise<Strategy[]>;
  getBacktestMetrics(): Promise<BacktestMetric[]>;
}

export const mockStrategyAdapter: StrategyAdapter = {
  source: getDataSource("mock"),
  getTradeSignals: () => mockStrategyService.getTradeSignals(),
  getStrategies: () => mockStrategyService.getStrategies(),
  getBacktestMetrics: () => mockStrategyService.getBacktestMetrics()
};
