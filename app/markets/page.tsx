import { getModuleById } from "../../lib/modules";
import { systemApi } from "../../api/system";
import { AppShell } from "../../components/layout/AppShell";
import { ModulePage } from "../../components/layout/ModulePage";
import { MarketWatchModule } from "../../components/modules/MarketWatchModule";

export default async function MarketsPage() {
  const dashboard = await systemApi.getDashboardSnapshot();
  const moduleDefinition = getModuleById("market-watch");

  return (
    <AppShell modules={dashboard.modules}>
      <ModulePage module={moduleDefinition}>
        <MarketWatchModule markets={dashboard.marketAssets} />
      </ModulePage>
    </AppShell>
  );
}
