import { createFileRoute } from "@tanstack/react-router";
import { SectionPage } from "@/components/farm/SectionPage";
import { useFarm, population, kes, fmtDate, vaccineStatus } from "@/lib/farm/store";

export const Route = createFileRoute("/reminders")({
  head: () => ({ meta: [{ title: "Reminders — JEMS FARM" }, { name: "description", content: "Reminders at Jems Farm." }, { property: "og:title", content: "Reminders — JEMS FARM" }, { property: "og:description", content: "Reminders at Jems Farm." }] }),
  component: Page,
});

function Page() {
  const { data } = useFarm();
  void population; void kes; void fmtDate; void vaccineStatus;
  const fl = (id?: string) => data.flocks.find((f) => f.id === id)?.name ?? "—";
  void fl;
  return <SectionPage rows={data.reminders.map((r) => ({ title: r.title, sub: `${r.type} · ${fmtDate(r.dueDate)}`, right: r.done ? "Done" : "Open" }))} />;
}
