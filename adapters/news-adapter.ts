import { getDataSource } from "../lib/data-sources";
import type { DataSourceDescriptor } from "../lib/data-sources";
import type { NewsEvent } from "../lib/types";
import { mockNewsService } from "../services/news-service";

export interface NewsAdapter {
  source: DataSourceDescriptor;
  getNewsEvents(): Promise<NewsEvent[]>;
}

export const mockNewsAdapter: NewsAdapter = {
  source: getDataSource("mock"),
  getNewsEvents: () => mockNewsService.getNewsEvents()
};
