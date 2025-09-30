export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          bio: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      subjects: {
        Row: {
          id: string
          user_id: string
          name: string
          color: string
          target_hours: number
          completed_hours: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          color?: string
          target_hours?: number
          completed_hours?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          color?: string
          target_hours?: number
          completed_hours?: number
          created_at?: string
          updated_at?: string
        }
      }
      study_logs: {
        Row: {
          id: string
          user_id: string
          subject_id: string
          date: string
          hours: number
          notes: string | null
          efficiency: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          subject_id: string
          date: string
          hours: number
          notes?: string | null
          efficiency?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          subject_id?: string
          date?: string
          hours?: number
          notes?: string | null
          efficiency?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      flashcards: {
        Row: {
          id: string
          user_id: string
          question: string
          answer: string
          subject: string
          difficulty: 'easy' | 'medium' | 'hard'
          mastery: number
          hint: string | null
          tags: string[]
          last_reviewed: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          question: string
          answer: string
          subject: string
          difficulty?: 'easy' | 'medium' | 'hard'
          mastery?: number
          hint?: string | null
          tags?: string[]
          last_reviewed?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          question?: string
          answer?: string
          subject?: string
          difficulty?: 'easy' | 'medium' | 'hard'
          mastery?: number
          hint?: string | null
          tags?: string[]
          last_reviewed?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      achievements: {
        Row: {
          id: string
          user_id: string
          achievement_type: string
          title: string
          description: string | null
          category: 'streak' | 'hours' | 'subjects' | 'efficiency' | 'special' | null
          rarity: 'common' | 'rare' | 'epic' | 'legendary'
          progress: number
          max_progress: number
          unlocked: boolean
          unlocked_date: string | null
          points: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          achievement_type: string
          title: string
          description?: string | null
          category?: 'streak' | 'hours' | 'subjects' | 'efficiency' | 'special'
          rarity?: 'common' | 'rare' | 'epic' | 'legendary'
          progress?: number
          max_progress: number
          unlocked?: boolean
          unlocked_date?: string | null
          points?: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          achievement_type?: string
          title?: string
          description?: string | null
          category?: 'streak' | 'hours' | 'subjects' | 'efficiency' | 'special'
          rarity?: 'common' | 'rare' | 'epic' | 'legendary'
          progress?: number
          max_progress?: number
          unlocked?: boolean
          unlocked_date?: string | null
          points?: number
          created_at?: string
        }
      }
      study_groups: {
        Row: {
          id: string
          name: string
          description: string | null
          subject: string | null
          owner_id: string
          is_private: boolean
          max_members: number
          study_goal: string | null
          progress: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          subject?: string | null
          owner_id: string
          is_private?: boolean
          max_members?: number
          study_goal?: string | null
          progress?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          subject?: string | null
          owner_id?: string
          is_private?: boolean
          max_members?: number
          study_goal?: string | null
          progress?: number
          created_at?: string
          updated_at?: string
        }
      }
      group_members: {
        Row: {
          id: string
          group_id: string
          user_id: string
          role: 'owner' | 'admin' | 'member'
          study_hours: number
          joined_at: string
        }
        Insert: {
          id?: string
          group_id: string
          user_id: string
          role?: 'owner' | 'admin' | 'member'
          study_hours?: number
          joined_at?: string
        }
        Update: {
          id?: string
          group_id?: string
          user_id?: string
          role?: 'owner' | 'admin' | 'member'
          study_hours?: number
          joined_at?: string
        }
      }
      study_sessions: {
        Row: {
          id: string
          group_id: string
          title: string
          session_date: string
          session_time: string
          duration: string
          session_type: 'study' | 'quiz' | 'discussion'
          created_by: string
          created_at: string
        }
        Insert: {
          id?: string
          group_id: string
          title: string
          session_date: string
          session_time: string
          duration: string
          session_type?: 'study' | 'quiz' | 'discussion'
          created_by: string
          created_at?: string
        }
        Update: {
          id?: string
          group_id?: string
          title?: string
          session_date?: string
          session_time?: string
          duration?: string
          session_type?: 'study' | 'quiz' | 'discussion'
          created_by?: string
          created_at?: string
        }
      }
      streaks: {
        Row: {
          id: string
          user_id: string
          streak_type: 'daily' | 'weekly' | 'monthly'
          current_streak: number
          longest_streak: number
          last_activity: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          streak_type: 'daily' | 'weekly' | 'monthly'
          current_streak?: number
          longest_streak?: number
          last_activity?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          streak_type?: 'daily' | 'weekly' | 'monthly'
          current_streak?: number
          longest_streak?: number
          last_activity?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      goals: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          target_value: number
          current_value: number
          goal_type: 'hours' | 'subjects' | 'streak' | 'efficiency'
          deadline: string | null
          completed: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          target_value: number
          current_value?: number
          goal_type: 'hours' | 'subjects' | 'streak' | 'efficiency'
          deadline?: string | null
          completed?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          target_value?: number
          current_value?: number
          goal_type?: 'hours' | 'subjects' | 'streak' | 'efficiency'
          deadline?: string | null
          completed?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      quiz_questions: {
        Row: {
          id: string
          user_id: string
          question: string
          options: Json
          correct_answer: number
          explanation: string | null
          subject: string
          difficulty: 'easy' | 'medium' | 'hard'
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          question: string
          options: Json
          correct_answer: number
          explanation?: string | null
          subject: string
          difficulty?: 'easy' | 'medium' | 'hard'
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          question?: string
          options?: Json
          correct_answer?: number
          explanation?: string | null
          subject?: string
          difficulty?: 'easy' | 'medium' | 'hard'
          created_at?: string
        }
      }
      quiz_attempts: {
        Row: {
          id: string
          user_id: string
          quiz_id: string | null
          score: number | null
          total_questions: number | null
          completed_at: string
        }
        Insert: {
          id?: string
          user_id: string
          quiz_id?: string | null
          score?: number | null
          total_questions?: number | null
          completed_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          quiz_id?: string | null
          score?: number | null
          total_questions?: number | null
          completed_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      update_user_streaks: {
        Args: {
          p_user_id: string
          p_date: string
        }
        Returns: void
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
