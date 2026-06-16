import { candles, marketAssets } from "../lib/mock/market";
import type { MarketAsset } from "../lib/types";

export interface MarketService {
  getWatchlist(): Promise<MarketAsset[]>;
  getCandles(): Promise<[number, number, number, number][]>;
}

export const mockMarketService: MarketService = {
  async getWatchlist() {
    return marketAssets;
  },
  async getCandles() {
    return candles;
  }
};
