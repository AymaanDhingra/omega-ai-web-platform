import { mockKnowledgeAdapter } from "../adapters/knowledge-adapter";

export const knowledgeApi = {
  getDocuments: () => mockKnowledgeAdapter.getDocuments()
};
