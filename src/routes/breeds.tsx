import { createFileRoute } from "@tanstack/react-router";
import { SectionPage } from "@/components/farm/SectionPage";
import { useFarm, population, kes, fmtDate, vaccineStatus } from "@/lib/farm/store";

export const Route = createFileRoute("/breeds")({
  head: () => ({ meta: [{ title: "Breeds — JEMS FARM" }, { name: "description", content: "Breeds at Jems Farm." }, { property: "og:title", content: "Breeds — JEMS FARM" }, { property: "og:description", content: "Breeds at Jems Farm." }] }),
  component: Page,
});

function Page() {
  const { data } = useFarm();
  void population; void kes; void fmtDate; void vaccineStatus;
  const fl = (id?: string) => data.flocks.find((f) => f.id === id)?.name ?? "—";
  void fl;
  return <SectionPage rows={data.breeds.map((b) => ({ title: b.name, sub: `${b.speciesId} · ${b.purpose} · matures ${b.maturityWeeks} wks`, right: `${b.eggsPerYear} eggs/yr` }))} />;
}
