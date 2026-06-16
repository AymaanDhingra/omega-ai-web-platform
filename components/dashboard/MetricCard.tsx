import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { DashboardMetric } from "../../lib/types";
import { OmegaIconView } from "../../lib/utils/icons";
import { toneClasses } from "../../lib/utils/styles";

export function MetricCard({ metric }: { metric: DashboardMetric }) {
  return (
    <article className="rounded-lg border border-line bg-panel p-4 shadow-panel">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-xs font-medium text-zinc-500">{metric.label}</p>
          <p className="mt-2 truncate text-xl font-semibold text-ink">{metric.value}</p>
        </div>
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line bg-white text-teal">
          <OmegaIconView icon={metric.icon} className="h-4 w-4" />
        </span>
      </div>
      <div className={`mt-3 inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold ${toneClasses(metric.tone)}`}>
        {metric.tone === "up" ? <ArrowUpRight className="h-3.5 w-3.5" /> : null}
        {metric.tone === "down" ? <ArrowDownRight className="h-3.5 w-3.5" /> : null}
        {metric.delta}
      </div>
    </article>
  );
}
