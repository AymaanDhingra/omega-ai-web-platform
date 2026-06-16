import { describe, it, assert } from "tsx/esm/test";
import { createHttpClient, FetchHttpClient } from "../lib/http/client";

describe("HTTP Client", () => {
  it("creates HTTP client instance", () => {
    const client = createHttpClient();
    assert(client !== undefined);
    assert(typeof client.get === "function");
    assert(typeof client.post === "function");
    assert(typeof client.put === "function");
    assert(typeof client.patch === "function");
    assert(typeof client.delete === "function");
    assert(typeof client.request === "function");
  });

  it("accepts configuration", () => {
    const client = createHttpClient({
      baseUrl: "http://localhost:8000",
      timeout: 5000,
      retries: 2,
      headers: { "Authorization": "Bearer token" }
    });
    assert(client !== undefined);
  });

  it("FetchHttpClient is a valid HTTP client", () => {
    const client = new FetchHttpClient();
    assert(client !== undefined);
    assert(typeof client.get === "function");
    assert(typeof client.post === "function");
    assert(typeof client.request === "function");
  });

  it("HTTP client methods are callable", async () => {
    const client = createHttpClient();
    // These will fail without a real server, but we're testing the interface
    assert(typeof client.get === "function");
    assert(typeof client.post === "function");
    assert(typeof client.put === "function");
    assert(typeof client.patch === "function");
    assert(typeof client.delete === "function");
  });
});
