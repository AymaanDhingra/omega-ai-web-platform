import { newsEvents } from "../lib/mock/news";
import type { NewsEvent } from "../lib/types";

export interface NewsService {
  getNewsEvents(): Promise<NewsEvent[]>;
}

export const mockNewsService: NewsService = {
  async getNewsEvents() {
    return newsEvents;
  }
};
