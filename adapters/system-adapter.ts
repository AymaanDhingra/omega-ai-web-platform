import { getDataSource } from "../lib/data-sources";
import type { DataSourceDescriptor } from "../lib/data-sources";
import { getFeatureFlagState } from "../lib/feature-flags";
import { brokerConnections, riskPermissions, systemLogs } from "../lib/mock/admin";
import type { DashboardSnapshot, ModuleDefinition, SystemStatus } from "../lib/types";
import { getDashboardSnapshot } from "../services/dashboard-service";
import { mockAISystemService } from "../services/ai-system-service";

export interface SystemAdapter {
  source: DataSourceDescriptor;
  getDashboardSnapshot(): Promise<DashboardSnapshot>;
  getModules(): Promise<ModuleDefinition[]>;
  getSystemStatuses(): Promise<SystemStatus[]>;
  getBrokerConnections(): Promise<typeof brokerConnections>;
  getRiskPermissions(): Promise<typeof riskPermissions>;
  getSystemLogs(): Promise<typeof systemLogs>;
  getFeatureFlags(): Promise<ReturnType<typeof getFeatureFlagState>>;
}

export const mockSystemAdapter: SystemAdapter = {
  source: getDataSource("mock"),
  getDashboardSnapshot: () => getDashboardSnapshot(),
  getModules: () => mockAISystemService.getModules(),
  getSystemStatuses: () => mockAISystemService.getSystemStatuses(),
  async getBrokerConnections() {
    return brokerConnections;
  },
  async getRiskPermissions() {
    return riskPermissions;
  },
  async getSystemLogs() {
    return systemLogs;
  },
  async getFeatureFlags() {
    return getFeatureFlagState();
  }
};
