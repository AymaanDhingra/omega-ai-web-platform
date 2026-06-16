import { DashboardConsole } from "../components/dashboard/DashboardConsole";
import { systemApi } from "../api/system";

export default async function Home() {
  const dashboard = await systemApi.getDashboardSnapshot();

  return <DashboardConsole initialData={dashboard} />;
}
