import { createFileRoute } from "@tanstack/react-router";
import { SectionPage } from "@/components/farm/SectionPage";
import { useFarm, population, kes, fmtDate, vaccineStatus } from "@/lib/farm/store";

export const Route = createFileRoute("/reports")({
  head: () => ({ meta: [{ title: "Reports — JEMS FARM" }, { name: "description", content: "Reports at Jems Farm." }, { property: "og:title", content: "Reports — JEMS FARM" }, { property: "og:description", content: "Reports at Jems Farm." }] }),
  component: Page,
});

function Page() {
  const { data } = useFarm();
  void population; void kes; void fmtDate; void vaccineStatus;
  const fl = (id?: string) => data.flocks.find((f) => f.id === id)?.name ?? "—";
  void fl;
  return <SectionPage rows={data.species.map((s) => { const fs = data.flocks.filter((f) => f.speciesId === s.id); return { title: `${s.emoji} ${s.name}`, sub: `${fs.length} flocks`, right: `${fs.reduce((n, f) => n + population(data, f.id), 0)} birds` }; })} />;
}
