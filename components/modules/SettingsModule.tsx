import type { ModuleDefinition } from "../../lib/types";
import type { FEATURE_FLAGS } from "../../lib/feature-flags";
import { ModuleCard } from "../dashboard/ModuleCard";
import { StatusBadge } from "../layout/StatusBadge";

export function SettingsModule({
  modules,
  featureFlags
}: {
  modules: ModuleDefinition[];
  featureFlags: typeof FEATURE_FLAGS;
}) {
  return (
    <div className="space-y-4">
      <section className="rounded-lg border border-line bg-panel p-4">
        <p className="font-semibold">Feature Flags</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {Object.entries(featureFlags).map(([flag, enabled]) => (
            <div key={flag} className="flex items-center justify-between gap-3 rounded-lg border border-line bg-white p-3">
              <span className="truncate text-sm font-semibold">{flag}</span>
              <StatusBadge label={enabled ? "Enabled" : "Disabled"} tone={enabled ? "up" : "down"} />
            </div>
          ))}
        </div>
      </section>
      <section className="rounded-lg border border-line bg-panel p-4">
        <p className="font-semibold">Registered Modules</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {modules.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      </section>
    </div>
  );
}
