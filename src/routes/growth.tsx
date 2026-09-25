import { createFileRoute } from "@tanstack/react-router";
import { SectionPage } from "@/components/farm/SectionPage";
import { useFarm, population, kes, fmtDate, vaccineStatus } from "@/lib/farm/store";

export const Route = createFileRoute("/growth")({
  head: () => ({ meta: [{ title: "Growth & Weights — JEMS FARM" }, { name: "description", content: "Growth & Weights at Jems Farm." }, { property: "og:title", content: "Growth & Weights — JEMS FARM" }, { property: "og:description", content: "Growth & Weights at Jems Farm." }] }),
  component: Page,
});

function Page() {
  const { data } = useFarm();
  void population; void kes; void fmtDate; void vaccineStatus;
  const fl = (id?: string) => data.flocks.find((f) => f.id === id)?.name ?? "—";
  void fl;
  return <SectionPage rows={data.weights.slice(-60).reverse().map((w) => ({ title: fl(w.flockId), sub: `${fmtDate(w.date)} · week ${w.ageWeeks} · n=${w.sampleSize}`, right: `${w.avgGrams} g` }))} />;
}
