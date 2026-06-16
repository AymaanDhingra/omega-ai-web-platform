import { mockExperienceAdapter } from "../adapters/experience-adapter";

export const experienceApi = {
  getRepository: () => mockExperienceAdapter.getRepository(),
  listRecords: () => mockExperienceAdapter.getRepository().listRecords(),
  detectPatterns: () => mockExperienceAdapter.getRepository().detectPatterns(),
  summarize: () => mockExperienceAdapter.getRepository().summarize(),
  prepareKnowledgeUpdates: () => mockExperienceAdapter.getRepository().prepareKnowledgeUpdates()
};
