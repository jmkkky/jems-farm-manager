
CREATE TYPE public.farm_role AS ENUM ('owner','admin','staff');

CREATE OR REPLACE FUNCTION public.touch_updated_at() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END $$;

CREATE TABLE public.profiles (
  id uuid PRIMARY KEY,
  full_name text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own profile read" ON public.profiles FOR SELECT TO authenticated USING (id = auth.uid());
CREATE POLICY "own profile insert" ON public.profiles FOR INSERT TO authenticated WITH CHECK (id = auth.uid());
CREATE POLICY "own profile update" ON public.profiles FOR UPDATE TO authenticated USING (id = auth.uid());

CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name) VALUES (NEW.id, coalesce(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email,'@',1)))
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END $$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE TABLE public.farms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  owner_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.farm_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  farm_id uuid NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  role public.farm_role NOT NULL DEFAULT 'staff',
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (farm_id, user_id)
);
CREATE INDEX ON public.farm_members(user_id);
GRANT SELECT, UPDATE ON public.farms TO authenticated;
GRANT ALL ON public.farms TO service_role;
GRANT SELECT ON public.farm_members TO authenticated;
GRANT ALL ON public.farm_members TO service_role;
ALTER TABLE public.farms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.farm_members ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.is_farm_member(_farm uuid) RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.farm_members WHERE farm_id = _farm AND user_id = auth.uid())
$$;
CREATE OR REPLACE FUNCTION public.has_farm_role(_farm uuid, _roles public.farm_role[]) RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.farm_members WHERE farm_id = _farm AND user_id = auth.uid() AND role = ANY(_roles))
$$;

CREATE POLICY "members read farm" ON public.farms FOR SELECT TO authenticated USING (public.is_farm_member(id));
CREATE POLICY "admins update farm" ON public.farms FOR UPDATE TO authenticated USING (public.has_farm_role(id, ARRAY['owner','admin']::public.farm_role[]));
CREATE POLICY "members read membership" ON public.farm_members FOR SELECT TO authenticated USING (public.is_farm_member(farm_id));

CREATE OR REPLACE FUNCTION public.create_farm(_name text) RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE fid uuid;
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'Not signed in'; END IF;
  INSERT INTO public.farms (name, owner_id) VALUES (coalesce(nullif(trim(_name),''),'JEMS FARM'), auth.uid()) RETURNING id INTO fid;
  INSERT INTO public.farm_members (farm_id, user_id, role) VALUES (fid, auth.uid(), 'owner');
  RETURN fid;
END $$;
REVOKE ALL ON FUNCTION public.create_farm(text) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.create_farm(text) TO authenticated;

-- Global reference tables
CREATE TABLE public.species (id text PRIMARY KEY, name text NOT NULL, emoji text NOT NULL DEFAULT '', sort int NOT NULL DEFAULT 0);
CREATE TABLE public.diseases (id text PRIMARY KEY, name text NOT NULL, species text[] NOT NULL DEFAULT '{}', signs text NOT NULL DEFAULT '', prevention text NOT NULL DEFAULT '');
GRANT SELECT ON public.species, public.diseases TO authenticated;
GRANT ALL ON public.species, public.diseases TO service_role;
ALTER TABLE public.species ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diseases ENABLE ROW LEVEL SECURITY;
CREATE POLICY "read species" ON public.species FOR SELECT TO authenticated USING (true);
CREATE POLICY "read diseases" ON public.diseases FOR SELECT TO authenticated USING (true);

