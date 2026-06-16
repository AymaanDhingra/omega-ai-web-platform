import { mockMarketAdapter } from "../adapters/market-adapter";

export const marketApi = {
  getWatchlist: () => mockMarketAdapter.getWatchlist(),
  getCandles: () => mockMarketAdapter.getCandles(),
  getMarketIntelligence: () => mockMarketAdapter.getMarketIntelligence(),
  analyzeMarket: (market: string, symbol?: string) => mockMarketAdapter.analyzeMarket(market, symbol),
  summarizeMarket: (market: string) => mockMarketAdapter.summarizeMarket(market)
};
