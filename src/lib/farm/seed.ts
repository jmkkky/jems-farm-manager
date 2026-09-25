import type { Breed, FarmData, Flock, SpeciesId } from "./types";

export function isoDay(offset: number, base = new Date()): string {
  const d = new Date(Date.UTC(base.getUTCFullYear(), base.getUTCMonth(), base.getUTCDate()));
  d.setUTCDate(d.getUTCDate() + offset);
  return d.toISOString().slice(0, 10);
}

function rng(seed: number) {
  let s = seed;
  return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
}

const tw = (pts: [number, number][]) => pts.map(([week, grams]) => ({ week, grams }));

export function buildSeed(): FarmData {
  const r = rng(42);
  const species = [
    { id: "chicken" as SpeciesId, name: "Chickens", emoji: "🐔" },
    { id: "pigeon" as SpeciesId, name: "Pigeons", emoji: "🕊️" },
    { id: "guinea" as SpeciesId, name: "Guinea fowl", emoji: "🐦" },
    { id: "turkey" as SpeciesId, name: "Turkeys", emoji: "🦃" },
    { id: "duck" as SpeciesId, name: "Ducks", emoji: "🦆" },
    { id: "goose" as SpeciesId, name: "Geese", emoji: "🪿" },
  ];
  const B = (id: string, speciesId: SpeciesId, name: string, purpose: string, maturityWeeks: number, eggsPerYear: number, eggColor: string, eggWeightG: number, pts: [number, number][], breedingNotes: string, healthNotes: string): Breed =>
    ({ id, speciesId, name, purpose, maturityWeeks, eggsPerYear, eggColor, eggWeightG, targetWeights: tw(pts), breedingNotes, healthNotes });
  const breeds: Breed[] = [
    B("b-brahma", "chicken", "Light Brahma", "Dual / exotic", 26, 150, "Brown", 58, [[0, 40], [4, 350], [8, 900], [12, 1500], [16, 2100], [20, 2700], [26, 3400]], "1 cock : 6 hens. Slow to mature; broody.", "Check feathered legs for scaly-leg mites."),
    B("b-silkie", "chicken", "Silkie", "Ornamental", 24, 100, "Cream", 42, [[0, 30], [4, 180], [8, 420], [12, 650], [16, 850], [20, 1000], [24, 1100]], "Excellent brooders; 1:8 ratio.", "Keep dry — fluffy plumage chills easily. Prone to Marek's."),
    B("b-kuroiler", "chicken", "Kuroiler", "Dual purpose", 20, 200, "Brown", 56, [[0, 40], [4, 450], [8, 1200], [12, 1900], [16, 2400], [20, 2800]], "Hardy free-ranger; 1:10.", "Deworm every 3 months."),
    B("b-leghorn", "chicken", "White Leghorn", "Layer", 20, 300, "White", 60, [[0, 35], [4, 280], [8, 650], [12, 1000], [16, 1300], [20, 1500]], "Rarely broody — incubate eggs.", "Watch for egg peritonitis at peak lay."),
    B("b-polish", "chicken", "Polish Crested", "Ornamental", 22, 150, "White", 48, [[0, 32], [4, 220], [8, 500], [12, 800], [16, 1100], [22, 1600]], "Crest may impede mating; trim.", "Crest eye infections; keep clean."),
    B("b-fantail", "pigeon", "Indian Fantail", "Ornamental", 24, 12, "White", 17, [[0, 15], [2, 200], [4, 320], [8, 380], [24, 450]], "Monogamous pairs; 2 eggs per clutch.", "Canker (trichomoniasis) check monthly."),
    B("b-king", "pigeon", "King Pigeon", "Squab / meat", 24, 14, "White", 22, [[0, 18], [2, 300], [4, 550], [8, 650], [24, 750]], "Productive squabbers; nest boxes 40cm.", "PMV vaccination annually."),
    B("b-jacobin", "pigeon", "Jacobin", "Ornamental", 26, 10, "White", 16, [[0, 14], [2, 180], [4, 280], [24, 380]], "Hood feathers may need trimming for feeding young.", "Keep lofts dust-free."),
    B("b-pouter", "pigeon", "English Pouter", "Ornamental", 26, 10, "White", 18, [[0, 15], [2, 200], [4, 320], [24, 500]], "Often needs foster parents.", "Crop issues; avoid overfeeding."),
    B("b-frillback", "pigeon", "Frillback", "Ornamental", 24, 12, "White", 17, [[0, 15], [2, 190], [4, 300], [24, 420]], "Pair in dry season for best fertility.", "Wet frills invite mites."),
    B("b-modena", "pigeon", "Modena", "Ornamental", 24, 12, "White", 18, [[0, 15], [2, 200], [4, 330], [24, 480]], "Good parents.", "Annual PMV vaccine."),
    B("b-pearl", "guinea", "Pearl Guinea", "Meat / eggs", 26, 100, "Speckled brown", 40, [[0, 25], [4, 250], [8, 600], [12, 950], [16, 1200], [26, 1600]], "Seasonal layers (rains). Pair 1:4.", "Keets fragile first 3 weeks; keep warm."),
    B("b-lavender", "guinea", "Lavender Guinea", "Meat / eggs", 26, 90, "Speckled brown", 39, [[0, 25], [4, 240], [8, 580], [12, 900], [26, 1500]], "Hide nests — collect often.", "Newcastle vaccination essential."),
    B("b-bronze", "turkey", "Broad Breasted Bronze", "Meat", 28, 80, "Speckled cream", 85, [[0, 55], [4, 700], [8, 2500], [12, 5000], [16, 7500], [20, 10000]], "Natural mating difficult; 1 tom : 5 hens.", "Blackhead risk — keep away from chickens."),
    B("b-bourbon", "turkey", "Bourbon Red", "Heritage meat", 30, 90, "Cream", 80, [[0, 50], [4, 600], [8, 2000], [12, 4000], [20, 7000]], "Good natural breeders.", "Deworm quarterly."),
    B("b-pekin", "duck", "Pekin", "Meat / eggs", 20, 180, "White", 75, [[0, 55], [2, 450], [4, 1400], [6, 2400], [8, 3000], [20, 3600]], "1 drake : 5 ducks. Poor sitters.", "Niacin supplement for ducklings."),
    B("b-muscovy", "duck", "Muscovy", "Meat", 28, 90, "White", 75, [[0, 50], [4, 800], [8, 2000], [12, 3000], [28, 4000]], "Excellent broody mothers; 35-day incubation.", "Hardy; watch for duck viral enteritis."),
    B("b-khaki", "duck", "Khaki Campbell", "Layer", 20, 280, "White/green", 68, [[0, 45], [4, 700], [8, 1500], [20, 2000]], "1 drake : 6 ducks.", "Provide water for bill cleaning."),
    B("b-toulouse", "goose", "Toulouse", "Meat", 36, 40, "White", 170, [[0, 100], [4, 1500], [8, 3500], [12, 5000], [36, 8000]], "Pair or trio; lays in cool season.", "Needs grazing; watch for aspergillosis."),
    B("b-embden", "goose", "Embden", "Meat", 36, 35, "White", 175, [[0, 105], [4, 1600], [8, 3800], [12, 5500], [36, 9000]], "1 gander : 3 geese.", "Keep bedding dry."),
  ];
  const housing = [
    { id: "h1", name: "Layer House A", capacity: 600 }, { id: "h2", name: "Brooder Room", capacity: 400 },
    { id: "h3", name: "Grower Pen B", capacity: 400 }, { id: "h4", name: "Pigeon Loft", capacity: 120 },
    { id: "h5", name: "Waterfowl Pond Run", capacity: 200 }, { id: "h6", name: "Turkey & Guinea Yard", capacity: 200 },
    { id: "h7", name: "Breeder Pens", capacity: 150 },
  ];
  const F = (id: string, code: string, name: string, speciesId: SpeciesId, breedId: string, start: number, qty: number, stage: Flock["stage"], housingId: string, purpose: string, source = "Own hatch", sex = "Mixed"): Flock =>
    ({ id, code, name, speciesId, breedId, source, startDate: isoDay(start), initialQty: qty, sex, stage, housingId, purpose, status: "Active", notes: "" });
  const flocks: Flock[] = [
    F("f1", "CH-L01", "Leghorn Layers", "chicken", "b-leghorn", -300, 420, "Layers", "h1", "Eggs", "Kenchic Hatchery", "Female"),
    F("f2", "CH-L02", "Kuroiler Layers", "chicken", "b-kuroiler", -250, 260, "Layers", "h1", "Eggs", "KALRO Naivasha", "Female"),
    F("f3", "CH-C01", "Brahma Chicks", "chicken", "b-brahma", -18, 150, "Chicks", "h2", "Breeding stock"),
    F("f4", "CH-G01", "Kuroiler Growers", "chicken", "b-kuroiler", -70, 220, "Growers", "h3", "Meat"),
    F("f5", "CH-B01", "Brahma Breeders", "chicken", "b-brahma", -420, 42, "Breeders", "h7", "Breeding", "Imported"),
    F("f6", "CH-B02", "Silkie Breeders", "chicken", "b-silkie", -380, 30, "Breeders", "h7", "Breeding"),
    F("f7", "CH-G02", "Polish Growers", "chicken", "b-polish", -84, 60, "Growers", "h3", "Ornamental sales"),
    F("f8", "PG-01", "Fantail & Jacobin Loft", "pigeon", "b-fantail", -500, 48, "Adults", "h4", "Breeding / sales", "Local breeder"),
    F("f9", "PG-02", "King Pigeon Loft", "pigeon", "b-king", -400, 36, "Adults", "h4", "Squab"),
    F("f10", "GF-01", "Pearl Guinea Flock", "guinea", "b-pearl", -330, 85, "Adults", "h6", "Eggs & meat"),
    F("f11", "TK-01", "Bronze Turkeys", "turkey", "b-bronze", -120, 40, "Poults", "h6", "Meat"),
    F("f12", "DK-01", "Pekin Ducks", "duck", "b-pekin", -200, 70, "Adults", "h5", "Eggs & meat"),
    F("f13", "DK-02", "Khaki Campbell Layers", "duck", "b-khaki", -260, 55, "Layers", "h5", "Eggs"),
    F("f14", "GS-01", "Toulouse Geese", "goose", "b-toulouse", -600, 18, "Adults", "h5", "Breeding / meat"),
  ];
  let n = 0; const id = (p: string) => `${p}${++n}`;
  const movements: FarmData["movements"] = [];
  for (const f of flocks) {
    const age = Math.round((Date.now() - new Date(f.startDate).getTime()) / 864e5);
    const deaths = Math.max(1, Math.round(f.initialQty * (0.02 + r() * 0.04)));
    for (let i = 0; i < Math.min(deaths, 6); i++) {
      movements.push({ id: id("m"), flockId: f.id, date: isoDay(-Math.floor(r() * Math.min(age, 60))), type: "Death", qty: Math.ceil(deaths / Math.min(deaths, 6)), notes: "" });
    }
    if (f.initialQty > 60 && r() > 0.4) movements.push({ id: id("m"), flockId: f.id, date: isoDay(-Math.floor(r() * 40)), type: "Sale", qty: Math.round(f.initialQty * 0.08), notes: "Sold to market" });
    if (r() > 0.7) movements.push({ id: id("m"), flockId: f.id, date: isoDay(-Math.floor(r() * 30)), type: "Cull", qty: 2, notes: "Poor performers" });
  }
  movements.push({ id: id("m"), flockId: f(flocks, "f9"), date: isoDay(-20), type: "Addition", qty: 8, notes: "Squabs weaned" });

  const layerRates: Record<string, number> = { f1: 0.86, f2: 0.62, f10: 0.35, f12: 0.55, f13: 0.78, f14: 0.12, f5: 0.5, f6: 0.4 };
  const eggs: FarmData["eggs"] = [];
  for (let d = -90; d <= 0; d++) {
    for (const [fid, rate] of Object.entries(layerRates)) {
      const fl = flocks.find((x) => x.id === fid)!;
      const seasonal = 1 + Math.sin((d + 90) / 14) * 0.05;
      const collected = Math.round(fl.initialQty * 0.95 * rate * seasonal * (0.94 + r() * 0.08));
      eggs.push({ id: id("e"), flockId: fid, date: isoDay(d), collected, cracked: Math.round(collected * 0.02 * r() * 2), dirty: Math.round(collected * 0.03 * r() * 2) });
    }
  }

  const weights: FarmData["weights"] = [];
  for (const f of flocks) {
    const br = breeds.find((b) => b.id === f.breedId)!;
    const ageW = Math.floor((Date.now() - new Date(f.startDate).getTime()) / (7 * 864e5));
    const tgt = (w: number) => { const t = br.targetWeights; for (let i = 1; i < t.length; i++) if (w <= t[i].week) { const a = t[i - 1], b = t[i]; return a.grams + (b.grams - a.grams) * ((w - a.week) / (b.week - a.week)); } return t[t.length - 1].grams; };
    const startW = Math.max(0, ageW - 12);
    for (let w = startW; w <= ageW; w += 2) {
      weights.push({ id: id("w"), flockId: f.id, date: isoDay(-(ageW - w) * 7), ageWeeks: w, sampleSize: 10, avgGrams: Math.round(tgt(w) * (0.9 + r() * 0.15)) });
    }
  }

  const diseases: FarmData["diseases"] = [
    { id: "d1", name: "Newcastle Disease", species: ["chicken", "guinea", "turkey", "pigeon"], signs: "Twisted neck, green diarrhoea, drop in lay, respiratory distress.", prevention: "Vaccinate (Lasota/I-2) every 3 months; biosecurity." },
    { id: "d2", name: "Gumboro (IBD)", species: ["chicken"], signs: "Ruffled feathers, whitish diarrhoea, depression at 3–6 weeks.", prevention: "Vaccinate day 10–14 and day 21." },
    { id: "d3", name: "Coccidiosis", species: ["chicken", "turkey", "guinea"], signs: "Bloody droppings, huddling, poor growth.", prevention: "Dry litter, coccidiostat in starter feed." },
    { id: "d4", name: "Fowl Typhoid", species: ["chicken", "turkey", "guinea"], signs: "Yellow-green diarrhoea, sudden deaths.", prevention: "Vaccinate at 8 weeks; clean water." },
    { id: "d5", name: "Marek's Disease", species: ["chicken"], signs: "Leg paralysis, grey eyes, tumours.", prevention: "Day-old vaccination at hatchery." },
    { id: "d6", name: "Fowl Pox", species: ["chicken", "turkey", "pigeon"], signs: "Wart-like scabs on comb/wattles.", prevention: "Wing-web vaccination; mosquito control." },
    { id: "d7", name: "Canker (Trichomoniasis)", species: ["pigeon"], signs: "Yellow cheesy mouth lesions, weight loss.", prevention: "Clean water, periodic treatment." },
    { id: "d8", name: "Pigeon Paramyxovirus (PMV-1)", species: ["pigeon"], signs: "Watery droppings, twisted neck.", prevention: "Annual PMV vaccine." },
    { id: "d9", name: "Blackhead (Histomoniasis)", species: ["turkey"], signs: "Sulphur-yellow droppings, dark head.", prevention: "Separate from chickens; deworm." },
    { id: "d10", name: "Duck Viral Enteritis", species: ["duck", "goose"], signs: "Bloody discharge, photophobia, sudden deaths.", prevention: "Vaccinate; avoid wild waterfowl contact." },
    { id: "d11", name: "Aspergillosis", species: ["goose", "duck", "turkey"], signs: "Gasping, respiratory distress.", prevention: "Dry, mould-free bedding and feed." },
    { id: "d12", name: "Chronic Respiratory Disease", species: ["chicken", "turkey"], signs: "Sneezing, nasal discharge, swollen face.", prevention: "Ventilation; buy from clean stock." },
  ];

  const health: FarmData["health"] = [
    { id: id("h"), flockId: "f4", date: isoDay(-3), symptoms: "Bloody droppings, huddling", disease: "Coccidiosis", confirmed: true, treatment: "Anticoccidial in water", medicine: "Amprolium 20%", dose: "1 g/L", durationDays: 5, withdrawalDays: 7, vet: "Dr. Wanjiru", outcome: "Ongoing", affected: 14, notes: "Litter changed." },
    { id: id("h"), flockId: "f8", date: isoDay(-9), symptoms: "Yellow lesions in mouth", disease: "Canker", confirmed: true, treatment: "Metronidazole", medicine: "Ronidazole 10%", dose: "1 g/2L", durationDays: 7, withdrawalDays: 0, vet: "Dr. Otieno", outcome: "Recovered", affected: 4, notes: "" },
    { id: id("h"), flockId: "f1", date: isoDay(-1), symptoms: "Sneezing, slight drop in lay", disease: "Chronic Respiratory Disease", confirmed: false, treatment: "Antibiotic + vitamins", medicine: "Tylosin", dose: "0.5 g/L", durationDays: 5, withdrawalDays: 5, vet: "Dr. Wanjiru", outcome: "Monitoring", affected: 25, notes: "Improve ventilation." },
    { id: id("h"), flockId: "f11", date: isoDay(-22), symptoms: "Yellow droppings", disease: "Blackhead", confirmed: false, treatment: "Dewormer", medicine: "Levamisole", dose: "Per label", durationDays: 1, withdrawalDays: 7, vet: "Dr. Otieno", outcome: "Recovered", affected: 3, notes: "" },
    { id: id("h"), flockId: "f12", date: isoDay(-14), symptoms: "Lameness", disease: "Leg weakness", confirmed: false, treatment: "Niacin supplement", medicine: "Brewer's yeast", dose: "5%", durationDays: 14, withdrawalDays: 0, vet: "Farm manager", outcome: "Recovered", affected: 5, notes: "" },
  ];

  const V = (flockId: string, vaccine: string, disease: string, route: string, due: number, given?: boolean): FarmData["vaccinations"][number] => ({
    id: id("v"), flockId, vaccine, disease, dose: route === "Injection" ? "0.5 ml" : "1 dose/bird", route, dueDate: isoDay(due),
    ...(given ? { givenDate: isoDay(due), batch: `B${1000 + Math.floor(r() * 9000)}`, administrator: "Peter K.", nextDue: isoDay(due + 90) } : {}),
  });
  const vaccinations = [
    V("f3", "Gumboro (IBD) D78", "Gumboro", "Drinking water", -4, true), V("f3", "Gumboro booster", "Gumboro", "Drinking water", 3),
    V("f3", "Newcastle Lasota", "Newcastle", "Eye drop", 1), V("f4", "Fowl Typhoid", "Fowl Typhoid", "Injection", -2),
    V("f4", "Fowl Pox", "Fowl Pox", "Wing web", 6), V("f1", "Newcastle I-2", "Newcastle", "Drinking water", 5),
    V("f2", "Newcastle I-2", "Newcastle", "Drinking water", -30, true), V("f8", "PMV-1 Colombovac", "PMV-1", "Injection", 12),
    V("f9", "PMV-1 Colombovac", "PMV-1", "Injection", -60, true), V("f10", "Newcastle Lasota", "Newcastle", "Drinking water", 9),
    V("f11", "Fowl Pox", "Fowl Pox", "Wing web", -1), V("f12", "Duck Plague", "Duck Viral Enteritis", "Injection", 20),
    V("f14", "Duck Plague", "Duck Viral Enteritis", "Injection", 25), V("f7", "Newcastle Lasota", "Newcastle", "Eye drop", -45, true),
  ];

  const breeding: FarmData["breeding"] = [
    { id: id("bg"), name: "Brahma Pen 1", speciesId: "chicken", breedId: "b-brahma", males: 2, females: 12, matingDate: isoDay(-60), eggsSet: 96, fertile: 84, hatched: 72, hatchDate: isoDay(-18), notes: "Offspring → CH-C01" },
    { id: id("bg"), name: "Silkie Pen", speciesId: "chicken", breedId: "b-silkie", males: 1, females: 8, matingDate: isoDay(-25), eggsSet: 40, fertile: 35, hatched: 0, hatchDate: isoDay(2), notes: "In incubator" },
    { id: id("bg"), name: "Fantail Pair F-07", speciesId: "pigeon", breedId: "b-fantail", males: 1, females: 1, maleId: "Cock #FT12", femaleId: "Hen #FT19", matingDate: isoDay(-30), eggsSet: 2, fertile: 2, hatched: 2, hatchDate: isoDay(-12), notes: "Two white squabs" },
    { id: id("bg"), name: "King Pair K-03", speciesId: "pigeon", breedId: "b-king", males: 1, females: 1, maleId: "Cock #K04", femaleId: "Hen #K11", matingDate: isoDay(-14), eggsSet: 2, fertile: 2, hatched: 0, hatchDate: isoDay(4), notes: "" },
    { id: id("bg"), name: "Jacobin Pair J-01", speciesId: "pigeon", breedId: "b-jacobin", males: 1, females: 1, maleId: "Cock #J02", femaleId: "Hen #J05", matingDate: isoDay(-40), eggsSet: 2, fertile: 1, hatched: 1, hatchDate: isoDay(-22), notes: "Fostered under Homers" },
    { id: id("bg"), name: "Muscovy Nest", speciesId: "duck", breedId: "b-muscovy", males: 1, females: 4, matingDate: isoDay(-40), eggsSet: 30, fertile: 26, hatched: 0, hatchDate: isoDay(1), notes: "Natural brooding" },
    { id: id("bg"), name: "Toulouse Trio", speciesId: "goose", breedId: "b-toulouse", males: 1, females: 2, matingDate: isoDay(-50), eggsSet: 12, fertile: 9, hatched: 7, hatchDate: isoDay(-15), notes: "" },
  ];

  const feedItems: FarmData["feedItems"] = [
    { id: "fd1", name: "Chick & Duck Mash", supplier: "Unga Farmcare", bagKg: 50, pricePerBag: 3900, stockKg: 180, reorderKg: 150 },
    { id: "fd2", name: "Growers Mash", supplier: "Unga Farmcare", bagKg: 70, pricePerBag: 4900, stockKg: 620, reorderKg: 280 },
    { id: "fd3", name: "Layers Mash", supplier: "Pembe Feeds", bagKg: 70, pricePerBag: 4600, stockKg: 1150, reorderKg: 420 },
    { id: "fd4", name: "Pigeon Grain Mix", supplier: "Agrovet Kiambu", bagKg: 25, pricePerBag: 3200, stockKg: 40, reorderKg: 50 },
    { id: "fd5", name: "Turkey Grower Pellets", supplier: "Sigma Feeds", bagKg: 50, pricePerBag: 4500, stockKg: 210, reorderKg: 100 },
    { id: "fd6", name: "Whole Maize", supplier: "Local", bagKg: 90, pricePerBag: 4200, stockKg: 360, reorderKg: 180 },
  ];
  const feedUse: [string, string, number][] = [["fd3", "f1", 50], ["fd3", "f2", 32], ["fd1", "f3", 5], ["fd2", "f4", 18], ["fd2", "f7", 5], ["fd3", "f5", 5], ["fd4", "f8", 2], ["fd4", "f9", 2], ["fd6", "f10", 7], ["fd5", "f11", 9], ["fd3", "f12", 11], ["fd3", "f13", 7], ["fd6", "f14", 4]];
  const feedTx: FarmData["feedTx"] = [];
  for (let d = -30; d <= 0; d++) for (const [feedId, flockId, kg] of feedUse) feedTx.push({ id: id("t"), feedId, flockId, date: isoDay(d), type: "Use", kg: Math.round(kg * (0.92 + r() * 0.16) * 10) / 10 });
  for (let d = -30; d <= 0; d += 7) feedTx.push({ id: id("t"), feedId: "fd3", date: isoDay(d), type: "Waste", kg: 3 });
  for (const fi of feedItems) feedTx.push({ id: id("t"), feedId: fi.id, date: isoDay(-Math.floor(r() * 25)), type: "Purchase", kg: fi.bagKg * 10, cost: fi.pricePerBag * 10 });

  const money: FarmData["money"] = [];
  for (let d = -90; d <= 0; d++) {
    if (d % 2 === 0) money.push({ id: id("$"), kind: "income", date: isoDay(d), category: "Egg sales", party: ["Naivas", "Quickmart", "Local hotel", "Walk-in"][Math.floor(r() * 4)], speciesId: "chicken", amount: Math.round((18 + r() * 8)) * 30 * 12, method: r() > 0.5 ? "M-Pesa" : "Cash", notes: "" });
    if (d % 7 === 0) money.push({ id: id("$"), kind: "expense", date: isoDay(d), category: "Labour", party: "Farm staff", amount: 7000, method: "M-Pesa", notes: "Weekly wages" });
    if (d % 10 === 0) money.push({ id: id("$"), kind: "expense", date: isoDay(d), category: "Feed", party: "Unga Farmcare", amount: 28000 + Math.round(r() * 12000), method: "Bank", notes: "" });
    if (d % 15 === 0) money.push({ id: id("$"), kind: "income", date: isoDay(d), category: "Bird sales", party: "Local buyers", speciesId: (["pigeon", "chicken", "duck", "turkey"] as SpeciesId[])[Math.floor(r() * 4)], amount: 12000 + Math.round(r() * 30000), method: "M-Pesa", notes: "" });
    if (d % 20 === 0) money.push({ id: id("$"), kind: "expense", date: isoDay(d), category: "Vaccine", party: "Agrovet Kiambu", amount: 2500 + Math.round(r() * 3000), method: "Cash", notes: "" });
    if (d % 18 === 0) money.push({ id: id("$"), kind: "expense", date: isoDay(d), category: "Medicine", party: "Agrovet Kiambu", amount: 1800 + Math.round(r() * 4000), method: "M-Pesa", notes: "" });
    if (d % 30 === 0) money.push({ id: id("$"), kind: "expense", date: isoDay(d), category: "Utilities", party: "KPLC", amount: 4500, method: "M-Pesa", notes: "Electricity" });
  }
  money.push({ id: id("$"), kind: "income", date: isoDay(-5), category: "Manure", party: "Neighbour farm", amount: 3500, method: "Cash", notes: "" });

  const reminders: FarmData["reminders"] = [
    { id: id("r"), type: "Weighing", title: "Weigh Kuroiler Growers (CH-G01)", dueDate: isoDay(1), done: false },
    { id: id("r"), type: "Hatching", title: "Silkie eggs due to hatch", dueDate: isoDay(2), done: false },
    { id: id("r"), type: "Treatment", title: "Finish Amprolium course — CH-G01", dueDate: isoDay(2), done: false },
    { id: id("r"), type: "Egg collection", title: "Afternoon egg collection — Layer House A", dueDate: isoDay(0), done: false },
    { id: id("r"), type: "Reorder", title: "Reorder Pigeon Grain Mix", dueDate: isoDay(0), done: false },
    { id: id("r"), type: "Hatching", title: "Candle King pair K-03 eggs", dueDate: isoDay(4), done: false },
  ];

  return { species, breeds, housing, flocks, movements, weights, eggs, diseases, health, vaccinations, breeding, feedItems, feedTx, money, reminders,
    settings: { farmName: "JEMS FARM", owner: "James M.", location: "Kiambu, Kenya", currency: "KES" } };
}

function f(list: Flock[], id: string) { return list.find((x) => x.id === id)!.id; }
