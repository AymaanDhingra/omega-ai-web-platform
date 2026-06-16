import { getModuleById } from "../../lib/modules";
import { systemApi } from "../../api/system";
import { AppShell } from "../../components/layout/AppShell";
import { ModulePage } from "../../components/layout/ModulePage";
import { AIChatModule } from "../../components/modules/AIChatModule";

export default async function ChatPage() {
  const dashboard = await systemApi.getDashboardSnapshot();
  const moduleDefinition = getModuleById("ai-chat");

  return (
    <AppShell modules={dashboard.modules}>
      <ModulePage module={moduleDefinition}>
        <AIChatModule commands={dashboard.chatCommands} />
      </ModulePage>
    </AppShell>
  );
}