INSERT INTO public.species VALUES ('chicken','Chickens','🐔',1),('pigeon','Pigeons','🕊️',2),('guinea','Guinea fowl','🐦',3),('turkey','Turkeys','🦃',4),('duck','Ducks','🦆',5),('goose','Geese','🪿',6);
INSERT INTO public.diseases VALUES
('d1','Newcastle Disease','{chicken,guinea,turkey,pigeon}','Twisted neck, green diarrhoea, sudden drop in lay, high mortality.','Vaccinate (Lasota / I-2); biosecurity.'),
('d2','Gumboro (IBD)','{chicken}','Ruffled feathers, whitish diarrhoea in 3-6 week chicks.','Vaccinate at 10-14 and 21-24 days.'),
('d3','Coccidiosis','{chicken,turkey,guinea}','Bloody droppings, huddling, poor growth.','Dry litter; anticoccidials in starter feed.'),
('d4','Fowl Typhoid','{chicken,turkey,guinea}','Yellow-green diarrhoea, weakness.','Vaccinate; buy from clean hatcheries.'),
('d5','Fowl Pox','{chicken,turkey,pigeon}','Wart-like scabs on comb and wattles.','Wing-web vaccination; mosquito control.'),
('d6','Marek''s Disease','{chicken}','Leg paralysis, grey eyes, tumours.','Vaccinate day-old chicks.'),
('d7','Canker (Trichomoniasis)','{pigeon}','Yellow cheesy lesions in mouth/throat.','Clean water; periodic treatment.'),
('d8','Pigeon Paramyxovirus (PMV-1)','{pigeon}','Twisted neck, watery droppings, trembling.','Annual PMV vaccination.'),
('d9','Blackhead (Histomoniasis)','{turkey,chicken}','Sulphur-yellow droppings, lethargy.','Keep turkeys apart from chickens; deworm.'),
('d10','Duck Viral Enteritis','{duck,goose}','Bloody vent, photophobia, sudden deaths.','Duck plague vaccine.'),
('d11','Aspergillosis','{goose,duck,turkey}','Gasping, respiratory distress.','Dry, mould-free bedding and feed.'),
('d12','Chronic Respiratory Disease','{chicken,turkey}','Sneezing, nasal discharge, swollen face.','Ventilation; buy from clean stock.');

-- Farm-scoped tables
CREATE TABLE public.farm_settings (id text PRIMARY KEY DEFAULT gen_random_uuid()::text, farm_id uuid NOT NULL UNIQUE REFERENCES public.farms(id) ON DELETE CASCADE,
  farm_name text NOT NULL DEFAULT 'JEMS FARM', owner_name text NOT NULL DEFAULT '', location text NOT NULL DEFAULT '', phone text NOT NULL DEFAULT '', currency text NOT NULL DEFAULT 'KES',
  weight_unit text NOT NULL DEFAULT 'g', theme text NOT NULL DEFAULT 'light', notify_days int NOT NULL DEFAULT 7, low_stock_alerts boolean NOT NULL DEFAULT true,
  expense_categories text[] NOT NULL DEFAULT '{Feed,Medicine,Vaccine,Birds,Equipment,Labour,Transport,Utilities,Other}',
  income_categories text[] NOT NULL DEFAULT '{Egg sales,Bird sales,Manure,Other}');
CREATE TABLE public.breeds (id text PRIMARY KEY DEFAULT gen_random_uuid()::text, farm_id uuid NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
  species_id text NOT NULL REFERENCES public.species(id), name text NOT NULL, origin text NOT NULL DEFAULT '', purpose text NOT NULL DEFAULT '', maturity_weeks int NOT NULL DEFAULT 20,
  lay_min int NOT NULL DEFAULT 0, lay_max int NOT NULL DEFAULT 0, egg_color text NOT NULL DEFAULT '', egg_weight_g double precision NOT NULL DEFAULT 0,
  target_weights jsonb NOT NULL DEFAULT '[]', breeding_notes text NOT NULL DEFAULT '', health_notes text NOT NULL DEFAULT '', notes text NOT NULL DEFAULT '');
CREATE TABLE public.locations (id text PRIMARY KEY DEFAULT gen_random_uuid()::text, farm_id uuid NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
  name text NOT NULL, kind text NOT NULL DEFAULT 'House', capacity int NOT NULL DEFAULT 0, notes text NOT NULL DEFAULT '');
CREATE TABLE public.flocks (id text PRIMARY KEY DEFAULT gen_random_uuid()::text, farm_id uuid NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
  code text NOT NULL, name text NOT NULL, species_id text NOT NULL REFERENCES public.species(id), breed_id text REFERENCES public.breeds(id) ON DELETE SET NULL,
  source text NOT NULL DEFAULT '', start_date date NOT NULL DEFAULT current_date, opening_qty int NOT NULL DEFAULT 0 CHECK (opening_qty >= 0), sex text NOT NULL DEFAULT 'Mixed',
  stage text NOT NULL DEFAULT 'Adults', location_id text REFERENCES public.locations(id) ON DELETE SET NULL, purpose text NOT NULL DEFAULT '', status text NOT NULL DEFAULT 'Active', notes text NOT NULL DEFAULT '',
  UNIQUE (farm_id, code));
