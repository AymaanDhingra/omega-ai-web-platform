export function LoadingState({ label = "Loading mock module" }: { label?: string }) {
  return (
    <div className="rounded-lg border border-line bg-panel p-6 text-sm font-semibold text-zinc-600 shadow-panel">
      {label}
    </div>
  );
}
