import { getDataSource } from "../lib/data-sources";
import type { DataSourceDescriptor } from "../lib/data-sources";
import type {
  PaperAccount,
  PaperOrder,
  PaperPerformanceMetrics,
  PaperPortfolio,
  PaperPosition,
  PaperTradingState,
  TradeJournalEntry
} from "../lib/contracts/paper-trading";
import { mockPaperTradingService } from "../services/paper-trading-service";

export interface PaperTradingAdapter {
  source: DataSourceDescriptor;
  getPaperTradingState(): Promise<PaperTradingState>;
  getPaperAccounts(): Promise<PaperAccount[]>;
  getPaperOrders(): Promise<PaperOrder[]>;
  getPaperPositions(): Promise<PaperPosition[]>;
  getPaperPortfolios(): Promise<PaperPortfolio[]>;
  getTradeJournal(): Promise<TradeJournalEntry[]>;
  getPerformanceMetrics(): Promise<PaperPerformanceMetrics[]>;
}

export const mockPaperTradingAdapter: PaperTradingAdapter = {
  source: getDataSource("mock"),
  getPaperTradingState: () => mockPaperTradingService.getPaperTradingState(),
  getPaperAccounts: () => mockPaperTradingService.getPaperAccounts(),
  getPaperOrders: () => mockPaperTradingService.getPaperOrders(),
  getPaperPositions: () => mockPaperTradingService.getPaperPositions(),
  getPaperPortfolios: () => mockPaperTradingService.getPaperPortfolios(),
  getTradeJournal: () => mockPaperTradingService.getTradeJournal(),
  getPerformanceMetrics: () => mockPaperTradingService.getPerformanceMetrics()
};
