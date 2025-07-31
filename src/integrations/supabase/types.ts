export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      climate_alerts: {
        Row: {
          affected_regions: string[] | null
          alert_type: Database["public"]["Enums"]["alert_type"]
          coordinates: Json | null
          created_at: string | null
          created_by: string | null
          description: string | null
          expires_at: string | null
          id: string
          resolved_at: string | null
          sensor_data: Json | null
          severity: Database["public"]["Enums"]["alert_severity"]
          status: Database["public"]["Enums"]["alert_status"] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          affected_regions?: string[] | null
          alert_type: Database["public"]["Enums"]["alert_type"]
          coordinates?: Json | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          expires_at?: string | null
          id?: string
          resolved_at?: string | null
          sensor_data?: Json | null
          severity: Database["public"]["Enums"]["alert_severity"]
          status?: Database["public"]["Enums"]["alert_status"] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          affected_regions?: string[] | null
          alert_type?: Database["public"]["Enums"]["alert_type"]
          coordinates?: Json | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          expires_at?: string | null
          id?: string
          resolved_at?: string | null
          sensor_data?: Json | null
          severity?: Database["public"]["Enums"]["alert_severity"]
          status?: Database["public"]["Enums"]["alert_status"] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "climate_alerts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      community_reports: {
        Row: {
          audio_url: string | null
          category: string
          coordinates: Json | null
          created_at: string | null
          description: string | null
          id: string
          location: string | null
          media_urls: string[] | null
          priority: number | null
          review_notes: string | null
          reviewed_by: string | null
          status: Database["public"]["Enums"]["report_status"] | null
          submitted_by: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          audio_url?: string | null
          category: string
          coordinates?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          location?: string | null
          media_urls?: string[] | null
          priority?: number | null
          review_notes?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["report_status"] | null
          submitted_by?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          audio_url?: string | null
          category?: string
          coordinates?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          location?: string | null
          media_urls?: string[] | null
          priority?: number | null
          review_notes?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["report_status"] | null
          submitted_by?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "community_reports_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_reports_submitted_by_fkey"
            columns: ["submitted_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      eco_projects: {
        Row: {
          coordinates: Json | null
          created_at: string | null
          current_metrics: Json | null
          description: string | null
          end_date: string | null
          funding_goal: number | null
          funding_raised: number | null
          green_credits_allocated: number | null
          green_credits_distributed: number | null
          id: string
          location: string | null
          managed_by: string | null
          name: string
          participants: string[] | null
          project_type: string
          start_date: string | null
          status: Database["public"]["Enums"]["project_status"] | null
          target_metrics: Json | null
          updated_at: string | null
        }
        Insert: {
          coordinates?: Json | null
          created_at?: string | null
          current_metrics?: Json | null
          description?: string | null
          end_date?: string | null
          funding_goal?: number | null
          funding_raised?: number | null
          green_credits_allocated?: number | null
          green_credits_distributed?: number | null
          id?: string
          location?: string | null
          managed_by?: string | null
          name: string
          participants?: string[] | null
          project_type: string
          start_date?: string | null
          status?: Database["public"]["Enums"]["project_status"] | null
          target_metrics?: Json | null
          updated_at?: string | null
        }
        Update: {
          coordinates?: Json | null
          created_at?: string | null
          current_metrics?: Json | null
          description?: string | null
          end_date?: string | null
          funding_goal?: number | null
          funding_raised?: number | null
          green_credits_allocated?: number | null
          green_credits_distributed?: number | null
          id?: string
          location?: string | null
          managed_by?: string | null
          name?: string
          participants?: string[] | null
          project_type?: string
          start_date?: string | null
          status?: Database["public"]["Enums"]["project_status"] | null
          target_metrics?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "eco_projects_managed_by_fkey"
            columns: ["managed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      funding: {
        Row: {
          amount: number
          created_at: string | null
          currency: string | null
          donor_email: string | null
          donor_name: string | null
          id: string
          is_anonymous: boolean | null
          payment_method: string | null
          payment_reference: string | null
          project_id: string | null
          purpose: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          currency?: string | null
          donor_email?: string | null
          donor_name?: string | null
          id?: string
          is_anonymous?: boolean | null
          payment_method?: string | null
          payment_reference?: string | null
          project_id?: string | null
          purpose?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          currency?: string | null
          donor_email?: string | null
          donor_name?: string | null
          id?: string
          is_anonymous?: boolean | null
          payment_method?: string | null
          payment_reference?: string | null
          project_id?: string | null
          purpose?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "funding_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "eco_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      green_credits: {
        Row: {
          activity_description: string | null
          activity_type: string
          created_at: string | null
          credits_earned: number
          id: string
          payout_amount: number | null
          payout_method: string | null
          payout_reference: string | null
          payout_status: string | null
          project_id: string | null
          updated_at: string | null
          user_id: string
          verification_status: string | null
          verified_by: string | null
        }
        Insert: {
          activity_description?: string | null
          activity_type: string
          created_at?: string | null
          credits_earned: number
          id?: string
          payout_amount?: number | null
          payout_method?: string | null
          payout_reference?: string | null
          payout_status?: string | null
          project_id?: string | null
          updated_at?: string | null
          user_id: string
          verification_status?: string | null
          verified_by?: string | null
        }
        Update: {
          activity_description?: string | null
          activity_type?: string
          created_at?: string | null
          credits_earned?: number
          id?: string
          payout_amount?: number | null
          payout_method?: string | null
          payout_reference?: string | null
          payout_status?: string | null
          project_id?: string | null
          updated_at?: string | null
          user_id?: string
          verification_status?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "green_credits_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "eco_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "green_credits_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "green_credits_verified_by_fkey"
            columns: ["verified_by"]
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
          email: string
          full_name: string | null
          id: string
          is_active: boolean | null
          location: string | null
          organization: string | null
          phone: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          full_name?: string | null
          id: string
          is_active?: boolean | null
          location?: string | null
          organization?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          location?: string | null
          organization?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      system_settings: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          setting_key: string
          setting_value: Json
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          setting_key: string
          setting_value: Json
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          setting_key?: string
          setting_value?: Json
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "system_settings_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
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
      alert_severity: "low" | "moderate" | "high" | "critical"
      alert_status: "active" | "resolved" | "cancelled"
      alert_type: "flood" | "drought" | "storm" | "wildfire"
      project_status: "planning" | "active" | "completed" | "suspended"
      report_status: "pending" | "approved" | "rejected" | "flagged"
      user_role: "admin" | "analyst" | "community_leader" | "community_member"
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
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
      alert_severity: ["low", "moderate", "high", "critical"],
      alert_status: ["active", "resolved", "cancelled"],
      alert_type: ["flood", "drought", "storm", "wildfire"],
      project_status: ["planning", "active", "completed", "suspended"],
      report_status: ["pending", "approved", "rejected", "flagged"],
      user_role: ["admin", "analyst", "community_leader", "community_member"],
    },
  },
} as const
