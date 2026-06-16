import { aiBrain, chatCommands, systemStatuses, tradingModes } from "../lib/mock/ai";
import { omegaModules } from "../lib/mock/modules";
import type { AIBrain, ModuleDefinition, SystemStatus, TradingMode } from "../lib/types";

export interface AISystemService {
  getAIBrain(): Promise<AIBrain>;
  getSystemStatuses(): Promise<SystemStatus[]>;
  getTradingModes(): Promise<TradingMode[]>;
  getChatCommands(): Promise<string[]>;
  getModules(): Promise<ModuleDefinition[]>;
}

export const mockAISystemService: AISystemService = {
  async getAIBrain() {
    return aiBrain;
  },
  async getSystemStatuses() {
    return systemStatuses;
  },
  async getTradingModes() {
    return tradingModes;
  },
  async getChatCommands() {
    return chatCommands;
  },
  async getModules() {
    return omegaModules;
  }
};
