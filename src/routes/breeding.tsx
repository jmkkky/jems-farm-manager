import { createFileRoute } from "@tanstack/react-router";
import { SectionPage } from "@/components/farm/SectionPage";
import { useFarm, population, kes, fmtDate, vaccineStatus } from "@/lib/farm/store";

export const Route = createFileRoute("/breeding")({
  head: () => ({ meta: [{ title: "Breeding — JEMS FARM" }, { name: "description", content: "Breeding at Jems Farm." }, { property: "og:title", content: "Breeding — JEMS FARM" }, { property: "og:description", content: "Breeding at Jems Farm." }] }),
  component: Page,
});

function Page() {
  const { data } = useFarm();
  void population; void kes; void fmtDate; void vaccineStatus;
  const fl = (id?: string) => data.flocks.find((f) => f.id === id)?.name ?? "—";
  void fl;
  return <SectionPage rows={data.breeding.map((b) => ({ title: b.name, sub: `${b.males}♂ ${b.females}♀ · set ${b.eggsSet} · fertile ${b.fertile}`, right: b.eggsSet ? `${Math.round((b.hatched / b.eggsSet) * 100)}% hatch` : "—" }))} />;
}
