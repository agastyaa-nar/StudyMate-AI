// src/services/api.ts
import { supabase } from '@/lib/supabase';
import type { Database } from '@/lib/database.types';

type Tables = Database['public']['Tables'];
// ============= AUTH SERVICE =============
export const authService = {
  async signUp(email: string, password: string, metadata?: { username?: string; full_name?: string }) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    });
    if (error) throw error;
    return data;
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  },

  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
  },

  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback);
  },
};

// ============= PROFILE SERVICE =============
export const profileService = {
  async getProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    if (error) throw error;
    return data;
  },

  async updateProfile(userId: string, updates: Tables['profiles']['Update']) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();
    if (error) throw error;
    return data;
  },  
};

// ============= SUBJECT SERVICE =============
export const subjectService = {
  async getSubjects(userId: string) {
    const { data, error } = await supabase
      .from('subjects')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async getSubject(id: string) {
    const { data, error } = await supabase
      .from('subjects')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async createSubject(subject: Tables['subjects']['Insert']) {
    const { data, error } = await supabase
      .from('subjects')
      .insert(subject)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async updateSubject(id: string, updates: Tables['subjects']['Update']) {
    const { data, error } = await supabase
      .from('subjects')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async deleteSubject(id: string) {
    const { error } = await supabase
      .from('subjects')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },
};

// ============= STUDY LOG SERVICE =============
export const studyLogService = {
  async getStudyLogs(userId: string, startDate?: string, endDate?: string) {
    let query = supabase
      .from('study_logs')
      .select(`
        *,
        subjects (
          id,
          name,
          color
        )
      `)
      .eq('user_id', userId)
      .order('date', { ascending: false });

    if (startDate) {
      query = query.gte('date', startDate);
    }
    if (endDate) {
      query = query.lte('date', endDate);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async createStudyLog(log: Tables['study_logs']['Insert']) {
    const { data, error } = await supabase
      .from('study_logs')
      .insert(log)
      .select(`
        *,
        subjects (
          id,
          name,
          color
        )
      `)
      .single();
    if (error) throw error;
    return data;
  },

  async updateStudyLog(id: string, updates: Tables['study_logs']['Update']) {
    const { data, error } = await supabase
      .from('study_logs')
      .update(updates)
      .eq('id', id)
      .select(`
        *,
        subjects (
          id,
          name,
          color
        )
      `)
      .single();
    if (error) throw error;
    return data;
  },

  async deleteStudyLog(id: string) {
    const { error } = await supabase
      .from('study_logs')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },

  async getWeeklyStats(userId: string) {
    const today = new Date();
    const weekAgo = new Date(today);
    weekAgo.setDate(today.getDate() - 7);

    const { data, error } = await supabase
      .from('study_logs')
      .select('hours, date, subject_id, subjects(name)')
      .eq('user_id', userId)
      .gte('date', weekAgo.toISOString().split('T')[0])
      .lte('date', today.toISOString().split('T')[0]);

    if (error) throw error;
    return data;
  },
};

// ============= FLASHCARD SERVICE =============
export const flashcardService = {
  async getFlashcards(userId: string, subject?: string) {
    let query = supabase
      .from('flashcards')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (subject) {
      query = query.eq('subject', subject);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async getFlashcard(id: string) {
    const { data, error } = await supabase
      .from('flashcards')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async createFlashcard(flashcard: Tables['flashcards']['Insert']) {
    const { data, error } = await supabase
      .from('flashcards')
      .insert(flashcard)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async updateFlashcard(id: string, updates: Tables['flashcards']['Update']) {
    const { data, error } = await supabase
      .from('flashcards')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async deleteFlashcard(id: string) {
    const { error } = await supabase
      .from('flashcards')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },

  async updateMastery(id: string, masteryChange: number) {
    const flashcard = await this.getFlashcard(id);
    const newMastery = Math.max(0, Math.min(100, flashcard.mastery + masteryChange));
    
    return this.updateFlashcard(id, {
      mastery: newMastery,
      last_reviewed: new Date().toISOString(),
    });
  },
};

// ============= ACHIEVEMENT SERVICE =============
export const achievementService = {
  async getAchievements(userId: string) {
    const { data, error } = await supabase
      .from('achievements')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async createAchievement(achievement: Tables['achievements']['Insert']) {
    const { data, error } = await supabase
      .from('achievements')
      .insert(achievement)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async updateAchievement(id: string, updates: Tables['achievements']['Update']) {
    const { data, error } = await supabase
      .from('achievements')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async unlockAchievement(id: string) {
    return this.updateAchievement(id, {
      unlocked: true,
      unlocked_date: new Date().toISOString(),
    });
  },
};

// ============= STREAK SERVICE =============
export const streakService = {
  async getStreaks(userId: string) {
    const { data, error } = await supabase
      .from('streaks')
      .select('*')
      .eq('user_id', userId);
    if (error) throw error;
    return data;
  },

  async updateStreak(userId: string, streakType: 'daily' | 'weekly' | 'monthly', date: string) {
    const { error } = await supabase.rpc('update_user_streaks', {
      p_user_id: userId,
      p_date: date,
    });
    if (error) throw error;
  },
};

// ============= STUDY GROUP SERVICE =============
export const studyGroupService = {
  async getMyGroups(userId: string) {
    const { data, error } = await supabase
      .from('study_groups')
      .select(`
        *,
        group_members!inner (
          user_id,
          role
        )
      `)
      .eq('group_members.user_id', userId);
    if (error) throw error;
    return data;
  },

  async getPublicGroups() {
    const { data, error } = await supabase
      .from('study_groups')
      .select('*')
      .eq('is_private', false)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async getGroup(id: string) {
    const { data, error } = await supabase
      .from('study_groups')
      .select(`
        *,
        group_members (
          id,
          user_id,
          role,
          study_hours,
          joined_at,
          profiles (
            username,
            full_name,
            avatar_url
          )
        ),
        study_sessions (
          id,
          title,
          session_date,
          session_time,
          duration,
          session_type
        )
      `)
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async createGroup(group: Tables['study_groups']['Insert']) {
    const { data, error } = await supabase
      .from('study_groups')
      .insert(group)
      .select()
      .single();
    
    if (error) throw error;

    // Add creator as owner
    await supabase.from('group_members').insert({
      group_id: data.id,
      user_id: group.owner_id,
      role: 'owner',
    });

    return data;
  },

  async updateGroup(id: string, updates: Tables['study_groups']['Update']) {
    const { data, error } = await supabase
      .from('study_groups')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async deleteGroup(id: string) {
    const { error } = await supabase
      .from('study_groups')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },

  async joinGroup(groupId: string, userId: string) {
    const { data, error } = await supabase
      .from('group_members')
      .insert({
        group_id: groupId,
        user_id: userId,
        role: 'member',
      })
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async leaveGroup(groupId: string, userId: string) {
    const { error } = await supabase
      .from('group_members')
      .delete()
      .eq('group_id', groupId)
      .eq('user_id', userId);
    if (error) throw error;
  },

  async getGroupMembers(groupId: string) {
    const { data, error } = await supabase
      .from('group_members')
      .select(`
        *,
        profiles (
          username,
          full_name,
          avatar_url
        )
      `)
      .eq('group_id', groupId)
      .order('joined_at', { ascending: true });
    if (error) throw error;
    return data;
  },
};

// ============= STUDY SESSION SERVICE =============
export const studySessionService = {
  async getGroupSessions(groupId: string) {
    const { data, error } = await supabase
      .from('study_sessions')
      .select('*')
      .eq('group_id', groupId)
      .order('session_date', { ascending: true });
    if (error) throw error;
    return data;
  },

  async createSession(session: Tables['study_sessions']['Insert']) {
    const { data, error } = await supabase
      .from('study_sessions')
      .insert(session)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async deleteSession(id: string) {
    const { error } = await supabase
      .from('study_sessions')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },
};

// ============= GOAL SERVICE =============
export const goalService = {
  async getGoals(userId: string) {
    const { data, error } = await supabase
      .from('goals')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async createGoal(goal: Tables['goals']['Insert']) {
    const { data, error } = await supabase
      .from('goals')
      .insert(goal)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async updateGoal(id: string, updates: Tables['goals']['Update']) {
    const { data, error } = await supabase
      .from('goals')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async deleteGoal(id: string) {
    const { error } = await supabase
      .from('goals')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },
};

// ============= QUIZ SERVICE =============
export const quizService = {
  async getQuizQuestions(userId: string, subject?: string) {
    let query = supabase
      .from('quiz_questions')
      .select('*')
      .eq('user_id', userId);

    if (subject) {
      query = query.eq('subject', subject);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async createQuizQuestion(question: Tables['quiz_questions']['Insert']) {
    const { data, error } = await supabase
      .from('quiz_questions')
      .insert(question)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async saveQuizAttempt(attempt: Tables['quiz_attempts']['Insert']) {
    const { data, error } = await supabase
      .from('quiz_attempts')
      .insert(attempt)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async getQuizHistory(userId: string) {
    const { data, error } = await supabase
      .from('quiz_attempts')
      .select('*')
      .eq('user_id', userId)
      .order('completed_at', { ascending: false });
    if (error) throw error;
    return data;
  },
};