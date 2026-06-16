import { getModuleById } from "../../lib/modules";
import { systemApi } from "../../api/system";
import { AppShell } from "../../components/layout/AppShell";
import { ModulePage } from "../../components/layout/ModulePage";
import { KnowledgeCenterModule } from "../../components/modules/KnowledgeCenterModule";

export default async function KnowledgePage() {
  const dashboard = await systemApi.getDashboardSnapshot();
  const moduleDefinition = getModuleById("knowledge-center");

  return (
    <AppShell modules={dashboard.modules}>
      <ModulePage module={moduleDefinition}>
        <KnowledgeCenterModule documents={dashboard.knowledgeDocuments} />
      </ModulePage>
    </AppShell>
  );
}
