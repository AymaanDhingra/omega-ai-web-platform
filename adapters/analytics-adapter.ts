import { getDataSource } from "../lib/data-sources";
import type { DataSourceDescriptor } from "../lib/data-sources";
import type { AnalyticsModelSet } from "../lib/contracts/analytics";
import type { AnalyticsGroup } from "../lib/types";
import { mockAnalyticsService } from "../services/analytics-service";

export interface AnalyticsAdapter {
  source: DataSourceDescriptor;
  getAnalyticsGroups(): Promise<AnalyticsGroup[]>;
  getAnalyticsModelSet(): Promise<AnalyticsModelSet>;
}

export const mockAnalyticsAdapter: AnalyticsAdapter = {
  source: getDataSource("mock"),
  getAnalyticsGroups: () => mockAnalyticsService.getAnalyticsGroups(),
  getAnalyticsModelSet: () => mockAnalyticsService.getAnalyticsModelSet()
};
