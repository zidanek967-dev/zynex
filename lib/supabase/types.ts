// Generated from the live schema via Supabase MCP (`generate_typescript_types`).
// Regenerate whenever a migration changes the schema — do not hand-edit.

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      admin_users: {
        Row: {
          email: string;
        };
        Insert: {
          email: string;
        };
        Update: {
          email?: string;
        };
        Relationships: [];
      };
      blog_posts: {
        Row: {
          author_name: string;
          category: string;
          content: string;
          cover_image_url: string | null;
          created_at: string;
          excerpt: string;
          id: string;
          og_image_url: string | null;
          published: boolean;
          published_at: string;
          reading_time_minutes: number;
          slug: string;
          title: string;
          updated_at: string;
        };
        Insert: {
          author_name?: string;
          category?: string;
          content: string;
          cover_image_url?: string | null;
          created_at?: string;
          excerpt: string;
          id?: string;
          og_image_url?: string | null;
          published?: boolean;
          published_at?: string;
          reading_time_minutes?: number;
          slug: string;
          title: string;
          updated_at?: string;
        };
        Update: {
          author_name?: string;
          category?: string;
          content?: string;
          cover_image_url?: string | null;
          created_at?: string;
          excerpt?: string;
          id?: string;
          og_image_url?: string | null;
          published?: boolean;
          published_at?: string;
          reading_time_minutes?: number;
          slug?: string;
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      case_studies: {
        Row: {
          client_name: string | null;
          cover_image_url: string | null;
          created_at: string;
          gallery_image_urls: string[];
          id: string;
          industry: string | null;
          problem: string;
          published: boolean;
          results: string;
          slug: string;
          solution: string;
          sort_order: number;
          stack: string[];
          summary: string;
          title: string;
          updated_at: string;
        };
        Insert: {
          client_name?: string | null;
          cover_image_url?: string | null;
          created_at?: string;
          gallery_image_urls?: string[];
          id?: string;
          industry?: string | null;
          problem: string;
          published?: boolean;
          results: string;
          slug: string;
          solution: string;
          sort_order?: number;
          stack?: string[];
          summary: string;
          title: string;
          updated_at?: string;
        };
        Update: {
          client_name?: string | null;
          cover_image_url?: string | null;
          created_at?: string;
          gallery_image_urls?: string[];
          id?: string;
          industry?: string | null;
          problem?: string;
          published?: boolean;
          results?: string;
          slug?: string;
          solution?: string;
          sort_order?: number;
          stack?: string[];
          summary?: string;
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      chat_messages: {
        Row: {
          content: string;
          created_at: string;
          id: string;
          role: string;
          session_id: string;
        };
        Insert: {
          content: string;
          created_at?: string;
          id?: string;
          role: string;
          session_id: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          id?: string;
          role?: string;
          session_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "chat_messages_session_id_fkey";
            columns: ["session_id"];
            isOneToOne: false;
            referencedRelation: "chat_sessions";
            referencedColumns: ["id"];
          },
        ];
      };
      chat_sessions: {
        Row: {
          created_at: string;
          id: string;
          lead_id: string | null;
          metadata: Json;
          visitor_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          lead_id?: string | null;
          metadata?: Json;
          visitor_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          lead_id?: string | null;
          metadata?: Json;
          visitor_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "chat_sessions_lead_id_fkey";
            columns: ["lead_id"];
            isOneToOne: false;
            referencedRelation: "leads";
            referencedColumns: ["id"];
          },
        ];
      };
      leads: {
        Row: {
          budget_range: string;
          company: string | null;
          created_at: string;
          email: string;
          features: string[];
          id: string;
          message: string | null;
          name: string;
          notes: string | null;
          phone: string | null;
          project_type: string;
          status: string;
          timeline: string;
          updated_at: string;
        };
        Insert: {
          budget_range: string;
          company?: string | null;
          created_at?: string;
          email: string;
          features?: string[];
          id?: string;
          message?: string | null;
          name: string;
          notes?: string | null;
          phone?: string | null;
          project_type: string;
          status?: string;
          timeline: string;
          updated_at?: string;
        };
        Update: {
          budget_range?: string;
          company?: string | null;
          created_at?: string;
          email?: string;
          features?: string[];
          id?: string;
          message?: string | null;
          name?: string;
          notes?: string | null;
          phone?: string | null;
          project_type?: string;
          status?: string;
          timeline?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      is_admin: { Args: never; Returns: boolean };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;
type DefaultSchema = DatabaseWithoutInternals["public"];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;
