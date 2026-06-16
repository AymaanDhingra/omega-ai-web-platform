import { backtestMetrics, strategies, tradeSignals } from "../lib/mock/trading";
import type { BacktestMetric, Strategy, TradeSignal } from "../lib/types";

export interface StrategyService {
  getTradeSignals(): Promise<TradeSignal[]>;
  getStrategies(): Promise<Strategy[]>;
  getBacktestMetrics(): Promise<BacktestMetric[]>;
}

export const mockStrategyService: StrategyService = {
  async getTradeSignals() {
    return tradeSignals;
  },
  async getStrategies() {
    return strategies;
  },
  async getBacktestMetrics() {
    return backtestMetrics;
  }
};
