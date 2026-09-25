# Jems Farm Manager

Create a full-stack responsive Jems Farm poultry and livestock management app. Brand JEMS FARM. Mobile-first Android-style UI plus desktop/tablet. Use white cards, rounded corners, green primary brand color, subtle species accent colors, clear icons and compact information-rich layouts.

Manage exotic chickens across chicks, growers, mature/layers and breeders; exotic pigeons with at least 5 breeds; guinea fowls; turkeys; ducks; geese.

Navigation: Dashboard, Birds & Flocks, Breeds, Egg Production, Growth & Weights, Health & Diseases, Vaccinations, Breeding, Feed & Inventory, Expenses & Income, Reports, Reminders, Settings.

Dashboard: total birds, active flocks, today's eggs, mortality, feed used, expenses; species breakdown; egg-production trend; mortality/health alerts; upcoming vaccinations/treatments; quick actions for Add Birds, Record Eggs, Record Weight, Add Treatment, Vaccinate, Add Expense; date/species/flock filters.

Flock management: species, breed, flock ID/name, source, hatch/acquisition date, initial/current quantity, sex, stage, housing/location, purpose, notes and status. Track additions, deaths, sales, transfers and culling so population is calculated.

Breed profiles: target weights by age, laying expectations, maturity age, egg characteristics, breeding notes and health notes. Growth records: sample/individual weights, average weight, gain, growth rate, target versus actual, trend charts.

Egg production: daily records by flock/breed, collected, cracked/dirty, saleable, eggs per bird, laying percentage and cumulative production with 7/30/90-day charts.

Health and disease: health events with species, flock, date, symptoms, suspected/confirmed disease, diagnosis, treatment, medicine, dose, duration, withdrawal period, veterinarian, outcome and notes. Disease library as reference only, not diagnosis.

Vaccinations: species/breed/flock schedules, vaccine, disease, dose, route, due/given dates, batch, administrator, next due date; overdue/due-soon/upcoming reminders.

Breeding: breeding groups, males/females, mating dates, eggs set, fertility, hatch rate, hatch dates, offspring and parentage; support pigeon pairs.

Feed and inventory: feed types, supplier, bag size, purchase price, stock, consumption by flock/species, wastage and reorder level.

Finances: income and expenses by date, supplier/customer, species/flock, amount, payment method and notes. KES currency. Show income, expenses, feed costs, medicines/vaccines, bird sales, egg sales and net result.

Reports: growth, egg production, mortality, disease, vaccination, feed, inventory, income/expense and profitability reports with date/species/breed/flock filters.

Reminders: vaccinations, treatments, weighing, egg collection, breeding/hatching and inventory reorder.

Use a relational data model for species, breeds, flocks, flock movements, weight records, egg records, health events, diseases, treatments, vaccines, vaccination records, breeding groups/events, feed items/transactions, expenses, income, reminders, housing locations and settings. Use Supabase/PostgreSQL persistence if available. Populate realistic demo data for all species and multiple breeds. Major forms and actions should work and update the dashboard. Bottom navigation on mobile, sidebar on desktop. Make it feel like a professional Android farm-management app rather than a generic admin dashboard.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://jems-farm-manager.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/28e21f03-1390-49db-ad3d-8858a82ec47f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
