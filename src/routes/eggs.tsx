import { createFileRoute } from "@tanstack/react-router";
import { SectionPage } from "@/components/farm/SectionPage";
import { useFarm, population, kes, fmtDate, vaccineStatus } from "@/lib/farm/store";

export const Route = createFileRoute("/eggs")({
  head: () => ({ meta: [{ title: "Egg Production — JEMS FARM" }, { name: "description", content: "Egg Production at Jems Farm." }, { property: "og:title", content: "Egg Production — JEMS FARM" }, { property: "og:description", content: "Egg Production at Jems Farm." }] }),
  component: Page,
});

function Page() {
  const { data } = useFarm();
  void population; void kes; void fmtDate; void vaccineStatus;
  const fl = (id?: string) => data.flocks.find((f) => f.id === id)?.name ?? "—";
  void fl;
  return <SectionPage rows={data.eggs.slice(-60).reverse().map((e) => ({ title: fl(e.flockId), sub: `${fmtDate(e.date)} · cracked ${e.cracked} · dirty ${e.dirty}`, right: `${e.collected - e.cracked - e.dirty} saleable` }))} />;
}
