// src/hooks/useDashboard.ts
import { useState, useEffect } from 'react';
import { studyLogService, subjectService, streakService } from '@/services/api';
import { useAuth } from './useAuth';

export function useDashboard() {
  const { user } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
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