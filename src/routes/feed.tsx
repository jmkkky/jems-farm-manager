import { createFileRoute } from "@tanstack/react-router";
import { SectionPage } from "@/components/farm/SectionPage";
import { useFarm, population, kes, fmtDate, vaccineStatus } from "@/lib/farm/store";

export const Route = createFileRoute("/feed")({
  head: () => ({ meta: [{ title: "Feed & Inventory — JEMS FARM" }, { name: "description", content: "Feed & Inventory at Jems Farm." }, { property: "og:title", content: "Feed & Inventory — JEMS FARM" }, { property: "og:description", content: "Feed & Inventory at Jems Farm." }] }),
  component: Page,
});

function Page() {
  const { data } = useFarm();
  void population; void kes; void fmtDate; void vaccineStatus;
  const fl = (id?: string) => data.flocks.find((f) => f.id === id)?.name ?? "—";
  void fl;
  return <SectionPage rows={data.feedItems.map((f) => ({ title: f.name, sub: `${f.supplier} · ${f.bagKg}kg bag · ${kes(f.pricePerBag)}`, right: `${f.stockKg} kg${f.stockKg <= f.reorderKg ? " ⚠" : ""}` }))} />;
}
