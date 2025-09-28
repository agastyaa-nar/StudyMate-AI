import { useState, useEffect } from 'react';
import { db } from '@/lib/supabase';
import { useAuth } from './useAuth';

interface DashboardData {
  subjects: Array<{
    id: string;
    name: string;
    color: string;
    target_hours_per_week: number;
    weekly_hours: number;
    progress: number;
  }>;
  studyHoursData: Array<{
    date: string;
    hours: number;
  }>;
  calendarEvents: Array<{
    id: string;
    title: string;
    date: string;
    type: string;
    priority: string;
    status: string;
    subject: string;
    color: string;
  }>;
  insights: Array<any>;
  stats: {
    total_hours_this_week: number;
    total_hours_this_month: number;
    active_subjects: number;
    upcoming_deadlines: number;
  };
}

export const useDashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      setError(null);
      const result = await db.getDashboardData();
      setData(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch dashboard data');
      console.error('Dashboard data error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  const processStudyLog = async (rawText: string) => {
    try {
      const result = await db.processStudyLog(rawText);
      // Refresh dashboard data after processing
      await fetchDashboardData();
      return result;
    } catch (err) {
      throw err;
    }
  };

  return {
    data,
    loading,
    error,
    refetch: fetchDashboardData,
    processStudyLog,
  };
};