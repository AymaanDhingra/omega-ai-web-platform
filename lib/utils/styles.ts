import type { MetricTone, Signal, SystemHealthState } from "../types";

export function toneClasses(tone: MetricTone) {
  if (tone === "up" || tone === "ok") return "text-mint bg-emerald-50";
  if (tone === "down") return "text-ember bg-red-50";
  if (tone === "warn") return "text-amber bg-amber-50";
  return "text-ink bg-field";
}

export function signalClasses(signal: Signal) {
  if (signal === "Buy") return "border-emerald-200 bg-emerald-50 text-mint";
  if (signal === "Sell") return "border-red-200 bg-red-50 text-ember";
  if (signal === "Watch") return "border-amber-200 bg-amber-50 text-amber";
  return "border-line bg-field text-ink";
}

export function percentColor(value: number) {
  if (value >= 72) return "bg-mint";
  if (value >= 62) return "bg-teal";
  if (value >= 55) return "bg-amber";
  return "bg-zinc-500";
}

export function systemStatusClasses(state: SystemHealthState) {
  if (state === "Online") return "border-emerald-200 bg-emerald-50 text-mint";
  if (state === "Mock") return "border-line bg-field text-zinc-600";
  if (state === "Locked") return "border-red-200 bg-red-50 text-ember";
  return "border-zinc-300 bg-zinc-50 text-zinc-500";
}
