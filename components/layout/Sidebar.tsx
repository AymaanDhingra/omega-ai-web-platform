import { primaryNavigationModuleIds } from "../../lib/mock/modules";
import type { ModuleDefinition } from "../../lib/types";
import { OmegaIconView } from "../../lib/utils/icons";

export function Sidebar({ modules }: { modules: ModuleDefinition[] }) {
  const navModules = primaryNavigationModuleIds
    .map((id) => modules.find((module) => module.id === id))
    .filter((module): module is ModuleDefinition => Boolean(module));

  return (
    <aside className="border-b border-line bg-panel px-4 py-4 lg:sticky lg:top-0 lg:h-screen lg:w-[272px] lg:border-b-0 lg:border-r">
      <div className="flex items-center justify-between gap-3 lg:block">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-ink text-white">
            <OmegaIconView icon="brain" className="h-6 w-6" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-lg font-semibold">OMEGA AI</p>
            <p className="truncate text-xs text-zinc-500">Multi-market intelligence</p>
          </div>
        </div>
        <span className="rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber lg:mt-4 lg:inline-flex">
          Simulation
        </span>
      </div>

      <nav className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:mt-7 lg:grid-cols-1" aria-label="Primary">
        {navModules.map((module) => {
          return (
            <a
              key={module.id}
              href={module.route}
              className="flex h-11 min-w-0 items-center gap-2 rounded-lg px-3 text-sm font-medium text-zinc-600 transition hover:bg-field hover:text-ink"
            >
              <OmegaIconView icon={module.icon} className="h-4 w-4 shrink-0" />
              <span className="truncate">{module.name === "AI Chat" ? "News Intel" : module.name}</span>
            </a>
          );
        })}
      </nav>

      <div className="mt-6 hidden rounded-lg border border-line bg-white p-3 lg:block">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <OmegaIconView icon="shield" className="h-4 w-4 text-mint" />
          Risk Guard
        </div>
        <div className="mt-3 space-y-3 text-xs text-zinc-600">
          <div className="flex items-center justify-between gap-2">
            <span>Execution</span>
            <span className="font-semibold text-ember">Locked</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span>Max Risk</span>
            <span className="font-semibold text-ink">0.75% / trade</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span>Daily Loss Stop</span>
            <span className="font-semibold text-ink">2.5%</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
