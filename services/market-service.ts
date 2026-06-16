import { candles, marketAssets } from "../lib/mock/market";
import { mockMarketIntelligenceRepository } from "../lib/mock/market-intelligence";
import type { MarketAnalysis, MarketAsset, MarketIntelligenceRepository, MarketSummary } from "../lib/types";

export interface MarketService {
  getWatchlist(): Promise<MarketAsset[]>;
  getCandles(): Promise<[number, number, number, number][]>;
  getMarketIntelligence(): MarketIntelligenceRepository;
  analyzeMarket(market: string, symbol?: string): Promise<MarketAnalysis>;
  summarizeMarket(market: string): Promise<MarketSummary>;
}

export const mockMarketService: MarketService = {
  async getWatchlist() {
    return marketAssets;
  },
  async getCandles() {
    return candles;
  },
  getMarketIntelligence() {
    return mockMarketIntelligenceRepository;
  },
  analyzeMarket(market, symbol) {
    return mockMarketIntelligenceRepository.analyzeMarket(market, symbol);
  },
  summarizeMarket(market) {
    return mockMarketIntelligenceRepository.summarizeMarket(market);
  }
};
