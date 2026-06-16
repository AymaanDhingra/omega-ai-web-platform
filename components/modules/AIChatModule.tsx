"use client";

import { Bot } from "lucide-react";
import { useState } from "react";

export function AIChatModule({ commands }: { commands: string[] }) {
  const [chatCommand, setChatCommand] = useState(commands[0] ?? "Analyze BTC");

  return (
    <div className="grid gap-4 xl:grid-cols-[0.8fr_1.2fr]">
      <div className="grid gap-3 sm:grid-cols-2">
        {commands.map((command) => (
          <button
            key={command}
            type="button"
            onClick={() => setChatCommand(command)}
            className={`min-h-10 rounded-lg border px-3 py-2 text-left text-sm font-semibold transition ${
              chatCommand === command ? "border-teal bg-emerald-50 text-teal" : "border-line bg-white text-zinc-600 hover:bg-field"
            }`}
          >
            {command}
          </button>
        ))}
      </div>
      <div className="rounded-lg border border-line bg-white p-4">
        <div className="flex items-start gap-3">
          <Bot className="mt-1 h-5 w-5 shrink-0 text-teal" />
          <div className="min-w-0">
            <p className="text-sm font-semibold">{chatCommand}</p>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              Evidence check complete. Current workspace uses simulated market data, paper-trade state, and locked execution. Confidence remains bounded until live feeds, broker permissions, and portfolio rules are connected.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
