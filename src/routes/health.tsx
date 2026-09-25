import { createFileRoute } from "@tanstack/react-router";
import { SectionPage } from "@/components/farm/SectionPage";
import { useFarm, population, kes, fmtDate, vaccineStatus } from "@/lib/farm/store";

export const Route = createFileRoute("/health")({
  head: () => ({ meta: [{ title: "Health & Diseases — JEMS FARM" }, { name: "description", content: "Health & Diseases at Jems Farm." }, { property: "og:title", content: "Health & Diseases — JEMS FARM" }, { property: "og:description", content: "Health & Diseases at Jems Farm." }] }),
  component: Page,
});

function Page() {
  const { data } = useFarm();
  void population; void kes; void fmtDate; void vaccineStatus;
  const fl = (id?: string) => data.flocks.find((f) => f.id === id)?.name ?? "—";
  void fl;
  return <SectionPage rows={[...data.health.map((h) => ({ title: `${fl(h.flockId)} · ${h.disease}`, sub: `${fmtDate(h.date)} · ${h.medicine} ${h.dose} · withdrawal ${h.withdrawalDays}d`, right: h.outcome })), ...data.diseases.map((d) => ({ title: `Library: ${d.name}`, sub: `Reference only — ${d.signs}` }))]} />;
}
