// src/hooks/useDashboard.ts
import { useState, useEffect } from 'react';
import { studyLogService, subjectService, streakService } from '@/services/api';
import { useAuth } from './useAuth';
import { isDemoMode } from '@/lib/supabase';

// Demo data for development
const DEMO_DATA = {
  stats: {
    total_hours_this_week: 24.5,
    active_subjects: 5,
    upcoming_deadlines: 3,
    current_streak: 7,
  },
  weeklyStats: [
    { id: '1', hours: 3.5, date: '2024-11-20', subject_id: '1', subjects: { name: 'React Development' } },
    { id: '2', hours: 2.0, date: '2024-11-19', subject_id: '2', subjects: { name: 'Database Systems' } },
    { id: '3', hours: 4.0, date: '2024-11-18', subject_id: '3', subjects: { name: 'Machine Learning' } },
    { id: '4', hours: 3.0, date: '2024-11-17', subject_id: '4', subjects: { name: 'Web Design' } },
    { id: '5', hours: 2.5, date: '2024-11-16', subject_id: '5', subjects: { name: 'Data Structures' } },
  ],
  subjects: [
    { id: '1', name: 'React Development', color: '#3B82F6' },
    { id: '2', name: 'Database Systems', color: '#10B981' },
    { id: '3', name: 'Machine Learning', color: '#8B5CF6' },
    { id: '4', name: 'Web Design', color: '#F59E0B' },
    { id: '5', name: 'Data Structures', color: '#EF4444' },
  ],
  streaks: [
    { id: '1', streak_type: 'daily', current_streak: 7, longest_streak: 15 },
    { id: '2', streak_type: 'weekly', current_streak: 3, longest_streak: 8 },
  ],
};

export function useDashboard() {
  const { user } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(!isDemoMode);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (isDemoMode) {
      // In demo mode, immediately return demo data
      setData(DEMO_DATA);
      setLoading(false);
      setError(null);
      return;
    }

    if (!user) return;

    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Fetch all data in parallel
        const [weeklyStats, subjects, streaks] = await Promise.all([
          studyLogService.getWeeklyStats(user.id),
          subjectService.getSubjects(user.id),
          streakService.getStreaks(user.id),
        ]);

        // Calculate stats
        const totalHoursThisWeek = weeklyStats.reduce((sum, log) => sum + parseFloat(log.hours.toString()), 0);
        const activeSubjects = subjects.length;
        
        // Get current streak
        const dailyStreak = streaks.find(s => s.streak_type === 'daily');

        setData({
          stats: {
            total_hours_this_week: totalHoursThisWeek,
            active_subjects: activeSubjects,
            upcoming_deadlines: 3, // This would come from goals table
            current_streak: dailyStreak?.current_streak || 0,
          },
          weeklyStats,
          subjects,
          streaks,
        });
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  return { data, loading, error };
}