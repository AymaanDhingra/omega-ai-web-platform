import { mockExperienceRepository } from "../lib/mock/experience";
import type { ExperienceRepository } from "../lib/types";

export interface ExperienceService {
  getRepository(): ExperienceRepository;
}

export const mockExperienceService: ExperienceService = {
  getRepository() {
    return mockExperienceRepository;
  }
};
