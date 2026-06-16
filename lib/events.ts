import type { AIBrain, MarketAsset, NewsEvent, Portfolio, Strategy, TradeSignal } from "./types";
import type { PaperOrder, PaperPosition, TradeJournalEntry } from "./contracts/paper-trading";

export type OmegaEventType =
  | "market.update"
  | "signal.created"
  | "paper.trade.opened"
  | "paper.trade.closed"
  | "portfolio.updated"
  | "news.received"
  | "strategy.updated"
  | "ai.state.changed";

export interface OmegaEventBase<TType extends OmegaEventType, TPayload> {
  id: string;
  type: TType;
  createdAt: string;
  payload: TPayload;
}

export type MarketUpdateEvent = OmegaEventBase<"market.update", MarketAsset>;
export type SignalCreatedEvent = OmegaEventBase<"signal.created", TradeSignal>;
export type PaperTradeOpenedEvent = OmegaEventBase<"paper.trade.opened", { order: PaperOrder; position: PaperPosition }>;
export type PaperTradeClosedEvent = OmegaEventBase<"paper.trade.closed", { journalEntry: TradeJournalEntry }>;
export type PortfolioUpdatedEvent = OmegaEventBase<"portfolio.updated", Portfolio>;
export type NewsReceivedEvent = OmegaEventBase<"news.received", NewsEvent>;
export type StrategyUpdatedEvent = OmegaEventBase<"strategy.updated", Strategy>;
export type AIStateChangedEvent = OmegaEventBase<"ai.state.changed", AIBrain>;

export type OmegaEvent =
  | MarketUpdateEvent
  | SignalCreatedEvent
  | PaperTradeOpenedEvent
  | PaperTradeClosedEvent
  | PortfolioUpdatedEvent
  | NewsReceivedEvent
  | StrategyUpdatedEvent
  | AIStateChangedEvent;

export type OmegaEventHandler<TEvent extends OmegaEvent = OmegaEvent> = (event: TEvent) => void;

export interface OmegaEventBus {
  publish(event: OmegaEvent): void;
  subscribe(handler: OmegaEventHandler): () => void;
  history(): OmegaEvent[];
}

export function createMockEventBus(seed: OmegaEvent[] = []): OmegaEventBus {
  const handlers = new Set<OmegaEventHandler>();
  const events: OmegaEvent[] = [...seed];

  return {
    publish(event) {
      events.push(event);
      handlers.forEach((handler) => handler(event));
    },
    subscribe(handler) {
      handlers.add(handler);
      return () => handlers.delete(handler);
    },
    history() {
      return [...events];
    }
  };
}
