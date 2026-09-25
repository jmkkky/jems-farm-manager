import { Link } from "@tanstack/react-router";
import { Bird, Egg, LineChart, HeartPulse, Syringe, Wallet } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

export const QUICK = [
  { to: "/flocks", label: "Add Birds", icon: Bird },
  { to: "/eggs", label: "Record Eggs", icon: Egg },
  { to: "/growth", label: "Record Weight", icon: LineChart },
  { to: "/health", label: "Add Treatment", icon: HeartPulse },
  { to: "/vaccinations", label: "Vaccinate", icon: Syringe },
  { to: "/finance", label: "Add Expense", icon: Wallet },
] as const;

export function QuickGrid({ onPick }: { onPick?: () => void }) {
  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
      {QUICK.map((q) => (
        <Link key={q.label} to={q.to} onClick={onPick} className="card-surface flex flex-col items-center gap-1.5 p-3 text-center text-xs font-semibold">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary"><q.icon className="h-5 w-5" /></span>
          {q.label}
        </Link>
      ))}
    </div>
  );
}

export function QuickActionsSheet({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-3xl p-5">
        <SheetHeader className="p-0 pb-3"><SheetTitle>Quick actions</SheetTitle></SheetHeader>
        <QuickGrid onPick={() => onOpenChange(false)} />
      </SheetContent>
    </Sheet>
  );
}
