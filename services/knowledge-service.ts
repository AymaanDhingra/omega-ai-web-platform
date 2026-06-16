import { knowledgeDocuments } from "../lib/mock/knowledge";
import type { KnowledgeDocument } from "../lib/types";

export interface KnowledgeService {
  getDocuments(): Promise<KnowledgeDocument[]>;
}

export const mockKnowledgeService: KnowledgeService = {
  async getDocuments() {
    return knowledgeDocuments;
  }
};
