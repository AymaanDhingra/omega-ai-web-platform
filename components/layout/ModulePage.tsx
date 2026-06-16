import type { ReactNode } from "react";
import { isFeatureEnabled } from "../../lib/feature-flags";
import type { ModuleDefinition } from "../../lib/types";
import { EmptyState } from "./EmptyState";
import { ModuleHeader } from "./ModuleHeader";
import { PageHeader } from "./PageHeader";

export function ModulePage({
  module,
  title,
  description,
  children
}: {
  module: ModuleDefinition;
  title?: string;
  description?: string;
  children: ReactNode;
}) {
  const enabled = isFeatureEnabled(module.featureFlag);

  return (
    <div className="pb-8">
      <PageHeader title={title ?? module.name} description={description ?? module.description} icon={module.icon} module={module} />
      <div className="mt-4">
        <ModuleHeader module={module} />
      </div>
      <div className="mt-4">
        {enabled ? children : <EmptyState title={`${module.name} disabled`} message={`${module.featureFlag} is currently disabled in the frontend feature flag registry.`} icon="lock" />}
      </div>
    </div>
  );
}
