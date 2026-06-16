import type { NewsEvent } from "../types";

export const newsEvents: NewsEvent[] = [
  { id: "event-calendar-risk", source: "Economic Calendar", headline: "US CPI and India WPI risk windows marked", impact: "High", tone: "warn" },
  { id: "event-crypto-funding", source: "Crypto", headline: "Funding normalizes after liquidation flush", impact: "Medium", tone: "ok" },
  { id: "event-india-it", source: "Indian Markets", headline: "IT sector relative strength improving", impact: "Medium", tone: "ok" },
  { id: "event-policy-clear", source: "Policy", headline: "No exchange disruption detected", impact: "Low", tone: "flat" }
];
