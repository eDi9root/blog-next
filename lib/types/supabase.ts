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
      blog: {
        Row: {
          created_at: string
          descript: string
          id: string
          img_url: string
          is_comment: boolean
          is_public: boolean
          tags: string | null
          title: string
          combined_search_column: string | null
        }
        Insert: {
          created_at?: string
          descript?: string
          id?: string
          img_url: string
          is_comment?: boolean
          is_public?: boolean
          tags?: string | null
          title: string
        }
        Update: {
          created_at?: string
          descript?: string
          id?: string
          img_url?: string
          is_comment?: boolean
          is_public?: boolean
          tags?: string | null
          title?: string
        }
        Relationships: []
      }
      blog_content: {
        Row: {
          blog_id: string
          content: string
          created_at: string
        }
        Insert: {
          blog_id?: string
          content: string
          created_at?: string
        }
        Update: {
          blog_id?: string
          content?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_content_blog_id_fkey"
            columns: ["blog_id"]
            isOneToOne: true
            referencedRelation: "blog"
            referencedColumns: ["id"]
          },
        ]
      }
      comment: {
        Row: {
          created_at: string
          descript: string
          display_name: string
          email: string | null
          id: string
          post: string
          url: string | null
          uid: string | null
          title: string | null
        }
        Insert: {
          created_at?: string
          descript: string
          display_name: string
          email?: string | null
          id?: string
          post: string
          url: string | null
          uid: string | null
          title: string | null
        }
        Update: {
          created_at?: string
          descript?: string
          display_name?: string
          email?: string | null
          id?: string
          post?: string
          url: string | null
          uid: string | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comment_post_fkey"
            columns: ["post"]
            isOneToOne: false
            referencedRelation: "blog"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_uid_fkey"
            columns: ["uid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          display_name: string
          email: string
          id: string
          image_url: string
          role: string | null
        }
        Insert: {
          created_at?: string
          display_name: string
          email: string
          id?: string
          image_url: string
          role?: string | null
        }
        Update: {
          created_at?: string
          display_name?: string
          email?: string
          id?: string
          image_url?: string
          role?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      combined_search_column: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_comment: {
        Args: {
          blog_id: string
        }
        Returns: boolean
      }
      is_public: {
        Args: {
          blog_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
