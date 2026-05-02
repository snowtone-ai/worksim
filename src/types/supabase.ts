export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          user_id: string
          university: string | null
          faculty: string | null
          target_industry: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          university?: string | null
          faculty?: string | null
          target_industry?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          user_id?: string
          university?: string | null
          faculty?: string | null
          target_industry?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
