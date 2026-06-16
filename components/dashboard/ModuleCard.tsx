import type { ModuleDefinition } from "../../lib/types";
import { OmegaIconView } from "../../lib/utils/icons";

export function ModuleCard({ module }: { module: ModuleDefinition }) {
  const statusClass = module.enabled ? "border-emerald-200 bg-emerald-50 text-mint" : "border-line bg-field text-zinc-500";

  return (
    <article className="rounded-lg border border-line bg-white p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-field text-teal">
            <OmegaIconView icon={module.icon} className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{module.name}</p>
            <p className="truncate text-xs text-zinc-500">{module.status}</p>
          </div>
        </div>
        <span className={`shrink-0 rounded-md border px-2 py-1 text-xs font-semibold ${statusClass}`}>{module.enabled ? "Enabled" : "Future"}</span>
      </div>
      <p className="mt-3 text-xs leading-5 text-zinc-600">{module.description}</p>
    </article>
  );
}
