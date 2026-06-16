import type { ModuleDefinition } from "../../lib/types";
import { OmegaIconView } from "../../lib/utils/icons";
import { ModuleStatusBadge, StatusBadge } from "./StatusBadge";

export function ModuleHeader({ module }: { module: ModuleDefinition }) {
  return (
    <div className="rounded-lg border border-line bg-white p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="flex min-w-0 gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-field text-teal">
            <OmegaIconView icon={module.icon} className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <p className="text-base font-semibold">{module.name}</p>
            <p className="mt-1 text-sm leading-6 text-zinc-600">{module.description}</p>
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <ModuleStatusBadge status={module.currentStatus} />
          <StatusBadge label={`v${module.version}`} />
        </div>
      </div>
      <div className="mt-4 grid gap-3 text-xs text-zinc-600 md:grid-cols-3">
        <div>
          <p className="font-semibold text-ink">Dependencies</p>
          <p className="mt-1">{module.dependencies.join(", ")}</p>
        </div>
        <div>
          <p className="font-semibold text-ink">Future Backend</p>
          <p className="mt-1">{module.futureBackendDependency}</p>
        </div>
        <div>
          <p className="font-semibold text-ink">Future AI</p>
          <p className="mt-1">{module.futureAIDependency}</p>
        </div>
      </div>
    </div>
  );
}
