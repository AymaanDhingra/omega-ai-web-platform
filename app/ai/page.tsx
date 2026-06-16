import { getModuleById } from "../../lib/modules";
import { systemApi } from "../../api/system";
import { AppShell } from "../../components/layout/AppShell";
import { ModulePage } from "../../components/layout/ModulePage";
import { AIBrainModule } from "../../components/modules/AIBrainModule";

export default async function AIPage() {
  const dashboard = await systemApi.getDashboardSnapshot();
  const moduleDefinition = getModuleById("ai-brain");

  return (
    <AppShell modules={dashboard.modules}>
      <ModulePage module={moduleDefinition}>
        <AIBrainModule aiBrain={dashboard.aiBrain} tradingModes={dashboard.tradingModes} />
      </ModulePage>
    </AppShell>
  );
}
