export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      breeding_events: {
        Row: {
          created_at: string
          date: string
          eggs: number
          farm_id: string
          group_id: string
          id: string
          notes: string
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          date?: string
          eggs?: number
          farm_id: string
          group_id: string
          id?: string
          notes?: string
          type?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          date?: string
          eggs?: number
          farm_id?: string
          group_id?: string
          id?: string
          notes?: string
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "breeding_events_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "breeding_events_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "breeding_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      breeding_groups: {
        Row: {
          breed_id: string | null
          created_at: string
          farm_id: string
          female_tag: string
          females: number
          flock_id: string | null
          id: string
          kind: string
          male_tag: string
          males: number
          name: string
          notes: string
          pairing_date: string
          species_id: string
          status: string
          updated_at: string
        }
        Insert: {
          breed_id?: string | null
          created_at?: string
          farm_id: string
          female_tag?: string
          females?: number
          flock_id?: string | null
          id?: string
          kind?: string
          male_tag?: string
          males?: number
          name: string
          notes?: string
          pairing_date?: string
          species_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          breed_id?: string | null
          created_at?: string
          farm_id?: string
          female_tag?: string
          females?: number
          flock_id?: string | null
          id?: string
          kind?: string
          male_tag?: string
          males?: number
          name?: string
          notes?: string
          pairing_date?: string
          species_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "breeding_groups_breed_id_fkey"
            columns: ["breed_id"]
            isOneToOne: false
            referencedRelation: "breeds"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "breeding_groups_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "breeding_groups_flock_id_fkey"
            columns: ["flock_id"]
            isOneToOne: false
            referencedRelation: "flocks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "breeding_groups_species_id_fkey"
            columns: ["species_id"]
            isOneToOne: false
            referencedRelation: "species"
            referencedColumns: ["id"]
          },
        ]
      }
      breeds: {
        Row: {
          breeding_notes: string
          created_at: string
          egg_color: string
          egg_weight_g: number
          farm_id: string
          health_notes: string
          id: string
          lay_max: number
          lay_min: number
          maturity_weeks: number
          name: string
          notes: string
          origin: string
          purpose: string
          species_id: string
          target_weights: Json
          updated_at: string
        }
        Insert: {
          breeding_notes?: string
          created_at?: string
          egg_color?: string
          egg_weight_g?: number
          farm_id: string
          health_notes?: string
          id?: string
          lay_max?: number
          lay_min?: number
          maturity_weeks?: number
          name: string
          notes?: string
          origin?: string
          purpose?: string
          species_id: string
          target_weights?: Json
          updated_at?: string
        }
        Update: {
          breeding_notes?: string
          created_at?: string
          egg_color?: string
          egg_weight_g?: number
          farm_id?: string
          health_notes?: string
          id?: string
          lay_max?: number
          lay_min?: number
          maturity_weeks?: number
          name?: string
          notes?: string
          origin?: string
          purpose?: string
          species_id?: string
          target_weights?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "breeds_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "breeds_species_id_fkey"
            columns: ["species_id"]
            isOneToOne: false
            referencedRelation: "species"
            referencedColumns: ["id"]
          },
        ]
      }
      diseases: {
        Row: {
          id: string
          name: string
          prevention: string
          signs: string
          species: string[]
        }
        Insert: {
          id: string
          name: string
          prevention?: string
          signs?: string
          species?: string[]
        }
        Update: {
          id?: string
          name?: string
          prevention?: string
          signs?: string
          species?: string[]
        }
        Relationships: []
      }
      eggs: {
        Row: {
          collected: number
          cracked: number
          created_at: string
          date: string
          dirty: number
          farm_id: string
          flock_id: string
          id: string
          live_females: number
          losses: number
          notes: string
          updated_at: string
        }
        Insert: {
          collected?: number
          cracked?: number
          created_at?: string
          date?: string
          dirty?: number
          farm_id: string
          flock_id: string
          id?: string
          live_females?: number
          losses?: number
          notes?: string
          updated_at?: string
        }
        Update: {
          collected?: number
          cracked?: number
          created_at?: string
          date?: string
          dirty?: number
          farm_id?: string
          flock_id?: string
          id?: string
          live_females?: number
          losses?: number
          notes?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "eggs_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "eggs_flock_id_fkey"
            columns: ["flock_id"]
            isOneToOne: false
            referencedRelation: "flocks"
            referencedColumns: ["id"]
          },
        ]
      }
      expenses: {
        Row: {
          amount: number
          category: string
          created_at: string
          date: string
          description: string
          farm_id: string
          flock_id: string | null
          id: string
          method: string
          notes: string
          party: string
          reference: string
          updated_at: string
        }
        Insert: {
          amount: number
          category: string
          created_at?: string
          date?: string
          description?: string
          farm_id: string
          flock_id?: string | null
          id?: string
          method?: string
          notes?: string
          party?: string
          reference?: string
          updated_at?: string
        }
        Update: {
          amount?: number
          category?: string
          created_at?: string
          date?: string
          description?: string
          farm_id?: string
          flock_id?: string | null
          id?: string
          method?: string
          notes?: string
          party?: string
          reference?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "expenses_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_flock_id_fkey"
            columns: ["flock_id"]
            isOneToOne: false
            referencedRelation: "flocks"
            referencedColumns: ["id"]
          },
        ]
      }
      farm_members: {
        Row: {
          created_at: string
          farm_id: string
          id: string
          role: Database["public"]["Enums"]["farm_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          farm_id: string
          id?: string
          role?: Database["public"]["Enums"]["farm_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          farm_id?: string
          id?: string
          role?: Database["public"]["Enums"]["farm_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "farm_members_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
        ]
      }
      farm_settings: {
        Row: {
          created_at: string
          currency: string
          expense_categories: string[]
          farm_id: string
          farm_name: string
          id: string
          income_categories: string[]
          location: string
          low_stock_alerts: boolean
          notify_days: number
          owner_name: string
          phone: string
          theme: string
          updated_at: string
          weight_unit: string
        }
        Insert: {
          created_at?: string
          currency?: string
          expense_categories?: string[]
          farm_id: string
          farm_name?: string
          id?: string
          income_categories?: string[]
          location?: string
          low_stock_alerts?: boolean
          notify_days?: number
          owner_name?: string
          phone?: string
          theme?: string
          updated_at?: string
          weight_unit?: string
        }
        Update: {
          created_at?: string
          currency?: string
          expense_categories?: string[]
          farm_id?: string
          farm_name?: string
          id?: string
          income_categories?: string[]
          location?: string
          low_stock_alerts?: boolean
          notify_days?: number
          owner_name?: string
          phone?: string
          theme?: string
          updated_at?: string
          weight_unit?: string
        }
        Relationships: [
          {
            foreignKeyName: "farm_settings_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: true
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
        ]
      }
      farms: {
        Row: {
          created_at: string
          id: string
          name: string
          owner_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          owner_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          owner_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      feed_items: {
        Row: {
          bag_kg: number
          created_at: string
          expiry: string | null
          farm_id: string
          id: string
          name: string
          notes: string
          price_per_bag: number
          reorder_kg: number
          supplier: string
          unit: string
          updated_at: string
        }
        Insert: {
          bag_kg?: number
          created_at?: string
          expiry?: string | null
          farm_id: string
          id?: string
          name: string
          notes?: string
          price_per_bag?: number
          reorder_kg?: number
          supplier?: string
          unit?: string
          updated_at?: string
        }
        Update: {
          bag_kg?: number
          created_at?: string
          expiry?: string | null
          farm_id?: string
          id?: string
          name?: string
          notes?: string
          price_per_bag?: number
          reorder_kg?: number
          supplier?: string
          unit?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "feed_items_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
        ]
      }
      feed_transactions: {
        Row: {
          cost: number
          created_at: string
          date: string
          farm_id: string
          feed_id: string
          flock_id: string | null
          id: string
          kg: number
          notes: string
          type: string
          updated_at: string
        }
        Insert: {
          cost?: number
          created_at?: string
          date?: string
          farm_id: string
          feed_id: string
          flock_id?: string | null
          id?: string
          kg: number
          notes?: string
          type: string
          updated_at?: string
        }
        Update: {
          cost?: number
          created_at?: string
          date?: string
          farm_id?: string
          feed_id?: string
          flock_id?: string | null
          id?: string
          kg?: number
          notes?: string
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "feed_transactions_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feed_transactions_feed_id_fkey"
            columns: ["feed_id"]
            isOneToOne: false
            referencedRelation: "feed_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feed_transactions_flock_id_fkey"
            columns: ["flock_id"]
            isOneToOne: false
            referencedRelation: "flocks"
            referencedColumns: ["id"]
          },
        ]
      }
      flock_movements: {
        Row: {
          amount: number
          counterpart_flock_id: string | null
          created_at: string
          date: string
          farm_id: string
          flock_id: string
          id: string
          notes: string
          qty: number
          type: string
          updated_at: string
        }
        Insert: {
          amount?: number
          counterpart_flock_id?: string | null
          created_at?: string
          date?: string
          farm_id: string
          flock_id: string
          id?: string
          notes?: string
          qty: number
          type: string
          updated_at?: string
        }
        Update: {
          amount?: number
          counterpart_flock_id?: string | null
          created_at?: string
          date?: string
          farm_id?: string
          flock_id?: string
          id?: string
          notes?: string
          qty?: number
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "flock_movements_counterpart_flock_id_fkey"
            columns: ["counterpart_flock_id"]
            isOneToOne: false
            referencedRelation: "flocks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "flock_movements_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "flock_movements_flock_id_fkey"
            columns: ["flock_id"]
            isOneToOne: false
            referencedRelation: "flocks"
            referencedColumns: ["id"]
          },
        ]
      }
      flocks: {
        Row: {
          breed_id: string | null
          code: string
          created_at: string
          farm_id: string
          id: string
          location_id: string | null
          name: string
          notes: string
          opening_qty: number
          purpose: string
          sex: string
          source: string
          species_id: string
          stage: string
          start_date: string
          status: string
          updated_at: string
        }
        Insert: {
          breed_id?: string | null
          code: string
          created_at?: string
          farm_id: string
          id?: string
          location_id?: string | null
          name: string
          notes?: string
          opening_qty?: number
          purpose?: string
          sex?: string
          source?: string
          species_id: string
          stage?: string
          start_date?: string
          status?: string
          updated_at?: string
        }
        Update: {
          breed_id?: string | null
          code?: string
          created_at?: string
          farm_id?: string
          id?: string
          location_id?: string | null
          name?: string
          notes?: string
          opening_qty?: number
          purpose?: string
          sex?: string
          source?: string
          species_id?: string
          stage?: string
          start_date?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "flocks_breed_id_fkey"
            columns: ["breed_id"]
            isOneToOne: false
            referencedRelation: "breeds"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "flocks_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "flocks_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "flocks_species_id_fkey"
            columns: ["species_id"]
            isOneToOne: false
            referencedRelation: "species"
            referencedColumns: ["id"]
          },
        ]
      }
      hatch_batches: {
        Row: {
          created_at: string
          eggs_set: number
          farm_id: string
          fertile: number
          group_id: string | null
          hatch_date: string | null
          hatched: number
          id: string
          notes: string
          offspring_flock_id: string | null
          set_date: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          eggs_set?: number
          farm_id: string
          fertile?: number
          group_id?: string | null
          hatch_date?: string | null
          hatched?: number
          id?: string
          notes?: string
          offspring_flock_id?: string | null
          set_date?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          eggs_set?: number
          farm_id?: string
          fertile?: number
          group_id?: string | null
          hatch_date?: string | null
          hatched?: number
          id?: string
          notes?: string
          offspring_flock_id?: string | null
          set_date?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "hatch_batches_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hatch_batches_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "breeding_groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hatch_batches_offspring_flock_id_fkey"
            columns: ["offspring_flock_id"]
            isOneToOne: false
            referencedRelation: "flocks"
            referencedColumns: ["id"]
          },
        ]
      }
      health_events: {
        Row: {
          affected: number
          confirmed: boolean
          created_at: string
          date: string
          deaths: number
          disease: string
          farm_id: string
          flock_id: string
          id: string
          notes: string
          outcome: string
          recovered: number
          severity: string
          symptoms: string
          updated_at: string
        }
        Insert: {
          affected?: number
          confirmed?: boolean
          created_at?: string
          date?: string
          deaths?: number
          disease?: string
          farm_id: string
          flock_id: string
          id?: string
          notes?: string
          outcome?: string
          recovered?: number
          severity?: string
          symptoms?: string
          updated_at?: string
        }
        Update: {
          affected?: number
          confirmed?: boolean
          created_at?: string
          date?: string
          deaths?: number
          disease?: string
          farm_id?: string
          flock_id?: string
          id?: string
          notes?: string
          outcome?: string
          recovered?: number
          severity?: string
          symptoms?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "health_events_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "health_events_flock_id_fkey"
            columns: ["flock_id"]
            isOneToOne: false
            referencedRelation: "flocks"
            referencedColumns: ["id"]
          },
        ]
      }
      income: {
        Row: {
          amount: number
          category: string
          created_at: string
          date: string
          description: string
          farm_id: string
          flock_id: string | null
          id: string
          method: string
          notes: string
          party: string
          reference: string
          updated_at: string
        }
        Insert: {
          amount: number
          category: string
          created_at?: string
          date?: string
          description?: string
          farm_id: string
          flock_id?: string | null
          id?: string
          method?: string
          notes?: string
          party?: string
          reference?: string
          updated_at?: string
        }
        Update: {
          amount?: number
          category?: string
          created_at?: string
          date?: string
          description?: string
          farm_id?: string
          flock_id?: string | null
          id?: string
          method?: string
          notes?: string
          party?: string
          reference?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "income_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "income_flock_id_fkey"
            columns: ["flock_id"]
            isOneToOne: false
            referencedRelation: "flocks"
            referencedColumns: ["id"]
          },
        ]
      }
      inventory_adjustments: {
        Row: {
          created_at: string
          date: string
          farm_id: string
          feed_id: string
          id: string
          kg: number
          reason: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          date?: string
          farm_id: string
          feed_id: string
          id?: string
          kg: number
          reason?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          date?: string
          farm_id?: string
          feed_id?: string
          id?: string
          kg?: number
          reason?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "inventory_adjustments_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_adjustments_feed_id_fkey"
            columns: ["feed_id"]
            isOneToOne: false
            referencedRelation: "feed_items"
            referencedColumns: ["id"]
          },
        ]
      }
      locations: {
        Row: {
          capacity: number
          created_at: string
          farm_id: string
          id: string
          kind: string
          name: string
          notes: string
          updated_at: string
        }
        Insert: {
          capacity?: number
          created_at?: string
          farm_id: string
          id?: string
          kind?: string
          name: string
          notes?: string
          updated_at?: string
        }
        Update: {
          capacity?: number
          created_at?: string
          farm_id?: string
          id?: string
          kind?: string
          name?: string
          notes?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "locations_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
        ]
      }
      medications: {
        Row: {
          created_at: string
          farm_id: string
          id: string
          kind: string
          name: string
          notes: string
          unit: string
          updated_at: string
          withdrawal_days: number
        }
        Insert: {
          created_at?: string
          farm_id: string
          id?: string
          kind?: string
          name: string
          notes?: string
          unit?: string
          updated_at?: string
          withdrawal_days?: number
        }
        Update: {
          created_at?: string
          farm_id?: string
          id?: string
          kind?: string
          name?: string
          notes?: string
          unit?: string
          updated_at?: string
          withdrawal_days?: number
        }
        Relationships: [
          {
            foreignKeyName: "medications_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      reminders: {
        Row: {
          created_at: string
          done: boolean
          due_date: string
          farm_id: string
          id: string
          notes: string
          related_id: string | null
          title: string
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          done?: boolean
          due_date?: string
          farm_id: string
          id?: string
          notes?: string
          related_id?: string | null
          title: string
          type?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          done?: boolean
          due_date?: string
          farm_id?: string
          id?: string
          notes?: string
          related_id?: string | null
          title?: string
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reminders_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
        ]
      }
      species: {
        Row: {
          emoji: string
          id: string
          name: string
          sort: number
        }
        Insert: {
          emoji?: string
          id: string
          name: string
          sort?: number
        }
        Update: {
          emoji?: string
          id?: string
          name?: string
          sort?: number
        }
        Relationships: []
      }
      treatments: {
        Row: {
          cost: number
          created_at: string
          dose: string
          end_date: string | null
          farm_id: string
          flock_id: string
          frequency: string
          health_event_id: string | null
          id: string
          medicine: string
          notes: string
          outcome: string
          provider: string
          route: string
          start_date: string
          updated_at: string
          withdrawal_days: number
        }
        Insert: {
          cost?: number
          created_at?: string
          dose?: string
          end_date?: string | null
          farm_id: string
          flock_id: string
          frequency?: string
          health_event_id?: string | null
          id?: string
          medicine: string
          notes?: string
          outcome?: string
          provider?: string
          route?: string
          start_date?: string
          updated_at?: string
          withdrawal_days?: number
        }
        Update: {
          cost?: number
          created_at?: string
          dose?: string
          end_date?: string | null
          farm_id?: string
          flock_id?: string
          frequency?: string
          health_event_id?: string | null
          id?: string
          medicine?: string
          notes?: string
          outcome?: string
          provider?: string
          route?: string
          start_date?: string
          updated_at?: string
          withdrawal_days?: number
        }
        Relationships: [
          {
            foreignKeyName: "treatments_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "treatments_flock_id_fkey"
            columns: ["flock_id"]
            isOneToOne: false
            referencedRelation: "flocks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "treatments_health_event_id_fkey"
            columns: ["health_event_id"]
            isOneToOne: false
            referencedRelation: "health_events"
            referencedColumns: ["id"]
          },
        ]
      }
      vaccination_records: {
        Row: {
          administered_date: string
          administrator: string
          batch: string
          created_at: string
          disease: string
          dose: string
          expiry: string | null
          farm_id: string
          flock_id: string
          id: string
          next_due: string | null
          notes: string
          route: string
          schedule_id: string | null
          updated_at: string
          vaccine: string
        }
        Insert: {
          administered_date?: string
          administrator?: string
          batch?: string
          created_at?: string
          disease?: string
          dose?: string
          expiry?: string | null
          farm_id: string
          flock_id: string
          id?: string
          next_due?: string | null
          notes?: string
          route?: string
          schedule_id?: string | null
          updated_at?: string
          vaccine: string
        }
        Update: {
          administered_date?: string
          administrator?: string
          batch?: string
          created_at?: string
          disease?: string
          dose?: string
          expiry?: string | null
          farm_id?: string
          flock_id?: string
          id?: string
          next_due?: string | null
          notes?: string
          route?: string
          schedule_id?: string | null
          updated_at?: string
          vaccine?: string
        }
        Relationships: [
          {
            foreignKeyName: "vaccination_records_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vaccination_records_flock_id_fkey"
            columns: ["flock_id"]
            isOneToOne: false
            referencedRelation: "flocks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vaccination_records_schedule_id_fkey"
            columns: ["schedule_id"]
            isOneToOne: false
            referencedRelation: "vaccination_schedules"
            referencedColumns: ["id"]
          },
        ]
      }
      vaccination_schedules: {
        Row: {
          created_at: string
          disease: string
          dose: string
          farm_id: string
          flock_id: string
          id: string
          notes: string
          planned_date: string
          route: string
          status: string
          updated_at: string
          vaccine: string
          vaccine_id: string | null
        }
        Insert: {
          created_at?: string
          disease?: string
          dose?: string
          farm_id: string
          flock_id: string
          id?: string
          notes?: string
          planned_date: string
          route?: string
          status?: string
          updated_at?: string
          vaccine: string
          vaccine_id?: string | null
        }
        Update: {
          created_at?: string
          disease?: string
          dose?: string
          farm_id?: string
          flock_id?: string
          id?: string
          notes?: string
          planned_date?: string
          route?: string
          status?: string
          updated_at?: string
          vaccine?: string
          vaccine_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vaccination_schedules_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vaccination_schedules_flock_id_fkey"
            columns: ["flock_id"]
            isOneToOne: false
            referencedRelation: "flocks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vaccination_schedules_vaccine_id_fkey"
            columns: ["vaccine_id"]
            isOneToOne: false
            referencedRelation: "vaccines"
            referencedColumns: ["id"]
          },
        ]
      }
      vaccines: {
        Row: {
          created_at: string
          disease: string
          dose: string
          farm_id: string
          id: string
          name: string
          notes: string
          route: string
          species: string[]
          updated_at: string
        }
        Insert: {
          created_at?: string
          disease?: string
          dose?: string
          farm_id: string
          id?: string
          name: string
          notes?: string
          route?: string
          species?: string[]
          updated_at?: string
        }
        Update: {
          created_at?: string
          disease?: string
          dose?: string
          farm_id?: string
          id?: string
          name?: string
          notes?: string
          route?: string
          species?: string[]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "vaccines_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
        ]
      }
      weights: {
        Row: {
          age_weeks: number
          avg_g: number
          created_at: string
          date: string
          farm_id: string
          flock_id: string
          id: string
          max_g: number | null
          min_g: number | null
          notes: string
          sample_count: number
          updated_at: string
        }
        Insert: {
          age_weeks?: number
          avg_g: number
          created_at?: string
          date?: string
          farm_id: string
          flock_id: string
          id?: string
          max_g?: number | null
          min_g?: number | null
          notes?: string
          sample_count?: number
          updated_at?: string
        }
        Update: {
          age_weeks?: number
          avg_g?: number
          created_at?: string
          date?: string
          farm_id?: string
          flock_id?: string
          id?: string
          max_g?: number | null
          min_g?: number | null
          notes?: string
          sample_count?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "weights_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "weights_flock_id_fkey"
            columns: ["flock_id"]
            isOneToOne: false
            referencedRelation: "flocks"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_farm: { Args: { _name: string }; Returns: string }
      has_farm_role: {
        Args: {
          _farm: string
          _roles: Database["public"]["Enums"]["farm_role"][]
        }
        Returns: boolean
      }
      is_farm_member: { Args: { _farm: string }; Returns: boolean }
    }
    Enums: {
      farm_role: "owner" | "admin" | "staff"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      farm_role: ["owner", "admin", "staff"],
    },
  },
} as const
