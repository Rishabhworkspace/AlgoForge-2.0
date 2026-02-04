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
      users: {
        Row: {
          id: string
          name: string
          email: string
          avatar_url: string | null
          created_at: string
          xp_points: number
          streak_days: number
          last_active: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          avatar_url?: string | null
          created_at?: string
          xp_points?: number
          streak_days?: number
          last_active?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          avatar_url?: string | null
          created_at?: string
          xp_points?: number
          streak_days?: number
          last_active?: string
        }
      }
      topics: {
        Row: {
          id: string
          title: string
          category: string
          description: string
          order_index: number
          icon: string | null
          color: string | null
          total_problems: number
        }
        Insert: {
          id?: string
          title: string
          category: string
          description: string
          order_index: number
          icon?: string | null
          color?: string | null
          total_problems?: number
        }
        Update: {
          id?: string
          title?: string
          category?: string
          description?: string
          order_index?: number
          icon?: string | null
          color?: string | null
          total_problems?: number
        }
      }
      problems: {
        Row: {
          id: string
          topic_id: string
          title: string
          difficulty: 'Easy' | 'Medium' | 'Hard'
          video_link: string | null
          problem_link: string | null
          tags: string[]
          description: string | null
          order_index: number
        }
        Insert: {
          id?: string
          topic_id: string
          title: string
          difficulty: 'Easy' | 'Medium' | 'Hard'
          video_link?: string | null
          problem_link?: string | null
          tags?: string[]
          description?: string | null
          order_index: number
        }
        Update: {
          id?: string
          topic_id?: string
          title?: string
          difficulty?: 'Easy' | 'Medium' | 'Hard'
          video_link?: string | null
          problem_link?: string | null
          tags?: string[]
          description?: string | null
          order_index?: number
        }
      }
      user_progress: {
        Row: {
          id: string
          user_id: string
          problem_id: string
          completed: boolean
          completed_at: string | null
          attempts: number
          time_spent: number
        }
        Insert: {
          id?: string
          user_id: string
          problem_id: string
          completed?: boolean
          completed_at?: string | null
          attempts?: number
          time_spent?: number
        }
        Update: {
          id?: string
          user_id?: string
          problem_id?: string
          completed?: boolean
          completed_at?: string | null
          attempts?: number
          time_spent?: number
        }
      }
      notes: {
        Row: {
          id: string
          user_id: string
          problem_id: string | null
          title: string
          content: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          problem_id?: string | null
          title: string
          content: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          problem_id?: string | null
          title?: string
          content?: string
          created_at?: string
          updated_at?: string
        }
      }
      bookmarks: {
        Row: {
          id: string
          user_id: string
          problem_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          problem_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          problem_id?: string
          created_at?: string
        }
      }
      badges: {
        Row: {
          id: string
          name: string
          description: string
          icon: string
          requirement: string
          xp_reward: number
        }
        Insert: {
          id?: string
          name: string
          description: string
          icon: string
          requirement: string
          xp_reward: number
        }
        Update: {
          id?: string
          name?: string
          description?: string
          icon?: string
          requirement?: string
          xp_reward?: number
        }
      }
      user_badges: {
        Row: {
          id: string
          user_id: string
          badge_id: string
          earned_at: string
        }
        Insert: {
          id?: string
          user_id: string
          badge_id: string
          earned_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          badge_id?: string
          earned_at?: string
        }
      }
      daily_challenges: {
        Row: {
          id: string
          date: string
          problem_ids: string[]
          created_at: string
        }
        Insert: {
          id?: string
          date: string
          problem_ids: string[]
          created_at?: string
        }
        Update: {
          id?: string
          date?: string
          problem_ids?: string[]
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      difficulty_level: 'Easy' | 'Medium' | 'Hard'
    }
  }
}
