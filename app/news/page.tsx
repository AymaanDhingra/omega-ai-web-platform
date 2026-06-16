import { getModuleById } from "../../lib/modules";
import { systemApi } from "../../api/system";
import { AppShell } from "../../components/layout/AppShell";
import { ModulePage } from "../../components/layout/ModulePage";
import { NewsIntelligenceModule } from "../../components/modules/NewsIntelligenceModule";

export default async function NewsPage() {
  const dashboard = await systemApi.getDashboardSnapshot();
  const moduleDefinition = getModuleById("news-intelligence");

  return (
    <AppShell modules={dashboard.modules}>
      <ModulePage module={moduleDefinition}>
        <NewsIntelligenceModule events={dashboard.newsEvents} />
      </ModulePage>
    </AppShell>
  );
}