CREATE TABLE public.flock_movements (id text PRIMARY KEY DEFAULT gen_random_uuid()::text, farm_id uuid NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
  flock_id text NOT NULL REFERENCES public.flocks(id) ON DELETE CASCADE, date date NOT NULL DEFAULT current_date, type text NOT NULL, qty int NOT NULL,
  counterpart_flock_id text REFERENCES public.flocks(id) ON DELETE SET NULL, amount double precision NOT NULL DEFAULT 0, notes text NOT NULL DEFAULT '');
CREATE TABLE public.weights (id text PRIMARY KEY DEFAULT gen_random_uuid()::text, farm_id uuid NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
  flock_id text NOT NULL REFERENCES public.flocks(id) ON DELETE CASCADE, date date NOT NULL DEFAULT current_date, age_weeks double precision NOT NULL DEFAULT 0,
  sample_count int NOT NULL DEFAULT 1 CHECK (sample_count > 0), avg_g double precision NOT NULL CHECK (avg_g >= 0), min_g double precision, max_g double precision, notes text NOT NULL DEFAULT '');
CREATE TABLE public.eggs (id text PRIMARY KEY DEFAULT gen_random_uuid()::text, farm_id uuid NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
  flock_id text NOT NULL REFERENCES public.flocks(id) ON DELETE CASCADE, date date NOT NULL DEFAULT current_date, live_females int NOT NULL DEFAULT 0 CHECK (live_females >= 0),
  collected int NOT NULL DEFAULT 0 CHECK (collected >= 0), cracked int NOT NULL DEFAULT 0 CHECK (cracked >= 0), dirty int NOT NULL DEFAULT 0 CHECK (dirty >= 0), losses int NOT NULL DEFAULT 0 CHECK (losses >= 0), notes text NOT NULL DEFAULT '');
CREATE TABLE public.health_events (id text PRIMARY KEY DEFAULT gen_random_uuid()::text, farm_id uuid NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
  flock_id text NOT NULL REFERENCES public.flocks(id) ON DELETE CASCADE, date date NOT NULL DEFAULT current_date, symptoms text NOT NULL DEFAULT '', disease text NOT NULL DEFAULT '',
  confirmed boolean NOT NULL DEFAULT false, severity text NOT NULL DEFAULT 'Mild', affected int NOT NULL DEFAULT 0, recovered int NOT NULL DEFAULT 0, deaths int NOT NULL DEFAULT 0,
  outcome text NOT NULL DEFAULT 'Ongoing', notes text NOT NULL DEFAULT '');
CREATE TABLE public.medications (id text PRIMARY KEY DEFAULT gen_random_uuid()::text, farm_id uuid NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
  name text NOT NULL, kind text NOT NULL DEFAULT 'Antibiotic', unit text NOT NULL DEFAULT 'g', withdrawal_days int NOT NULL DEFAULT 0, notes text NOT NULL DEFAULT '');
CREATE TABLE public.treatments (id text PRIMARY KEY DEFAULT gen_random_uuid()::text, farm_id uuid NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
  flock_id text NOT NULL REFERENCES public.flocks(id) ON DELETE CASCADE, health_event_id text REFERENCES public.health_events(id) ON DELETE SET NULL,
  medicine text NOT NULL, dose text NOT NULL DEFAULT '', route text NOT NULL DEFAULT 'Drinking water', frequency text NOT NULL DEFAULT 'Daily',
  start_date date NOT NULL DEFAULT current_date, end_date date, withdrawal_days int NOT NULL DEFAULT 0, provider text NOT NULL DEFAULT '', cost double precision NOT NULL DEFAULT 0,
  outcome text NOT NULL DEFAULT 'Ongoing', notes text NOT NULL DEFAULT '');
CREATE TABLE public.vaccines (id text PRIMARY KEY DEFAULT gen_random_uuid()::text, farm_id uuid NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
  name text NOT NULL, disease text NOT NULL DEFAULT '', route text NOT NULL DEFAULT 'Drinking water', dose text NOT NULL DEFAULT '', species text[] NOT NULL DEFAULT '{}', notes text NOT NULL DEFAULT '');
