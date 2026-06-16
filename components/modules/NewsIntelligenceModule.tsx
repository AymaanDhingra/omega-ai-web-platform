import type { NewsEvent } from "../../lib/types";
import { NewsCard } from "../dashboard/NewsCard";

export function NewsIntelligenceModule({ events }: { events: NewsEvent[] }) {
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      {events.map((event) => (
        <div key={event.id} className="rounded-lg border border-line bg-panel p-4">
          <NewsCard event={event} />
        </div>
      ))}
    </div>
  );
}
