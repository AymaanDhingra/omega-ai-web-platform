import { getDataSource } from "../lib/data-sources";
import type { DataSourceDescriptor } from "../lib/data-sources";
import type { MarketAsset } from "../lib/types";
import { mockMarketService } from "../services/market-service";

export interface MarketAdapter {
  source: DataSourceDescriptor;
  getWatchlist(): Promise<MarketAsset[]>;
  getCandles(): Promise<[number, number, number, number][]>;
}

export const mockMarketAdapter: MarketAdapter = {
  source: getDataSource("mock"),
  getWatchlist: () => mockMarketService.getWatchlist(),
  getCandles: () => mockMarketService.getCandles()
};
