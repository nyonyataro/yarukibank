export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      check_ins: {
        Row: {
          checked_at: string | null
          created_at: string | null
          evidence_data: Json | null
          evidence_type: string | null
          goal_id: string
          id: string
          notes: string | null
          status: string | null
          user_id: string
        }
        Insert: {
          checked_at?: string | null
          created_at?: string | null
          evidence_data?: Json | null
          evidence_type?: string | null
          goal_id: string
          id?: string
          notes?: string | null
          status?: string | null
          user_id: string
        }
        Update: {
          checked_at?: string | null
          created_at?: string | null
          evidence_data?: Json | null
          evidence_type?: string | null
          goal_id?: string
          id?: string
          notes?: string | null
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "check_ins_goal_id_fkey"
            columns: ["goal_id"]
            isOneToOne: false
            referencedRelation: "goals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "check_ins_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      goals: {
        Row: {
          category: string
          check_in_frequency: string
          created_at: string | null
          description: string | null
          end_date: string
          id: string
          penalty_amount: number
          start_date: string
          status: string | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          category: string
          check_in_frequency: string
          created_at?: string | null
          description?: string | null
          end_date: string
          id?: string
          penalty_amount: number
          start_date: string
          status?: string | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          category?: string
          check_in_frequency?: string
          created_at?: string | null
          description?: string | null
          end_date?: string
          id?: string
          penalty_amount?: number
          start_date?: string
          status?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "goals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_settings: {
        Row: {
          created_at: string | null
          email_achievements: boolean | null
          email_failures: boolean | null
          email_reminders: boolean | null
          id: string
          reminder_frequency: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          email_achievements?: boolean | null
          email_failures?: boolean | null
          email_reminders?: boolean | null
          id?: string
          reminder_frequency?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          email_achievements?: boolean | null
          email_failures?: boolean | null
          email_reminders?: boolean | null
          id?: string
          reminder_frequency?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notification_settings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      penalty_payments: {
        Row: {
          amount: number
          created_at: string | null
          donation_target: string | null
          goal_id: string
          id: string
          payment_method: string | null
          payment_status: string | null
          processed_at: string | null
          stripe_payment_intent_id: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          donation_target?: string | null
          goal_id: string
          id?: string
          payment_method?: string | null
          payment_status?: string | null
          processed_at?: string | null
          stripe_payment_intent_id?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          donation_target?: string | null
          goal_id?: string
          id?: string
          payment_method?: string | null
          payment_status?: string | null
          processed_at?: string | null
          stripe_payment_intent_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "penalty_payments_goal_id_fkey"
            columns: ["goal_id"]
            isOneToOne: false
            referencedRelation: "goals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "penalty_payments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          id: string
          nickname: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          id: string
          nickname?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          id?: string
          nickname?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      referees: {
        Row: {
          created_at: string | null
          goal_id: string
          id: string
          invited_at: string | null
          referee_email: string
          responded_at: string | null
          status: string | null
        }
        Insert: {
          created_at?: string | null
          goal_id: string
          id?: string
          invited_at?: string | null
          referee_email: string
          responded_at?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string | null
          goal_id?: string
          id?: string
          invited_at?: string | null
          referee_email?: string
          responded_at?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "referees_goal_id_fkey"
            columns: ["goal_id"]
            isOneToOne: false
            referencedRelation: "goals"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Convenience types
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Goal = Database['public']['Tables']['goals']['Row']
export type CheckIn = Database['public']['Tables']['check_ins']['Row']
export type Referee = Database['public']['Tables']['referees']['Row']
export type PenaltyPayment = Database['public']['Tables']['penalty_payments']['Row']
export type NotificationSettings = Database['public']['Tables']['notification_settings']['Row']

// Insert types
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert']
export type GoalInsert = Database['public']['Tables']['goals']['Insert']
export type CheckInInsert = Database['public']['Tables']['check_ins']['Insert']
export type RefereeInsert = Database['public']['Tables']['referees']['Insert']
export type PenaltyPaymentInsert = Database['public']['Tables']['penalty_payments']['Insert']
export type NotificationSettingsInsert = Database['public']['Tables']['notification_settings']['Insert']

// Update types
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update']
export type GoalUpdate = Database['public']['Tables']['goals']['Update']
export type CheckInUpdate = Database['public']['Tables']['check_ins']['Update']
export type RefereeUpdate = Database['public']['Tables']['referees']['Update']
export type PenaltyPaymentUpdate = Database['public']['Tables']['penalty_payments']['Update']
export type NotificationSettingsUpdate = Database['public']['Tables']['notification_settings']['Update']