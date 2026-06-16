import type { ReactNode } from "react";

export function Panel({
  children,
  id,
  className = ""
}: {
  children: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <section id={id} className={`min-w-0 rounded-lg border border-line bg-panel p-4 shadow-panel ${className}`}>
      {children}
    </section>
  );
}
