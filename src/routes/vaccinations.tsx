import { createFileRoute } from "@tanstack/react-router";
import { SectionPage } from "@/components/farm/SectionPage";
import { useFarm, population, kes, fmtDate, vaccineStatus } from "@/lib/farm/store";

export const Route = createFileRoute("/vaccinations")({
  head: () => ({ meta: [{ title: "Vaccinations — JEMS FARM" }, { name: "description", content: "Vaccinations at Jems Farm." }, { property: "og:title", content: "Vaccinations — JEMS FARM" }, { property: "og:description", content: "Vaccinations at Jems Farm." }] }),
  component: Page,
});

function Page() {
  const { data } = useFarm();
  void population; void kes; void fmtDate; void vaccineStatus;
  const fl = (id?: string) => data.flocks.find((f) => f.id === id)?.name ?? "—";
  void fl;
  return <SectionPage rows={data.vaccinations.map((v) => ({ title: `${v.vaccine} · ${fl(v.flockId)}`, sub: `${v.route} · due ${fmtDate(v.dueDate)}`, right: vaccineStatus(v) }))} />;
}
