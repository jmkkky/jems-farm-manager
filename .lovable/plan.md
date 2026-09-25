# JEMS FARM — Poultry & Livestock Management App

A mobile-first farm management app with a real database, demo data for every species, and working forms that update the dashboard live.

## Look and feel
- Brand: JEMS FARM, green primary, white cards, rounded corners, compact info-dense rows.
- Android-style: bottom tab bar on phones (Dashboard, Birds, Eggs, Health, More), left sidebar on tablet/desktop, floating quick-action button.
- Species accent colors: chickens, pigeons, guinea fowl, turkeys, ducks, geese.

## Screens
1. **Dashboard** — totals (birds, active flocks, today's eggs, mortality, feed used, expenses in KES), species breakdown, egg trend chart, health/mortality alerts, upcoming vaccinations, quick actions (Add Birds, Record Eggs, Record Weight, Add Treatment, Vaccinate, Add Expense), filters by date/species/flock.
2. **Birds & Flocks** — flock list + detail; species, breed, flock ID, source, hatch/acquisition date, quantities, sex, stage, housing, purpose, status. Movements (additions, deaths, sales, transfers, culls) recalculate current population.
3. **Breeds** — profiles with target weights by age, laying expectations, maturity age, egg characteristics, breeding and health notes. At least 5 pigeon breeds plus breeds for each other species.
4. **Egg Production** — daily entries per flock: collected, cracked/dirty, saleable, eggs/bird, laying %, cumulative totals, 7/30/90-day charts.
5. **Growth & Weights** — sample or individual weights, average, gain, growth rate, target vs actual chart.
6. **Health & Diseases** — health events (symptoms, suspected/confirmed disease, diagnosis, treatment, medicine, dose, duration, withdrawal period, vet, outcome) plus a reference-only disease library with a clear "not a diagnosis" note.
7. **Vaccinations** — schedules per species/breed/flock, vaccine, disease, dose, route, due/given dates, batch, administrator, next due; overdue / due-soon / upcoming grouping.
8. **Breeding** — breeding groups, males/females, mating dates, eggs set, fertility, hatch rate, hatch dates, offspring and parentage; pigeon pair support.
9. **Feed & Inventory** — feed items, supplier, bag size, price, stock, consumption by flock, wastage, reorder alerts.
10. **Expenses & Income** — KES entries with date, party, species/flock, amount, payment method, notes; summary of income, expenses, feed, medicines/vaccines, bird sales, egg sales, net result.
11. **Reports** — growth, eggs, mortality, disease, vaccination, feed, inventory, income/expense, profitability, each filterable by date/species/breed/flock.
12. **Reminders** — vaccinations, treatments, weighing, egg collection, breeding/hatching, reorder.
13. **Settings** — farm profile, currency, species/housing lists.

## Data
Lovable Cloud (Postgres) with tables for species, breeds, housing locations, flocks, flock movements, weight records, egg records, diseases, health events, vaccines, vaccination records, breeding groups and events, feed items and transactions, expenses, income, reminders, settings. Seeded with realistic demo data across all six species and multiple breeds so every screen is populated on first open.

## Technical notes
- Cloud enabled; schema created in one migration including grants, RLS and literal demo rows.
- Single-farm app: data readable by the app, writes through the app's forms.
- TanStack Start routes per screen, shared responsive shell (sidebar + bottom nav), charts via Recharts.
- Population is derived from movements, not typed in, so deaths/sales/culls always reconcile.

## Assumptions
- Single shared farm workspace without per-user login, so the app opens straight to the dashboard. Say the word if you want staff accounts instead.
- Currency fixed to KES; weights in grams/kg.

## Delivery order
Phase 1: database + demo data. Phase 2: shell, navigation, dashboard. Phase 3: flocks, breeds, eggs, growth. Phase 4: health, vaccinations, breeding. Phase 5: feed, finances, reports, reminders, settings.
