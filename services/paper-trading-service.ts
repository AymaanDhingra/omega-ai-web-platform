import { paperTradingState } from "../lib/mock/paper-trading";
import type {
  PaperAccount,
  PaperOrder,
  PaperPerformanceMetrics,
  PaperPortfolio,
  PaperPosition,
  PaperTradingState,
  TradeJournalEntry
} from "../lib/contracts/paper-trading";

export interface PaperTradingService {
  getPaperTradingState(): Promise<PaperTradingState>;
  getPaperAccounts(): Promise<PaperAccount[]>;
  getPaperOrders(): Promise<PaperOrder[]>;
  getPaperPositions(): Promise<PaperPosition[]>;
  getPaperPortfolios(): Promise<PaperPortfolio[]>;
  getTradeJournal(): Promise<TradeJournalEntry[]>;
  getPerformanceMetrics(): Promise<PaperPerformanceMetrics[]>;
}

export const mockPaperTradingService: PaperTradingService = {
  async getPaperTradingState() {
    return paperTradingState;
  },
  async getPaperAccounts() {
    return paperTradingState.accounts;
  },
  async getPaperOrders() {
    return paperTradingState.orders;
  },
  async getPaperPositions() {
    return paperTradingState.positions;
  },
  async getPaperPortfolios() {
    return paperTradingState.portfolios;
  },
  async getTradeJournal() {
    return paperTradingState.journal;
  },
  async getPerformanceMetrics() {
    return paperTradingState.performance;
  }
};