CREATE TABLE public.vaccination_schedules (id text PRIMARY KEY DEFAULT gen_random_uuid()::text, farm_id uuid NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
  flock_id text NOT NULL REFERENCES public.flocks(id) ON DELETE CASCADE, vaccine_id text REFERENCES public.vaccines(id) ON DELETE SET NULL,
  vaccine text NOT NULL, disease text NOT NULL DEFAULT '', dose text NOT NULL DEFAULT '', route text NOT NULL DEFAULT '', planned_date date NOT NULL, status text NOT NULL DEFAULT 'Planned', notes text NOT NULL DEFAULT '');
CREATE TABLE public.vaccination_records (id text PRIMARY KEY DEFAULT gen_random_uuid()::text, farm_id uuid NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
  flock_id text NOT NULL REFERENCES public.flocks(id) ON DELETE CASCADE, schedule_id text REFERENCES public.vaccination_schedules(id) ON DELETE SET NULL,
  vaccine text NOT NULL, disease text NOT NULL DEFAULT '', dose text NOT NULL DEFAULT '', route text NOT NULL DEFAULT '', administered_date date NOT NULL DEFAULT current_date,
  batch text NOT NULL DEFAULT '', expiry date, administrator text NOT NULL DEFAULT '', next_due date, notes text NOT NULL DEFAULT '');
CREATE TABLE public.breeding_groups (id text PRIMARY KEY DEFAULT gen_random_uuid()::text, farm_id uuid NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
  name text NOT NULL, kind text NOT NULL DEFAULT 'Group', species_id text NOT NULL REFERENCES public.species(id), breed_id text REFERENCES public.breeds(id) ON DELETE SET NULL,
  flock_id text REFERENCES public.flocks(id) ON DELETE SET NULL, males int NOT NULL DEFAULT 1, females int NOT NULL DEFAULT 1, male_tag text NOT NULL DEFAULT '', female_tag text NOT NULL DEFAULT '',
  pairing_date date NOT NULL DEFAULT current_date, status text NOT NULL DEFAULT 'Active', notes text NOT NULL DEFAULT '');
CREATE TABLE public.breeding_events (id text PRIMARY KEY DEFAULT gen_random_uuid()::text, farm_id uuid NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
  group_id text NOT NULL REFERENCES public.breeding_groups(id) ON DELETE CASCADE, date date NOT NULL DEFAULT current_date, type text NOT NULL DEFAULT 'Note', eggs int NOT NULL DEFAULT 0, notes text NOT NULL DEFAULT '');
CREATE TABLE public.hatch_batches (id text PRIMARY KEY DEFAULT gen_random_uuid()::text, farm_id uuid NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
  group_id text REFERENCES public.breeding_groups(id) ON DELETE SET NULL, set_date date NOT NULL DEFAULT current_date, eggs_set int NOT NULL DEFAULT 0 CHECK (eggs_set >= 0),
  fertile int NOT NULL DEFAULT 0 CHECK (fertile >= 0), hatched int NOT NULL DEFAULT 0 CHECK (hatched >= 0), hatch_date date, offspring_flock_id text REFERENCES public.flocks(id) ON DELETE SET NULL, notes text NOT NULL DEFAULT '');
CREATE TABLE public.feed_items (id text PRIMARY KEY DEFAULT gen_random_uuid()::text, farm_id uuid NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
  name text NOT NULL, supplier text NOT NULL DEFAULT '', unit text NOT NULL DEFAULT 'kg', bag_kg double precision NOT NULL DEFAULT 50 CHECK (bag_kg > 0), price_per_bag double precision NOT NULL DEFAULT 0,
  reorder_kg double precision NOT NULL DEFAULT 0, expiry date, notes text NOT NULL DEFAULT '');
CREATE TABLE public.feed_transactions (id text PRIMARY KEY DEFAULT gen_random_uuid()::text, farm_id uuid NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
  feed_id text NOT NULL REFERENCES public.feed_items(id) ON DELETE CASCADE, flock_id text REFERENCES public.flocks(id) ON DELETE SET NULL, date date NOT NULL DEFAULT current_date,
  type text NOT NULL, kg double precision NOT NULL CHECK (kg > 0), cost double precision NOT NULL DEFAULT 0, notes text NOT NULL DEFAULT '');
