import { getDataSource } from "../lib/data-sources";
import type { DataSourceDescriptor } from "../lib/data-sources";
import type { AIBrain, ModuleDefinition, SystemStatus, TradingMode } from "../lib/types";
import { mockAISystemService } from "../services/ai-system-service";

export interface AISystemAdapter {
  source: DataSourceDescriptor;
  getAIBrain(): Promise<AIBrain>;
  getSystemStatuses(): Promise<SystemStatus[]>;
  getTradingModes(): Promise<TradingMode[]>;
  getChatCommands(): Promise<string[]>;
  getModules(): Promise<ModuleDefinition[]>;
}

export const mockAISystemAdapter: AISystemAdapter = {
  source: getDataSource("mock"),
  getAIBrain: () => mockAISystemService.getAIBrain(),
  getSystemStatuses: () => mockAISystemService.getSystemStatuses(),
  getTradingModes: () => mockAISystemService.getTradingModes(),
  getChatCommands: () => mockAISystemService.getChatCommands(),
  getModules: () => mockAISystemService.getModules()
};
