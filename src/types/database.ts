/**
 * Supabase Database 타입 정의
 */
export type Database = {
  public: {
    Tables: {
      habits: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          icon:
            | "droplet"
            | "run"
            | "book"
            | "brain"
            | "dumbbell"
            | "pen"
            | "moon";
          goal: number;
          unit: string;
          days: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          icon:
            | "droplet"
            | "run"
            | "book"
            | "brain"
            | "dumbbell"
            | "pen"
            | "moon";
          goal?: number;
          unit?: string;
          days: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          icon?:
            | "droplet"
            | "run"
            | "book"
            | "brain"
            | "dumbbell"
            | "pen"
            | "moon";
          goal?: number;
          unit?: string;
          days?: string[];
          created_at?: string;
          updated_at?: string;
        };
      };
      habit_logs: {
        Row: {
          id: string;
          habit_id: string;
          user_id: string;
          completed_at: string;
          current: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          habit_id: string;
          user_id: string;
          completed_at: string;
          current?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          habit_id?: string;
          user_id?: string;
          completed_at?: string;
          current?: number;
          created_at?: string;
        };
      };
    };
  };
};

/**
 * 테이블 Row 타입 단축
 */
export type HabitRow = Database["public"]["Tables"]["habits"]["Row"];
export type HabitLogRow = Database["public"]["Tables"]["habit_logs"]["Row"];
