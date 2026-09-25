import { createFileRoute } from "@tanstack/react-router";
import { SectionPage } from "@/components/farm/SectionPage";
import { useFarm, population, kes, fmtDate, vaccineStatus } from "@/lib/farm/store";

export const Route = createFileRoute("/flocks")({
  head: () => ({ meta: [{ title: "Birds & Flocks — JEMS FARM" }, { name: "description", content: "Birds & Flocks at Jems Farm." }, { property: "og:title", content: "Birds & Flocks — JEMS FARM" }, { property: "og:description", content: "Birds & Flocks at Jems Farm." }] }),
  component: Page,
});

function Page() {
  const { data } = useFarm();
  void population; void kes; void fmtDate; void vaccineStatus;
  const fl = (id?: string) => data.flocks.find((f) => f.id === id)?.name ?? "—";
  void fl;
  return <SectionPage rows={data.flocks.map((f) => ({ title: `${f.code} · ${f.name}`, sub: `${f.stage} · ${f.purpose}`, right: `${population(data, f.id)} birds` }))} />;
}
