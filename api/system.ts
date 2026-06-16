import { mockSystemAdapter } from "../adapters/system-adapter";

export const systemApi = {
  getDashboardSnapshot: () => mockSystemAdapter.getDashboardSnapshot(),
  getModules: () => mockSystemAdapter.getModules(),
  getSystemStatuses: () => mockSystemAdapter.getSystemStatuses(),
  getBrokerConnections: () => mockSystemAdapter.getBrokerConnections(),
  getRiskPermissions: () => mockSystemAdapter.getRiskPermissions(),
  getSystemLogs: () => mockSystemAdapter.getSystemLogs(),
  getFeatureFlags: () => mockSystemAdapter.getFeatureFlags()
};
