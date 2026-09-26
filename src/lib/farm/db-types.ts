export type SpeciesId = "chicken" | "pigeon" | "guinea" | "turkey" | "duck" | "goose";
export type Role = "owner" | "admin" | "staff";

export interface Species { id: SpeciesId; name: string; emoji: string; sort: number }
export interface Disease { id: string; name: string; species: SpeciesId[]; signs: string; prevention: string }

interface Row { id: string; createdAt?: string; updatedAt?: string }
export interface Breed extends Row {
  speciesId: SpeciesId; name: string; origin: string; purpose: string; maturityWeeks: number;
  layMin: number; layMax: number; eggColor: string; eggWeightG: number;
  targetWeights: { week: number; grams: number }[]; breedingNotes: string; healthNotes: string; notes: string;
}
export interface Location extends Row { name: string; kind: string; capacity: number; notes: string }
export interface Flock extends Row {
  code: string; name: string; speciesId: SpeciesId; breedId: string | null; source: string; startDate: string;
  openingQty: number; sex: string; stage: string; locationId: string | null; purpose: string; status: string; notes: string;
}
export type MovementType = "Opening" | "Hatch" | "Purchase" | "Transfer in" | "Transfer out" | "Death" | "Sale" | "Cull" | "Adjustment";
export interface Movement extends Row { flockId: string; date: string; type: MovementType; qty: number; counterpartFlockId: string | null; amount: number; notes: string }
export interface WeightRecord extends Row { flockId: string; date: string; ageWeeks: number; sampleCount: number; avgG: number; minG: number | null; maxG: number | null; notes: string }
export interface EggRecord extends Row { flockId: string; date: string; liveFemales: number; collected: number; cracked: number; dirty: number; losses: number; notes: string }
export interface HealthEvent extends Row {
  flockId: string; date: string; symptoms: string; disease: string; confirmed: boolean; severity: string;
  affected: number; recovered: number; deaths: number; outcome: string; notes: string;
}
export interface Medication extends Row { name: string; kind: string; unit: string; withdrawalDays: number; notes: string }
export interface Treatment extends Row {
  flockId: string; healthEventId: string | null; medicine: string; dose: string; route: string; frequency: string;
  startDate: string; endDate: string | null; withdrawalDays: number; provider: string; cost: number; outcome: string; notes: string;
}
export interface Vaccine extends Row { name: string; disease: string; route: string; dose: string; species: string[]; notes: string }
export interface VaccSchedule extends Row { flockId: string; vaccineId: string | null; vaccine: string; disease: string; dose: string; route: string; plannedDate: string; status: string; notes: string }
export interface VaccRecord extends Row {
  flockId: string; scheduleId: string | null; vaccine: string; disease: string; dose: string; route: string;
  administeredDate: string; batch: string; expiry: string | null; administrator: string; nextDue: string | null; notes: string;
}
export interface BreedingGroup extends Row {
  name: string; kind: "Group" | "Pair"; speciesId: SpeciesId; breedId: string | null; flockId: string | null;
  males: number; females: number; maleTag: string; femaleTag: string; pairingDate: string; status: string; notes: string;
}
export interface BreedingEvent extends Row { groupId: string; date: string; type: string; eggs: number; notes: string }
export interface HatchBatch extends Row { groupId: string | null; setDate: string; eggsSet: number; fertile: number; hatched: number; hatchDate: string | null; offspringFlockId: string | null; notes: string }
export interface FeedItem extends Row { name: string; supplier: string; unit: string; bagKg: number; pricePerBag: number; reorderKg: number; expiry: string | null; notes: string }
export interface FeedTx extends Row { feedId: string; flockId: string | null; date: string; type: "Purchase" | "Use" | "Waste"; kg: number; cost: number; notes: string }
export interface Adjustment extends Row { feedId: string; date: string; kg: number; reason: string }
export interface Money extends Row { date: string; category: string; description: string; party: string; flockId: string | null; amount: number; method: string; reference: string; notes: string }
export interface Reminder extends Row { type: string; title: string; dueDate: string; done: boolean; relatedId: string | null; notes: string }
export interface Settings extends Row {
  farmName: string; ownerName: string; location: string; phone: string; currency: string; weightUnit: string; theme: string;
  notifyDays: number; lowStockAlerts: boolean; expenseCategories: string[]; incomeCategories: string[];
}

export interface FarmLists {
  breeds: Breed[]; locations: Location[]; flocks: Flock[]; movements: Movement[]; weights: WeightRecord[]; eggs: EggRecord[];
  health: HealthEvent[]; medications: Medication[]; treatments: Treatment[]; vaccines: Vaccine[]; schedules: VaccSchedule[];
  vaccRecords: VaccRecord[]; breeding: BreedingGroup[]; breedingEvents: BreedingEvent[]; hatches: HatchBatch[];
  feedItems: FeedItem[]; feedTx: FeedTx[]; adjustments: Adjustment[]; expenses: Money[]; income: Money[]; reminders: Reminder[];
}
export type ListKey = keyof FarmLists;
export interface FarmData extends FarmLists { species: Species[]; diseases: Disease[]; settings: Settings }

export const TABLES: Record<ListKey, string> = {
  breeds: "breeds", locations: "locations", flocks: "flocks", movements: "flock_movements", weights: "weights", eggs: "eggs",
  health: "health_events", medications: "medications", treatments: "treatments", vaccines: "vaccines", schedules: "vaccination_schedules",
  vaccRecords: "vaccination_records", breeding: "breeding_groups", breedingEvents: "breeding_events", hatches: "hatch_batches",
  feedItems: "feed_items", feedTx: "feed_transactions", adjustments: "inventory_adjustments", expenses: "expenses", income: "income", reminders: "reminders",
};
// Insert order respecting foreign keys
export const INSERT_ORDER: ListKey[] = ["breeds", "locations", "flocks", "movements", "weights", "eggs", "health", "medications", "treatments", "vaccines",
  "schedules", "vaccRecords", "breeding", "breedingEvents", "hatches", "feedItems", "feedTx", "adjustments", "expenses", "income", "reminders"];
