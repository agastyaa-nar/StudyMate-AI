// src/hooks/useStudyLogs.ts
import { useState, useEffect } from 'react';
import { studyLogService } from '@/services/api';
import { useAuth } from './useAuth';
import { isDemoMode } from '@/lib/supabase';
import type { Database } from '@/lib/database.types';

type StudyLog = Database['public']['Tables']['study_logs']['Row'];

// Demo study logs data
const DEMO_LOGS: any[] = [
  {
    id: '1',
    user_id: 'demo-user-id',
    subject_id: '1',
    date: '2024-11-20',
    hours: 3.5,
    efficiency: 8,
    notes: 'Studied React hooks and state management. Focused on useEffect and useState.',
    created_at: '2024-11-20T10:00:00Z',
    updated_at: '2024-11-20T10:00:00Z',
    subjects: { id: '1', name: 'React Development', color: '#3B82F6' },
  },
  {
    id: '2',
    user_id: 'demo-user-id',
    subject_id: '2',
    date: '2024-11-19',
    hours: 2.0,
    efficiency: 7,
    notes: 'Database design and SQL queries. Practiced complex joins and subqueries.',
    created_at: '2024-11-19T14:30:00Z',
    updated_at: '2024-11-19T14:30:00Z',
    subjects: { id: '2', name: 'Database Systems', color: '#10B981' },
  },
  {
    id: '3',
    user_id: 'demo-user-id',
    subject_id: '3',
    date: '2024-11-18',
    hours: 4.0,
    efficiency: 9,
    notes: 'Machine learning algorithms and neural networks. Implemented a simple perceptron.',
    created_at: '2024-11-18T09:15:00Z',
    updated_at: '2024-11-18T09:15:00Z',
    subjects: { id: '3', name: 'Machine Learning', color: '#8B5CF6' },
  },
  {
    id: '4',
    user_id: 'demo-user-id',
    subject_id: '4',
    date: '2024-11-17',
    hours: 3.0,
    efficiency: 8,
    notes: 'Web design principles and CSS Grid. Created responsive layouts.',
    created_at: '2024-11-17T16:45:00Z',
    updated_at: '2024-11-17T16:45:00Z',
    subjects: { id: '4', name: 'Web Design', color: '#F59E0B' },
  },
  {
    id: '5',
    user_id: 'demo-user-id',
    subject_id: '5',
    date: '2024-11-16',
    hours: 2.5,
    efficiency: 7,
    notes: 'Data structures and algorithms. Implemented binary search tree operations.',
    created_at: '2024-11-16T11:20:00Z',
    updated_at: '2024-11-16T11:20:00Z',
    subjects: { id: '5', name: 'Data Structures', color: '#EF4444' },
  },
];

export function useStudyLogs(startDate?: string, endDate?: string) {
  const { user } = useAuth();
  const [logs, setLogs] = useState<any[]>(isDemoMode ? DEMO_LOGS : []);
  const [loading, setLoading] = useState(!isDemoMode);
  const [error, setError] = useState<Error | null>(null);

  const fetchLogs = async () => {
    if (isDemoMode) {
      // In demo mode, return filtered demo data
      let filteredLogs = DEMO_LOGS;
      if (startDate) {
        filteredLogs = filteredLogs.filter(log => log.date >= startDate);
      }
      if (endDate) {
        filteredLogs = filteredLogs.filter(log => log.date <= endDate);
      }
      setLogs(filteredLogs);
      setLoading(false);
      setError(null);
      return;
    }

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
    if (isDemoMode) {
      // In demo mode, just add to local state
      const newLog: any = {
        id: Date.now().toString(),
        user_id: 'demo-user-id',
        subject_id: log.subject_id,
        date: log.date,
        hours: log.hours,
        efficiency: log.efficiency,
        notes: log.notes,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        subjects: { id: log.subject_id, name: 'New Subject', color: '#3B82F6' },
      };
      setLogs(prev => [newLog, ...prev]);
      return newLog;
    }

    if (!user) throw new Error('No user logged in');
    
    const newLog = await studyLogService.createStudyLog({
      ...log,
      user_id: user.id,
    });
    setLogs(prev => [newLog, ...prev]);
    return newLog;
  };

  const updateLog = async (id: string, updates: Database['public']['Tables']['study_logs']['Update']) => {
    if (isDemoMode) {
      // In demo mode, just update local state
      setLogs(prev => prev.map(l => 
        l.id === id ? { ...l, ...updates, updated_at: new Date().toISOString() } : l
      ));
      return logs.find(l => l.id === id)!;
    }

    const updated = await studyLogService.updateStudyLog(id, updates);
    setLogs(prev => prev.map(l => l.id === id ? updated : l));
    return updated;
  };

  const deleteLog = async (id: string) => {
    if (isDemoMode) {
      // In demo mode, just remove from local state
      setLogs(prev => prev.filter(l => l.id !== id));
      return;
    }

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
