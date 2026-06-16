import { getDataSource } from "../lib/data-sources";
import type { DataSourceDescriptor } from "../lib/data-sources";
import type { MarketAnalysis, MarketAsset, MarketIntelligenceRepository, MarketSummary } from "../lib/types";
import { mockMarketService } from "../services/market-service";

export interface MarketAdapter {
  source: DataSourceDescriptor;
  getWatchlist(): Promise<MarketAsset[]>;
  getCandles(): Promise<[number, number, number, number][]>;
  getMarketIntelligence(): MarketIntelligenceRepository;
  analyzeMarket(market: string, symbol?: string): Promise<MarketAnalysis>;
  summarizeMarket(market: string): Promise<MarketSummary>;
}

export const mockMarketAdapter: MarketAdapter = {
  source: getDataSource("mock"),
  getWatchlist: () => mockMarketService.getWatchlist(),
  getCandles: () => mockMarketService.getCandles(),
  getMarketIntelligence: () => mockMarketService.getMarketIntelligence(),
  analyzeMarket: (market, symbol) => mockMarketService.analyzeMarket(market, symbol),
  summarizeMarket: (market) => mockMarketService.summarizeMarket(market)
};
