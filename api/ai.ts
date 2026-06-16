import { mockAISystemAdapter } from "../adapters/ai-system-adapter";

export const aiApi = {
  getAIBrain: () => mockAISystemAdapter.getAIBrain(),
  getTradingModes: () => mockAISystemAdapter.getTradingModes(),
  getChatCommands: () => mockAISystemAdapter.getChatCommands()
};
