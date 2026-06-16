import { mockMarketAdapter } from "../adapters/market-adapter";

export const marketApi = {
  getWatchlist: () => mockMarketAdapter.getWatchlist(),
  getCandles: () => mockMarketAdapter.getCandles()
};
