import { getDataSource } from "../lib/data-sources";
import type { DataSourceDescriptor } from "../lib/data-sources";
import type { KnowledgeDocument } from "../lib/types";
import { mockKnowledgeService } from "../services/knowledge-service";

export interface KnowledgeAdapter {
  source: DataSourceDescriptor;
  getDocuments(): Promise<KnowledgeDocument[]>;
}

export const mockKnowledgeAdapter: KnowledgeAdapter = {
  source: getDataSource("mock"),
  getDocuments: () => mockKnowledgeService.getDocuments()
};
