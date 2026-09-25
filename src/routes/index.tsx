import { createFileRoute } from "@tanstack/react-router";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { useFarm, population, kes, today, daysAgo, fmtDate, vaccineStatus } from "@/lib/farm/store";
import { QuickGrid } from "@/components/farm/QuickActions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — JEMS FARM" },
      { name: "description", content: "Live overview of birds, eggs, health and finances at Jems Farm." },
      { property: "og:title", content: "Dashboard — JEMS FARM" },
      { property: "og:description", content: "Live overview of birds, eggs, health and finances at Jems Farm." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { data } = useFarm();
  const t = today();
  const total = data.flocks.reduce((n, f) => n + population(data, f.id), 0);
  const eggsToday = data.eggs.filter((e) => e.date === t).reduce((n, e) => n + e.collected, 0);
  const deaths30 = data.movements.filter((m) => m.type === "Death" && m.date >= daysAgo(30)).reduce((n, m) => n + m.qty, 0);
  const feedToday = data.feedTx.filter((x) => x.type === "Use" && x.date === t).reduce((n, x) => n + x.kg, 0);
  const exp30 = data.money.filter((m) => m.kind === "expense" && m.date >= daysAgo(30)).reduce((n, m) => n + m.amount, 0);
  const trend = Array.from({ length: 30 }, (_, i) => {
    const d = daysAgo(29 - i);
    return { d: fmtDate(d), eggs: data.eggs.filter((e) => e.date === d).reduce((n, e) => n + e.collected, 0) };
  });
  const vacc = data.vaccinations.filter((v) => !v.givenDate).sort((a, b) => a.dueDate.localeCompare(b.dueDate)).slice(0, 5);
  const stats = [
    ["Total birds", total.toLocaleString()], ["Active flocks", String(data.flocks.filter((f) => f.status === "Active").length)],
    ["Today's eggs", eggsToday.toLocaleString()], ["Deaths (30d)", String(deaths30)],
    ["Feed today", `${Math.round(feedToday)} kg`], ["Expenses (30d)", kes(exp30)],
  ];
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {stats.map(([l, v]) => (
          <div key={l} className="card-surface p-3">
            <div className="text-[11px] font-medium text-muted-foreground">{l}</div>
            <div className="mt-1 font-display text-xl font-bold">{v}</div>
          </div>
        ))}
      </div>
      <QuickGrid />
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="card-surface p-4 lg:col-span-2">
          <h2 className="mb-2 font-semibold">Egg production — 30 days</h2>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trend}>
                <XAxis dataKey="d" tick={{ fontSize: 10 }} interval={6} />
                <Tooltip />
                <Area dataKey="eggs" stroke="var(--color-primary)" fill="var(--color-primary-soft)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card-surface p-4">
          <h2 className="mb-2 font-semibold">Species</h2>
          {data.species.map((s) => {
            const n = data.flocks.filter((f) => f.speciesId === s.id).reduce((a, f) => a + population(data, f.id), 0);
            return (
              <div key={s.id} className="flex justify-between py-1.5 text-sm">
                <span>{s.emoji} {s.name}</span><span className="font-semibold">{n}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="card-surface p-4">
          <h2 className="mb-2 font-semibold">Upcoming vaccinations</h2>
          {vacc.map((v) => (
            <div key={v.id} className="flex justify-between py-1.5 text-sm">
              <span>{v.vaccine}</span><span className="text-muted-foreground">{fmtDate(v.dueDate)} · {vaccineStatus(v)}</span>
            </div>
          ))}
        </div>
        <div className="card-surface p-4">
          <h2 className="mb-2 font-semibold">Health alerts</h2>
          {data.health.filter((h) => h.outcome !== "Recovered").map((h) => (
            <div key={h.id} className="flex justify-between py-1.5 text-sm">
              <span>{h.disease}</span><span className="text-muted-foreground">{h.affected} birds · {h.outcome}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
