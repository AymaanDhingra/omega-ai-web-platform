import { getFeatureFlagState } from "../../lib/feature-flags";
import { getModuleById } from "../../lib/modules";
import { systemApi } from "../../api/system";
import { AppShell } from "../../components/layout/AppShell";
import { ModulePage } from "../../components/layout/ModulePage";
import { SettingsModule } from "../../components/modules/SettingsModule";

export default async function SettingsPage() {
  const dashboard = await systemApi.getDashboardSnapshot();
  const moduleDefinition = getModuleById("settings");

  return (
    <AppShell modules={dashboard.modules}>
      <ModulePage module={moduleDefinition}>
        <SettingsModule modules={dashboard.modules} featureFlags={getFeatureFlagState()} />
      </ModulePage>
    </AppShell>
  );
}
