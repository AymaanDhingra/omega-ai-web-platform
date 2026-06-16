import { mockStrategyAdapter } from "../adapters/strategy-adapter";

export const strategyApi = {
  getTradeSignals: () => mockStrategyAdapter.getTradeSignals(),
  getStrategies: () => mockStrategyAdapter.getStrategies(),
  getBacktestMetrics: () => mockStrategyAdapter.getBacktestMetrics()
};
