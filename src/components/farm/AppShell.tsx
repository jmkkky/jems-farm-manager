import { Link, useRouterState } from "@tanstack/react-router";
import { Bell, Menu, Plus } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { NAV, BOTTOM } from "./nav";
import { useFarm, today } from "@/lib/farm/store";
import { QuickActionsSheet } from "./QuickActions";
import { cn } from "@/lib/utils";

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="grid h-9 w-9 place-items-center rounded-xl bg-brand text-lg text-primary-foreground shadow-fab">🌿</div>
      <div className="leading-tight">
        <div className="font-display text-base font-bold tracking-wide">JEMS FARM</div>
        <div className="text-[11px] text-muted-foreground">Poultry & Livestock</div>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [more, setMore] = useState(false);
  const [quick, setQuick] = useState(false);
  const { data } = useFarm();
  const due = data.reminders.filter((r) => !r.done && r.dueDate <= today()).length;
  const current = NAV.find((n) => (n.to === "/" ? path === "/" : path.startsWith(n.to)));

  return (
    <div className="min-h-screen lg:flex">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r bg-sidebar p-4 lg:flex">
        <Logo />
        <nav className="mt-6 flex-1 space-y-0.5 overflow-y-auto">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }}
              className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent"
              activeProps={{ className: "bg-sidebar-accent !text-sidebar-accent-foreground font-semibold" }}>
              <n.icon className="h-4.5 w-4.5" /> {n.label}
              {n.to === "/reminders" && due > 0 && <span className="ml-auto rounded-full bg-destructive px-1.5 text-[10px] font-bold text-destructive-foreground">{due}</span>}
            </Link>
          ))}
        </nav>
        <div className="rounded-xl bg-primary-soft p-3 text-xs text-accent-foreground">
          <div className="font-semibold">{data.settings.farmName}</div>
          <div className="opacity-80">{data.settings.location}</div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center gap-3 bg-brand px-4 py-3 text-primary-foreground lg:bg-none lg:bg-background/90 lg:text-foreground lg:backdrop-blur lg:px-8">
          <button className="lg:hidden" onClick={() => setMore(true)} aria-label="Menu"><Menu className="h-6 w-6" /></button>
          <div className="flex-1">
            <div className="font-display text-lg font-semibold lg:text-2xl">{current?.label ?? "JEMS FARM"}</div>
            <div className="text-[11px] opacity-80 lg:hidden">JEMS FARM</div>
          </div>
          <Link to="/reminders" className="relative rounded-full p-2 hover:bg-foreground/10" aria-label="Reminders">
            <Bell className="h-5 w-5" />
            {due > 0 && <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-warning" />}
          </Link>
          <button onClick={() => setQuick(true)} className="hidden items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground lg:flex">
            <Plus className="h-4 w-4" /> Quick add
          </button>
        </header>

        <main className="mx-auto w-full max-w-7xl flex-1 px-3 pb-28 pt-4 sm:px-5 lg:px-8 lg:pb-10">{children}</main>
      </div>

      <button onClick={() => setQuick(true)} aria-label="Quick actions"
        className="fixed bottom-20 right-4 z-40 grid h-14 w-14 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-fab lg:hidden">
        <Plus className="h-7 w-7" />
      </button>

      <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t bg-card pb-[env(safe-area-inset-bottom)] lg:hidden">
        {BOTTOM.map((to) => {
          const n = NAV.find((x) => x.to === to)!;
          const active = to === "/" ? path === "/" : path.startsWith(to);
          return (
            <Link key={to} to={to} className={cn("flex flex-col items-center gap-0.5 py-2 text-[11px] font-medium", active ? "text-primary" : "text-muted-foreground")}>
              <span className={cn("rounded-full px-4 py-1", active && "bg-primary-soft")}><n.icon className="h-5 w-5" /></span>
              {n.label.split(" ")[0]}
            </Link>
          );
        })}
        <button onClick={() => setMore(true)} className="flex flex-col items-center gap-0.5 py-2 text-[11px] font-medium text-muted-foreground">
          <span className="rounded-full px-4 py-1"><Menu className="h-5 w-5" /></span>More
        </button>
      </nav>

      <Sheet open={more} onOpenChange={setMore}>
        <SheetContent side="left" className="w-72 p-4">
          <SheetHeader className="p-0"><SheetTitle className="sr-only">Menu</SheetTitle><Logo /></SheetHeader>
          <nav className="mt-4 space-y-0.5">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setMore(false)} activeOptions={{ exact: n.to === "/" }}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium"
                activeProps={{ className: "bg-primary-soft text-accent-foreground font-semibold" }}>
                <n.icon className="h-5 w-5" /> {n.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <QuickActionsSheet open={quick} onOpenChange={setQuick} />
    </div>
  );
}
