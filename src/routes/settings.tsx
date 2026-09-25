import { createFileRoute } from "@tanstack/react-router";
import { SectionPage } from "@/components/farm/SectionPage";
import { useFarm, population, kes, fmtDate, vaccineStatus } from "@/lib/farm/store";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — JEMS FARM" }, { name: "description", content: "Settings at Jems Farm." }, { property: "og:title", content: "Settings — JEMS FARM" }, { property: "og:description", content: "Settings at Jems Farm." }] }),
  component: Page,
});

function Page() {
  const { data } = useFarm();
  void population; void kes; void fmtDate; void vaccineStatus;
  const fl = (id?: string) => data.flocks.find((f) => f.id === id)?.name ?? "—";
  void fl;
  return <SectionPage rows={[{ title: data.settings.farmName, sub: data.settings.location, right: data.settings.currency }]} />;
}
