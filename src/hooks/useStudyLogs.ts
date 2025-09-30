// src/hooks/useStudyLogs.ts
import { useState, useEffect } from 'react';
import { studyLogService } from '@/services/api';
import { useAuth } from './useAuth';
import type { Database } from '@/lib/database.types';

type StudyLog = Database['public']['Tables']['study_logs']['Row'];

export function useStudyLogs(startDate?: string, endDate?: string) {
  const { user } = useAuth();
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchLogs = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const data = await studyLogService.getStudyLogs(user.id, startDate, endDate);
      setLogs(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [user, startDate, endDate]);

  const createLog = async (log: Database['public']['Tables']['study_logs']['Insert']) => {
    if (!user) throw new Error('No user logged in');
    
    const newLog = await studyLogService.createStudyLog({
      ...log,
      user_id: user.id,
    });
    setLogs(prev => [newLog, ...prev]);
    return newLog;
  };

  const updateLog = async (id: string, updates: Database['public']['Tables']['study_logs']['Update']) => {
    const updated = await studyLogService.updateStudyLog(id, updates);
    setLogs(prev => prev.map(l => l.id === id ? updated : l));
    return updated;
  };

  const deleteLog = async (id: string) => {
    await studyLogService.deleteStudyLog(id);
    setLogs(prev => prev.filter(l => l.id !== id));
  };

  return {
    logs,
    loading,
    error,
    createLog,
    updateLog,
    deleteLog,
    refetch: fetchLogs,
  };
}
