import { mockNewsAdapter } from "../adapters/news-adapter";

export const newsApi = {
  getNewsEvents: () => mockNewsAdapter.getNewsEvents()
};
