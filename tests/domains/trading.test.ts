/**
 * Trading Domain Tests
 */

import { describe, it, expect } from "vitest";
import * as TradingDomain from "../../lib/domains/trading";

describe("Trading Domain", () => {
  it("should export all trading types", () => {
    expect(TradingDomain).toBeDefined();
  });

  it("should have SignalStatus enum", () => {
    expect(TradingDomain.SignalStatusEnum).toBeDefined();
    expect(TradingDomain.SignalStatusEnum.CREATED).toBe("created");
    expect(TradingDomain.SignalStatusEnum.EXECUTED).toBe("executed");
  });

  it("should have OrderStatus enum", () => {
    expect(TradingDomain.OrderStatusEnum).toBeDefined();
    expect(TradingDomain.OrderStatusEnum.PENDING).toBe("pending");
    expect(TradingDomain.OrderStatusEnum.FILLED).toBe("filled");
  });

  it("should have PositionStatus enum", () => {
    expect(TradingDomain.PositionStatusEnum).toBeDefined();
    expect(TradingDomain.PositionStatusEnum.OPEN).toBe("open");
    expect(TradingDomain.PositionStatusEnum.CLOSED).toBe("closed");
  });

  it("should have TradeStatus enum", () => {
    expect(TradingDomain.TradeStatusEnum).toBeDefined();
    expect(TradingDomain.TradeStatusEnum.PENDING).toBe("pending");
    expect(TradingDomain.TradeStatusEnum.CLOSED).toBe("closed");
  });

  it("should have OrderSide enum", () => {
    expect(TradingDomain.OrderSideEnum).toBeDefined();
    expect(TradingDomain.OrderSideEnum.BUY).toBe("buy");
    expect(TradingDomain.OrderSideEnum.SELL).toBe("sell");
  });

  it("should have OrderType enum", () => {
    expect(TradingDomain.OrderTypeEnum).toBeDefined();
    expect(TradingDomain.OrderTypeEnum.MARKET).toBe("market");
    expect(TradingDomain.OrderTypeEnum.LIMIT).toBe("limit");
  });

  it("should have TimeInForce enum", () => {
    expect(TradingDomain.TimeInForceEnum).toBeDefined();
    expect(TradingDomain.TimeInForceEnum.DAY).toBe("day");
    expect(TradingDomain.TimeInForceEnum.GTC).toBe("gtc");
  });
});
