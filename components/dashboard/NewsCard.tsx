import type { NewsEvent } from "../../lib/types";
import { toneClasses } from "../../lib/utils/styles";

export function NewsCard({ event }: { event: NewsEvent }) {
  return (
    <article className="border-t border-line pt-3 first:border-t-0 first:pt-0">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold text-zinc-500">{event.source}</p>
          <p className="mt-1 text-sm font-medium">{event.headline}</p>
        </div>
        <span className={`shrink-0 rounded-md px-2 py-1 text-xs font-semibold ${toneClasses(event.tone)}`}>{event.impact}</span>
      </div>
    </article>
  );
}
