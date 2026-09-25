import { createFileRoute } from "@tanstack/react-router";
import { SectionPage } from "@/components/farm/SectionPage";
import { useFarm, population, kes, fmtDate, vaccineStatus } from "@/lib/farm/store";

export const Route = createFileRoute("/finance")({
  head: () => ({ meta: [{ title: "Expenses & Income — JEMS FARM" }, { name: "description", content: "Expenses & Income at Jems Farm." }, { property: "og:title", content: "Expenses & Income — JEMS FARM" }, { property: "og:description", content: "Expenses & Income at Jems Farm." }] }),
  component: Page,
});

function Page() {
  const { data } = useFarm();
  void population; void kes; void fmtDate; void vaccineStatus;
  const fl = (id?: string) => data.flocks.find((f) => f.id === id)?.name ?? "—";
  void fl;
  return <SectionPage rows={data.money.slice(0, 80).map((m) => ({ title: `${m.category} · ${m.party}`, sub: `${fmtDate(m.date)} · ${m.method}`, right: `${m.kind === "expense" ? "−" : "+"}${kes(m.amount)}` }))} />;
}
