import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { buildSeed, isoDay } from "./seed";
import type { FarmData, Flock, SpeciesId } from "./types";

const KEY = "jems-farm-v1";
type ListKey = { [K in keyof FarmData]: FarmData[K] extends unknown[] ? K : never }[keyof FarmData];

interface Ctx {
  data: FarmData;
  add: <K extends ListKey>(key: K, item: Omit<FarmData[K][number], "id">) => void;
  update: <K extends ListKey>(key: K, id: string, patch: Partial<FarmData[K][number]>) => void;
  remove: <K extends ListKey>(key: K, id: string) => void;
  setSettings: (s: Partial<FarmData["settings"]>) => void;
  reset: () => void;
}
const FarmCtx = createContext<Ctx | null>(null);

export function FarmProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<FarmData>(() => buildSeed());
  const loaded = useRef(false);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setData(JSON.parse(raw));
    } catch { /* fall back to demo data */ }
    loaded.current = true;
  }, []);
  useEffect(() => {
    if (!loaded.current) return;
    try { localStorage.setItem(KEY, JSON.stringify(data)); } catch { /* ignore quota */ }
  }, [data]);

  const add = useCallback<Ctx["add"]>((key, item) => {
    const id = `${String(key)}-${Date.now().toString(36)}-${Math.floor(Math.random() * 1e6).toString(36)}`;
    setData((d) => ({ ...d, [key]: [{ ...item, id }, ...(d[key] as unknown[])] }));
  }, []);
  const update = useCallback<Ctx["update"]>((key, id, patch) => {
    setData((d) => ({ ...d, [key]: (d[key] as { id: string }[]).map((x) => (x.id === id ? { ...x, ...patch } : x)) }));
  }, []);
  const remove = useCallback<Ctx["remove"]>((key, id) => {
    setData((d) => ({ ...d, [key]: (d[key] as { id: string }[]).filter((x) => x.id !== id) }));
  }, []);
  const setSettings = useCallback((s: Partial<FarmData["settings"]>) => setData((d) => ({ ...d, settings: { ...d.settings, ...s } })), []);
  const reset = useCallback(() => setData(buildSeed()), []);
  const value = useMemo(() => ({ data, add, update, remove, setSettings, reset }), [data, add, update, remove, setSettings, reset]);
  return <FarmCtx.Provider value={value}>{children}</FarmCtx.Provider>;
}

export function useFarm() {
  const c = useContext(FarmCtx);
  if (!c) throw new Error("useFarm outside provider");
  return c;
}

export const today = () => isoDay(0);
export const daysAgo = (n: number) => isoDay(-n);
export const daysBetween = (a: string, b: string) => Math.round((new Date(b).getTime() - new Date(a).getTime()) / 864e5);

export function population(data: FarmData, flockId: string) {
  const f = data.flocks.find((x) => x.id === flockId);
  if (!f) return 0;
  return data.movements.filter((m) => m.flockId === flockId).reduce((n, m) => n + (m.type === "Addition" ? m.qty : -m.qty), f.initialQty);
}

export function filterFlocks(data: FarmData, species: SpeciesId | "all", flockId: string | "all"): Flock[] {
  return data.flocks.filter((f) => (species === "all" || f.speciesId === species) && (flockId === "all" || f.id === flockId));
}

export const kes = (n: number) => `KES ${Math.round(n).toLocaleString("en-KE")}`;
export const fmtDate = (s: string) => new Date(s).toLocaleDateString("en-GB", { day: "numeric", month: "short" });

export function vaccineStatus(v: { dueDate: string; givenDate?: string }) {
  if (v.givenDate) return "Given" as const;
  const d = daysBetween(today(), v.dueDate);
  if (d < 0) return "Overdue" as const;
  if (d <= 7) return "Due soon" as const;
  return "Upcoming" as const;
}
