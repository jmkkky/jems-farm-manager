export type SpeciesId = "chicken" | "pigeon" | "guinea" | "turkey" | "duck" | "goose";
export interface Species { id: SpeciesId; name: string; emoji: string; }
export interface Breed {
  id: string; speciesId: SpeciesId; name: string; purpose: string;
  maturityWeeks: number; eggsPerYear: number; eggColor: string; eggWeightG: number;
  targetWeights: { week: number; grams: number }[];
  breedingNotes: string; healthNotes: string;
}
export interface Housing { id: string; name: string; capacity: number; }
export type Stage = "Chicks" | "Growers" | "Layers" | "Breeders" | "Squabs" | "Adults" | "Keets" | "Poults" | "Ducklings" | "Goslings";
export interface Flock {
  id: string; code: string; name: string; speciesId: SpeciesId; breedId: string;
  source: string; startDate: string; initialQty: number; sex: string; stage: Stage;
  housingId: string; purpose: string; status: "Active" | "Sold" | "Closed"; notes: string;
}
export type MovementType = "Addition" | "Death" | "Sale" | "Transfer" | "Cull";
export interface Movement { id: string; flockId: string; date: string; type: MovementType; qty: number; notes: string; }
export interface WeightRecord { id: string; flockId: string; date: string; ageWeeks: number; sampleSize: number; avgGrams: number; }
export interface EggRecord { id: string; flockId: string; date: string; collected: number; cracked: number; dirty: number; }
export interface Disease { id: string; name: string; species: SpeciesId[]; signs: string; prevention: string; }
export interface HealthEvent {
  id: string; flockId: string; date: string; symptoms: string; disease: string; confirmed: boolean;
  treatment: string; medicine: string; dose: string; durationDays: number; withdrawalDays: number;
  vet: string; outcome: "Ongoing" | "Recovered" | "Died" | "Monitoring"; affected: number; notes: string;
}
export interface Vaccination {
  id: string; flockId: string; vaccine: string; disease: string; dose: string; route: string;
  dueDate: string; givenDate?: string; batch?: string; administrator?: string; nextDue?: string;
}
export interface BreedingGroup {
  id: string; name: string; speciesId: SpeciesId; breedId: string; males: number; females: number;
  maleId?: string; femaleId?: string; matingDate: string; eggsSet: number; fertile: number; hatched: number;
  hatchDate?: string; notes: string;
}
export interface FeedItem { id: string; name: string; supplier: string; bagKg: number; pricePerBag: number; stockKg: number; reorderKg: number; }
export interface FeedTx { id: string; feedId: string; flockId?: string; date: string; type: "Purchase" | "Use" | "Waste"; kg: number; cost?: number; }
export interface Money { id: string; kind: "expense" | "income"; date: string; category: string; party: string; speciesId?: SpeciesId; flockId?: string; amount: number; method: string; notes: string; }
export interface Reminder { id: string; type: "Vaccination" | "Treatment" | "Weighing" | "Egg collection" | "Hatching" | "Reorder"; title: string; dueDate: string; done: boolean; }
export interface Settings { farmName: string; owner: string; location: string; currency: string; }
export interface FarmData {
  species: Species[]; breeds: Breed[]; housing: Housing[]; flocks: Flock[]; movements: Movement[];
  weights: WeightRecord[]; eggs: EggRecord[]; diseases: Disease[]; health: HealthEvent[];
  vaccinations: Vaccination[]; breeding: BreedingGroup[]; feedItems: FeedItem[]; feedTx: FeedTx[];
  money: Money[]; reminders: Reminder[]; settings: Settings;
}