CREATE TABLE public.inventory_adjustments (id text PRIMARY KEY DEFAULT gen_random_uuid()::text, farm_id uuid NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
  feed_id text NOT NULL REFERENCES public.feed_items(id) ON DELETE CASCADE, date date NOT NULL DEFAULT current_date, kg double precision NOT NULL, reason text NOT NULL DEFAULT '');
CREATE TABLE public.expenses (id text PRIMARY KEY DEFAULT gen_random_uuid()::text, farm_id uuid NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
  date date NOT NULL DEFAULT current_date, category text NOT NULL, description text NOT NULL DEFAULT '', party text NOT NULL DEFAULT '', flock_id text REFERENCES public.flocks(id) ON DELETE SET NULL,
  amount double precision NOT NULL CHECK (amount >= 0), method text NOT NULL DEFAULT 'M-Pesa', reference text NOT NULL DEFAULT '', notes text NOT NULL DEFAULT '');
CREATE TABLE public.income (id text PRIMARY KEY DEFAULT gen_random_uuid()::text, farm_id uuid NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
  date date NOT NULL DEFAULT current_date, category text NOT NULL, description text NOT NULL DEFAULT '', party text NOT NULL DEFAULT '', flock_id text REFERENCES public.flocks(id) ON DELETE SET NULL,
  amount double precision NOT NULL CHECK (amount >= 0), method text NOT NULL DEFAULT 'M-Pesa', reference text NOT NULL DEFAULT '', notes text NOT NULL DEFAULT '');
CREATE TABLE public.reminders (id text PRIMARY KEY DEFAULT gen_random_uuid()::text, farm_id uuid NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
  type text NOT NULL DEFAULT 'Other', title text NOT NULL, due_date date NOT NULL DEFAULT current_date, done boolean NOT NULL DEFAULT false, related_id text, notes text NOT NULL DEFAULT '');

DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['farm_settings','breeds','locations','flocks','flock_movements','weights','eggs','health_events','medications','treatments','vaccines','vaccination_schedules','vaccination_records','breeding_groups','breeding_events','hatch_batches','feed_items','feed_transactions','inventory_adjustments','expenses','income','reminders'] LOOP
    EXECUTE format('ALTER TABLE public.%I ADD COLUMN created_at timestamptz NOT NULL DEFAULT now(), ADD COLUMN updated_at timestamptz NOT NULL DEFAULT now()', t);
    EXECUTE format('CREATE INDEX ON public.%I (farm_id)', t);
    EXECUTE format('CREATE TRIGGER touch_%s BEFORE UPDATE ON public.%I FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at()', t, t);
    EXECUTE format('GRANT SELECT, INSERT, UPDATE, DELETE ON public.%I TO authenticated', t);
    EXECUTE format('GRANT ALL ON public.%I TO service_role', t);
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('CREATE POLICY "members read" ON public.%I FOR SELECT TO authenticated USING (public.is_farm_member(farm_id))', t);
    EXECUTE format('CREATE POLICY "members insert" ON public.%I FOR INSERT TO authenticated WITH CHECK (public.is_farm_member(farm_id))', t);
    EXECUTE format('CREATE POLICY "members update" ON public.%I FOR UPDATE TO authenticated USING (public.is_farm_member(farm_id)) WITH CHECK (public.is_farm_member(farm_id))', t);
    EXECUTE format('CREATE POLICY "admins delete" ON public.%I FOR DELETE TO authenticated USING (public.has_farm_role(farm_id, ARRAY[''owner'',''admin'']::public.farm_role[]))', t);
  END LOOP;
END $$;

CREATE INDEX ON public.flock_movements (flock_id, date);
CREATE INDEX ON public.weights (flock_id, date);
CREATE INDEX ON public.eggs (flock_id, date);
CREATE INDEX ON public.health_events (flock_id, date);
CREATE INDEX ON public.treatments (flock_id);
CREATE INDEX ON public.vaccination_schedules (flock_id, planned_date);
CREATE INDEX ON public.vaccination_records (flock_id);
CREATE INDEX ON public.feed_transactions (feed_id, date);
CREATE INDEX ON public.expenses (farm_id, date);
CREATE INDEX ON public.income (farm_id, date);
CREATE INDEX ON public.reminders (farm_id, due_date);
