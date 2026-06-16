import { mockDecisionContextRepository } from "../lib/mock/decision-intelligence";

export const decisionIntelligenceApi = {
  getDecisionContextRepository: () => mockDecisionContextRepository,
  getContexts: () => mockDecisionContextRepository.listContexts(),
  getInsights: () => mockDecisionContextRepository.getInsights(),
  explain: (signalId: string) => mockDecisionContextRepository.explain(signalId),
  trace: (signalId: string) => mockDecisionContextRepository.trace(signalId),
  summarize: () => mockDecisionContextRepository.summarize(),
  createSnapshot: () => mockDecisionContextRepository.createSnapshot()
};
