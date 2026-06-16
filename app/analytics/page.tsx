import { getModuleById } from "../../lib/modules";
import { systemApi } from "../../api/system";
import { AppShell } from "../../components/layout/AppShell";
import { ModulePage } from "../../components/layout/ModulePage";
import { AnalyticsModule } from "../../components/modules/AnalyticsModule";

export default async function AnalyticsPage() {
  const dashboard = await systemApi.getDashboardSnapshot();
  const moduleDefinition = getModuleById("analytics");

  return (
    <AppShell modules={dashboard.modules}>
      <ModulePage module={moduleDefinition}>
        <AnalyticsModule groups={dashboard.analyticsGroups} tradingViewTesting={dashboard.tradingViewTesting} />
      </ModulePage>
    </AppShell>
  );
}
