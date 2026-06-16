export type DataSourceKind = "Mock" | "Local" | "REST" | "WebSocket" | "Broker" | "Exchange" | "TradingView";

export interface DataSourceDescriptor {
  id: string;
  name: string;
  kind: DataSourceKind;
  enabled: boolean;
  mock: boolean;
  description: string;
  futureUse: string;
}

export interface DataSourceAdapter<TService> {
  source: DataSourceDescriptor;
  service: TService;
}

export const dataSources: DataSourceDescriptor[] = [
  { id: "mock", name: "Mock", kind: "Mock", enabled: true, mock: true, description: "In-memory fixtures used by the current frontend.", futureUse: "Default development and test data source." },
  { id: "local", name: "Local", kind: "Local", enabled: false, mock: false, description: "Future local file or browser storage source.", futureUse: "Offline research or imported datasets." },
  { id: "rest", name: "REST", kind: "REST", enabled: false, mock: false, description: "Future HTTP API source.", futureUse: "FastAPI backend integration." },
  { id: "websocket", name: "WebSocket", kind: "WebSocket", enabled: false, mock: false, description: "Future streaming source.", futureUse: "Realtime quotes and events." },
  { id: "broker", name: "Broker", kind: "Broker", enabled: false, mock: false, description: "Future broker adapter source.", futureUse: "Permission-gated account and execution state." },
  { id: "exchange", name: "Exchange", kind: "Exchange", enabled: false, mock: false, description: "Future exchange adapter source.", futureUse: "Crypto exchange market and account state." },
  { id: "tradingview", name: "TradingView", kind: "TradingView", enabled: false, mock: false, description: "Future testing-only TradingView source.", futureUse: "Chart and alert validation, not execution." }
];

export function getDataSource(id: string) {
  const source = dataSources.find((item) => item.id === id);

  if (!source) {
    throw new Error(`Data source not registered: ${id}`);
  }

  return source;
}
