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
      connection_logs: {
        Row: {
          action: string
          created_at: string
          error_message: string | null
          id: string
          ip_address: unknown | null
          metadata: Json | null
          platform: string
          social_account_id: string | null
          status: string
          user_agent: string | null
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string
          error_message?: string | null
          id?: string
          ip_address?: unknown | null
          metadata?: Json | null
          platform: string
          social_account_id?: string | null
          status: string
          user_agent?: string | null
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string
          error_message?: string | null
          id?: string
          ip_address?: unknown | null
          metadata?: Json | null
          platform?: string
          social_account_id?: string | null
          status?: string
          user_agent?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "connection_logs_social_account_id_fkey"
            columns: ["social_account_id"]
            isOneToOne: false
            referencedRelation: "social_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          company: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          is_active: boolean | null
          phone: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          company?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          is_active?: boolean | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          company?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      scheduled_posts: {
        Row: {
          content: string
          created_at: string
          engagement_data: Json | null
          error_message: string | null
          hashtags: string[] | null
          id: string
          media_urls: string[] | null
          platform: string
          post_id: string | null
          retry_count: number | null
          scheduled_for: string
          social_account_id: string
          status: Database["public"]["Enums"]["post_status"] | null
          title: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          engagement_data?: Json | null
          error_message?: string | null
          hashtags?: string[] | null
          id?: string
          media_urls?: string[] | null
          platform: string
          post_id?: string | null
          retry_count?: number | null
          scheduled_for: string
          social_account_id: string
          status?: Database["public"]["Enums"]["post_status"] | null
          title?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          engagement_data?: Json | null
          error_message?: string | null
          hashtags?: string[] | null
          id?: string
          media_urls?: string[] | null
          platform?: string
          post_id?: string | null
          retry_count?: number | null
          scheduled_for?: string
          social_account_id?: string
          status?: Database["public"]["Enums"]["post_status"] | null
          title?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "scheduled_posts_social_account_id_fkey"
            columns: ["social_account_id"]
            isOneToOne: false
            referencedRelation: "social_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      social_accounts: {
        Row: {
          access_token: string | null
          account_id: string | null
          created_at: string
          followers_count: number | null
          following_count: number | null
          id: string
          is_active: boolean | null
          is_warming_enabled: boolean | null
          last_sync_at: string | null
          platform: string
          posts_count: number | null
          profile_picture_url: string | null
          refresh_token: string | null
          token_expires_at: string | null
          updated_at: string
          user_id: string
          username: string
        }
        Insert: {
          access_token?: string | null
          account_id?: string | null
          created_at?: string
          followers_count?: number | null
          following_count?: number | null
          id?: string
          is_active?: boolean | null
          is_warming_enabled?: boolean | null
          last_sync_at?: string | null
          platform: string
          posts_count?: number | null
          profile_picture_url?: string | null
          refresh_token?: string | null
          token_expires_at?: string | null
          updated_at?: string
          user_id: string
          username: string
        }
        Update: {
          access_token?: string | null
          account_id?: string | null
          created_at?: string
          followers_count?: number | null
          following_count?: number | null
          id?: string
          is_active?: boolean | null
          is_warming_enabled?: boolean | null
          last_sync_at?: string | null
          platform?: string
          posts_count?: number | null
          profile_picture_url?: string | null
          refresh_token?: string | null
          token_expires_at?: string | null
          updated_at?: string
          user_id?: string
          username?: string
        }
        Relationships: []
      }
      subscription_history: {
        Row: {
          action: string
          created_at: string
          id: string
          plan_id: string
          previous_plan_id: string | null
          subscription_id: string
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string
          id?: string
          plan_id: string
          previous_plan_id?: string | null
          subscription_id: string
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string
          id?: string
          plan_id?: string
          previous_plan_id?: string | null
          subscription_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscription_history_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscription_history_previous_plan_id_fkey"
            columns: ["previous_plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscription_history_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "user_subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription_plans: {
        Row: {
          advanced_analytics: boolean | null
          api_access: boolean | null
          automations_limit: number | null
          basic_analytics: boolean | null
          basic_support: boolean | null
          billing_period: string
          created_at: string
          currency: string
          custom_dashboard: boolean | null
          dedicated_manager: boolean | null
          id: string
          is_active: boolean | null
          is_popular: boolean | null
          max_accounts: number
          max_interactions_per_period: number
          max_posts_per_month: number | null
          name: string
          original_price: number | null
          price: number
          priority_support: boolean | null
          reports_type: string | null
          sort_order: number | null
          strategic_consulting: boolean | null
          type: Database["public"]["Enums"]["plan_type"]
          updated_at: string
          vip_support: boolean | null
          white_label: boolean | null
        }
        Insert: {
          advanced_analytics?: boolean | null
          api_access?: boolean | null
          automations_limit?: number | null
          basic_analytics?: boolean | null
          basic_support?: boolean | null
          billing_period: string
          created_at?: string
          currency?: string
          custom_dashboard?: boolean | null
          dedicated_manager?: boolean | null
          id?: string
          is_active?: boolean | null
          is_popular?: boolean | null
          max_accounts: number
          max_interactions_per_period: number
          max_posts_per_month?: number | null
          name: string
          original_price?: number | null
          price: number
          priority_support?: boolean | null
          reports_type?: string | null
          sort_order?: number | null
          strategic_consulting?: boolean | null
          type: Database["public"]["Enums"]["plan_type"]
          updated_at?: string
          vip_support?: boolean | null
          white_label?: boolean | null
        }
        Update: {
          advanced_analytics?: boolean | null
          api_access?: boolean | null
          automations_limit?: number | null
          basic_analytics?: boolean | null
          basic_support?: boolean | null
          billing_period?: string
          created_at?: string
          currency?: string
          custom_dashboard?: boolean | null
          dedicated_manager?: boolean | null
          id?: string
          is_active?: boolean | null
          is_popular?: boolean | null
          max_accounts?: number
          max_interactions_per_period?: number
          max_posts_per_month?: number | null
          name?: string
          original_price?: number | null
          price?: number
          priority_support?: boolean | null
          reports_type?: string | null
          sort_order?: number | null
          strategic_consulting?: boolean | null
          type?: Database["public"]["Enums"]["plan_type"]
          updated_at?: string
          vip_support?: boolean | null
          white_label?: boolean | null
        }
        Relationships: []
      }
      user_subscriptions: {
        Row: {
          created_at: string
          current_accounts_used: number | null
          current_automations_used: number | null
          current_interactions_used: number | null
          current_period_end: string
          current_period_start: string
          current_posts_used: number | null
          id: string
          payment_provider: string | null
          plan_id: string
          status: Database["public"]["Enums"]["subscription_status"]
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          trial_end: string | null
          trial_start: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_accounts_used?: number | null
          current_automations_used?: number | null
          current_interactions_used?: number | null
          current_period_end: string
          current_period_start: string
          current_posts_used?: number | null
          id?: string
          payment_provider?: string | null
          plan_id: string
          status?: Database["public"]["Enums"]["subscription_status"]
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          trial_end?: string | null
          trial_start?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_accounts_used?: number | null
          current_automations_used?: number | null
          current_interactions_used?: number | null
          current_period_end?: string
          current_period_start?: string
          current_posts_used?: number | null
          id?: string
          payment_provider?: string | null
          plan_id?: string
          status?: Database["public"]["Enums"]["subscription_status"]
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          trial_end?: string | null
          trial_start?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      warming_campaigns: {
        Row: {
          created_at: string
          current_amount: number | null
          daily_limit: number | null
          description: string | null
          end_date: string | null
          id: string
          is_active: boolean | null
          name: string
          settings: Json | null
          social_account_id: string
          start_date: string
          status: Database["public"]["Enums"]["warming_status"] | null
          target_amount: number
          updated_at: string
          user_id: string
          warming_type: Database["public"]["Enums"]["warming_type"]
        }
        Insert: {
          created_at?: string
          current_amount?: number | null
          daily_limit?: number | null
          description?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          settings?: Json | null
          social_account_id: string
          start_date: string
          status?: Database["public"]["Enums"]["warming_status"] | null
          target_amount: number
          updated_at?: string
          user_id: string
          warming_type: Database["public"]["Enums"]["warming_type"]
        }
        Update: {
          created_at?: string
          current_amount?: number | null
          daily_limit?: number | null
          description?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          settings?: Json | null
          social_account_id?: string
          start_date?: string
          status?: Database["public"]["Enums"]["warming_status"] | null
          target_amount?: number
          updated_at?: string
          user_id?: string
          warming_type?: Database["public"]["Enums"]["warming_type"]
        }
        Relationships: [
          {
            foreignKeyName: "warming_campaigns_social_account_id_fkey"
            columns: ["social_account_id"]
            isOneToOne: false
            referencedRelation: "social_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      warming_logs: {
        Row: {
          action: string
          amount: number | null
          error_message: string | null
          executed_at: string
          id: string
          success: boolean | null
          target_post_id: string | null
          user_id: string
          warming_campaign_id: string
        }
        Insert: {
          action: string
          amount?: number | null
          error_message?: string | null
          executed_at?: string
          id?: string
          success?: boolean | null
          target_post_id?: string | null
          user_id: string
          warming_campaign_id: string
        }
        Update: {
          action?: string
          amount?: number | null
          error_message?: string | null
          executed_at?: string
          id?: string
          success?: boolean | null
          target_post_id?: string | null
          user_id?: string
          warming_campaign_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "warming_logs_warming_campaign_id_fkey"
            columns: ["warming_campaign_id"]
            isOneToOne: false
            referencedRelation: "warming_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_current_plan: {
        Args: { user_id: string }
        Returns: {
          plan_name: string
          plan_type: Database["public"]["Enums"]["plan_type"]
          subscription_status: Database["public"]["Enums"]["subscription_status"]
        }[]
      }
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["user_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      plan_type: "quinzenal" | "mensal" | "trimestral" | "anual"
      post_status: "draft" | "scheduled" | "published" | "failed" | "cancelled"
      subscription_status:
        | "active"
        | "inactive"
        | "canceled"
        | "past_due"
        | "trialing"
      user_role: "admin" | "agency" | "user" | "moderator"
      warming_status: "active" | "paused" | "completed" | "failed"
      warming_type: "likes" | "comments" | "views" | "followers" | "shares"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      plan_type: ["quinzenal", "mensal", "trimestral", "anual"],
      post_status: ["draft", "scheduled", "published", "failed", "cancelled"],
      subscription_status: [
        "active",
        "inactive",
        "canceled",
        "past_due",
        "trialing",
      ],
      user_role: ["admin", "agency", "user", "moderator"],
      warming_status: ["active", "paused", "completed", "failed"],
      warming_type: ["likes", "comments", "views", "followers", "shares"],
    },
  },
} as const
