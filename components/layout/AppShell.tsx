import type { ReactNode } from "react";
import type { ModuleDefinition } from "../../lib/types";
import { Sidebar } from "./Sidebar";
import { SharedHeader } from "./SharedHeader";

export function AppShell({ modules, children }: { modules: ModuleDefinition[]; children: ReactNode }) {
  return (
    <main className="min-h-screen bg-field text-ink">
      <div className="mx-auto flex w-full max-w-[1680px] flex-col lg:flex-row">
        <Sidebar modules={modules} />
        <div className="min-w-0 flex-1 px-4 py-4 sm:px-6 lg:px-8">
          <SharedHeader />
          {children}
        </div>
      </div>
    </main>
  );
}
