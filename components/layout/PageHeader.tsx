import type { ModuleDefinition, OmegaIcon } from "../../lib/types";
import { OmegaIconView } from "../../lib/utils/icons";
import { ModuleStatusBadge, StatusBadge } from "./StatusBadge";

export function PageHeader({
  title,
  description,
  icon,
  module
}: {
  title: string;
  description: string;
  icon: OmegaIcon;
  module?: ModuleDefinition;
}) {
  return (
    <div className="flex flex-col gap-3 py-2 lg:flex-row lg:items-end lg:justify-between">
      <div className="min-w-0">
        <div className="flex min-w-0 items-center gap-2">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-line bg-white text-teal">
            <OmegaIconView icon={icon} className="h-5 w-5" />
          </span>
          <h1 className="truncate text-2xl font-semibold text-ink sm:text-3xl">{title}</h1>
        </div>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-600">{description}</p>
      </div>
      {module ? (
        <div className="flex flex-wrap items-center gap-2">
          <ModuleStatusBadge status={module.currentStatus} />
          <StatusBadge label={`v${module.version}`} />
          <StatusBadge label={module.featureFlag} />
        </div>
      ) : null}
    </div>
  );
}
