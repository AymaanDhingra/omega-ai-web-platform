import { getDataSource } from "../lib/data-sources";
import type { DataSourceDescriptor } from "../lib/data-sources";
import type { ExperienceRepository } from "../lib/types";
import { mockExperienceService } from "../services/experience-service";

export interface ExperienceAdapter {
  source: DataSourceDescriptor;
  getRepository(): ExperienceRepository;
}

export const mockExperienceAdapter: ExperienceAdapter = {
  source: getDataSource("mock"),
  getRepository: () => mockExperienceService.getRepository()
};
