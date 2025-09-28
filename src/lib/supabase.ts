import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database
export interface Profile {
  id: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Subject {
  id: string;
  user_id: string;
  name: string;
  color: string;
  target_hours_per_week: number;
  created_at: string;
  updated_at: string;
}

export interface StudyLog {
  id: string;
  user_id: string;
  subject_id?: string;
  raw_text: string;
  extracted_topics: string[];
  duration_minutes?: number;
  study_date: string;
  insights?: string;
  mood_score?: number;
  difficulty_level?: number;
  created_at: string;
  updated_at: string;
}

export interface TaskExam {
  id: string;
  user_id: string;
  subject_id?: string;
  title: string;
  description?: string;
  type: 'task' | 'exam' | 'assignment' | 'quiz';
  due_date: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  created_at: string;
  updated_at: string;
}

export interface AIInsight {
  id: string;
  user_id: string;
  insight_type: 'weekly_summary' | 'pattern_detection' | 'recommendation' | 'progress_analysis';
  content: any;
  generated_at: string;
  is_read: boolean;
}

// Database helper functions
export const db = {
  // Process study log with AI
  async processStudyLog(rawText: string) {
    const { data, error } = await supabase.functions.invoke('process-study-log', {
      body: { raw_text: rawText }
    });
    
    if (error) throw error;
    return data;
  },

  // Get dashboard data
  async getDashboardData() {
    const { data, error } = await supabase.functions.invoke('get-dashboard-data');
    
    if (error) throw error;
    return data;
  },

  // Create or update subject
  async upsertSubject(subject: Partial<Subject>) {
    const { data, error } = await supabase
      .from('subjects')
      .upsert(subject)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Create task/exam
  async createTaskExam(taskExam: Partial<TaskExam>) {
    const { data, error } = await supabase
      .from('tasks_exams')
      .insert(taskExam)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Update task/exam status
  async updateTaskStatus(id: string, status: TaskExam['status']) {
    const { data, error } = await supabase
      .from('tasks_exams')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Get user profile
  async getProfile() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  // Update profile
  async updateProfile(updates: Partial<Profile>) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('profiles')
      .upsert({ id: user.id, ...updates, updated_at: new Date().toISOString() })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};