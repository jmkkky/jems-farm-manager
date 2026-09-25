import type { ReactNode } from "react";

export function SectionPage({ rows }: { rows: { title: string; sub: string; right?: ReactNode }[] }) {
  return (
    <div className="card-surface divide-y">
      {rows.length === 0 && <div className="p-6 text-center text-sm text-muted-foreground">No records yet.</div>}
      {rows.map((r, i) => (
        <div key={i} className="flex items-center gap-3 px-4 py-3">
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold">{r.title}</div>
            <div className="truncate text-xs text-muted-foreground">{r.sub}</div>
          </div>
          {r.right && <div className="text-right text-sm font-semibold">{r.right}</div>}
        </div>
      ))}
    </div>
  );
}
