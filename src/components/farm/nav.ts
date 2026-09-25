import { Bell, Bird, BookOpen, Egg, HeartPulse, LayoutDashboard, LineChart, Package, Settings, Syringe, Wallet, FileBarChart, GitMerge } from "lucide-react";

export const NAV = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/flocks", label: "Birds & Flocks", icon: Bird },
  { to: "/breeds", label: "Breeds", icon: BookOpen },
  { to: "/eggs", label: "Egg Production", icon: Egg },
  { to: "/growth", label: "Growth & Weights", icon: LineChart },
  { to: "/health", label: "Health & Diseases", icon: HeartPulse },
  { to: "/vaccinations", label: "Vaccinations", icon: Syringe },
  { to: "/breeding", label: "Breeding", icon: GitMerge },
  { to: "/feed", label: "Feed & Inventory", icon: Package },
  { to: "/finance", label: "Expenses & Income", icon: Wallet },
  { to: "/reports", label: "Reports", icon: FileBarChart },
  { to: "/reminders", label: "Reminders", icon: Bell },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export const BOTTOM = ["/", "/flocks", "/eggs", "/health"] as const;
