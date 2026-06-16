/**
 * Shared Domain Tests
 */

import { describe, it, expect } from "vitest";
import * as SharedDomain from "../../lib/domains/shared";

describe("Shared Domain", () => {
  it("should export state machines", () => {
    expect(SharedDomain.SignalStateMachine).toBeDefined();
    expect(SharedDomain.TradeStateMachine).toBeDefined();
    expect(SharedDomain.OrderStateMachine).toBeDefined();
    expect(SharedDomain.PositionStateMachine).toBeDefined();
    expect(SharedDomain.PortfolioStateMachine).toBeDefined();
    expect(SharedDomain.StrategyStateMachine).toBeDefined();
    expect(SharedDomain.PaperTradeStateMachine).toBeDefined();
  });

  it("should have EventType enum", () => {
    expect(SharedDomain.EventTypeEnum).toBeDefined();
    expect(SharedDomain.EventTypeEnum.MARKET_UPDATE).toBe("market:update");
    expect(SharedDomain.EventTypeEnum.SIGNAL_CREATED).toBe("signal:created");
  });

  it("should have valid state machine transitions", () => {
    const signalMachine = SharedDomain.SignalStateMachine;
    expect(signalMachine.initial).toBe("created");
    expect(signalMachine.states.created.transitions.validate).toBe("validated");
    expect(signalMachine.states.validated.transitions.queue).toBe("queued");
  });
});
