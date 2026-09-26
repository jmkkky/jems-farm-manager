# Jems Farm Manager — Production Build

Move the app from browser-only demo data to the online database with sign-in, then fill out every section with working forms, charts and reports. Work ships in phases so the preview keeps working after each one.

## Phase 1 — Sign-in and database
- JEMS FARM sign-in page (email/password + Google), sign-out in the menu, all app pages behind sign-in.
- Farms and members: each user belongs to a farm with a role (Owner, Admin, Staff). First sign-up creates "Jems Farm" as Owner and loads demo data for it.
- All tables from the brief (species, breeds, locations, flocks, movements, weights, eggs, health events, diseases, medications, treatments, vaccines, schedules, records, breeding groups/pairs/events, hatch batches, feed items/transactions, inventory adjustments, expenses, income, reminders, settings), with timestamps, links, indexes and access limited to the user's farm.
- Demo data: all six species, 5+ pigeon breeds, flocks, 90 days of eggs, weights, health, vaccines, feed and money.

## Phase 2 — Dashboard and flocks
- Live figures from the database: live birds, active flocks, today's eggs, mortality, feed stock/use, month income/expenses/net.
- Filters by date, species, breed, flock; species breakdown, egg and growth trends, alerts, upcoming vaccinations/treatments, low feed, reminder count.
- Flocks: species > breed > flock, full add/edit/delete, movement types (opening, hatch, purchase, transfer in/out, death, sale, cull, adjustment). Population always calculated from movements; removals blocked if they would go below zero.

## Phase 3 — Breeds, growth, eggs
- Breed profiles with target weights by age; weight records with min/avg/max; growth rate and target-vs-actual chart.
- Daily egg records with laying %, eggs/bird, 7/30/90-day trends.

## Phase 4 — Health, vaccination, breeding
- Health events and treatments (with withdrawal, cost), reference disease library with "not a diagnosis" note.
- Vaccine catalog, flock schedules, calendar/upcoming/due soon/overdue/completed, auto reminders.
- Breeding groups and pigeon pairs, hatch batches with fertility % and hatch %, parentage.

## Phase 5 — Feed, finance, reports, reminders, settings
- Feed stock with purchase/use/waste/adjust, expiry, cost, low-stock alerts; stock can't go negative.
- KES ledger with categories, summary of income/expenses/feed/medicine/sales/net.
- Reports with filters, CSV export and print layout.
- Reminders list with done/snooze; Settings for farm profile, lists, units, theme, export/backup, about.

## Phase 6 — Installable app and polish
- Android home-screen install (app name, icons, colours); cached app shell for offline opening on the published site only.
- Loading, empty, success, error and confirm-delete states everywhere; full click-through check of every page.

## Technical details
- Tables keyed by `farm_id`; RLS via a security-definer `is_farm_member(farm_id)` and `farm_role` in a separate `farm_members` table (no roles on profiles).
- Demo data seeded by a database function called on first farm creation (per-farm), so every new owner starts populated.
- Data access with TanStack Query against the database client; mutations invalidate queries so the dashboard updates immediately. The local demo store is removed.
- Offline via vite-plugin-pwa (generateSW), registration guarded off in preview.

## Assumptions
- One farm per user for now; Owners/Admins can edit everything, Staff can record but not delete or change settings.
- Each phase is a separate request; I'll start Phase 1 once approved.
