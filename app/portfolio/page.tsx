import { getModuleById } from "../../lib/modules";
import { systemApi } from "../../api/system";
import { AppShell } from "../../components/layout/AppShell";
import { ModulePage } from "../../components/layout/ModulePage";
import { PortfolioModule } from "../../components/modules/PortfolioModule";

export default async function PortfolioPage() {
  const dashboard = await systemApi.getDashboardSnapshot();
  const moduleDefinition = getModuleById("portfolio");

  return (
    <AppShell modules={dashboard.modules}>
      <ModulePage module={moduleDefinition}>
        <PortfolioModule portfolio={dashboard.portfolio} />
      </ModulePage>
    </AppShell>
  );
}
