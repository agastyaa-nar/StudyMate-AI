// src/hooks/useSubjects.ts
import { useState, useEffect } from 'react';
import { subjectService } from '@/services/api';
import { useAuth } from './useAuth';
import { isDemoMode } from '@/lib/supabase';
import type { Database } from '@/lib/database.types';

type Subject = Database['public']['Tables']['subjects']['Row'];

// Demo subjects data
const DEMO_SUBJECTS: Subject[] = [
  {
    id: '1',
    user_id: 'demo-user-id',
    name: 'React Development',
    color: '#3B82F6',
    created_at: '2024-11-01T00:00:00Z',
    updated_at: '2024-11-01T00:00:00Z',
  },
  {
    id: '2',
    user_id: 'demo-user-id',
    name: 'Database Systems',
    color: '#10B981',
    created_at: '2024-11-02T00:00:00Z',
    updated_at: '2024-11-02T00:00:00Z',
  },
  {
    id: '3',
    user_id: 'demo-user-id',
    name: 'Machine Learning',
    color: '#8B5CF6',
    created_at: '2024-11-03T00:00:00Z',
    updated_at: '2024-11-03T00:00:00Z',
  },
  {
    id: '4',
    user_id: 'demo-user-id',
    name: 'Web Design',
    color: '#F59E0B',
    created_at: '2024-11-04T00:00:00Z',
    updated_at: '2024-11-04T00:00:00Z',
  },
  {
    id: '5',
    user_id: 'demo-user-id',
    name: 'Data Structures',
    color: '#EF4444',
    created_at: '2024-11-05T00:00:00Z',
    updated_at: '2024-11-05T00:00:00Z',
  },
];

export function useSubjects() {
  const { user } = useAuth();
  const [subjects, setSubjects] = useState<Subject[]>(isDemoMode ? DEMO_SUBJECTS : []);
  const [loading, setLoading] = useState(!isDemoMode);
  const [error, setError] = useState<Error | null>(null);

  const fetchSubjects = async () => {
    if (isDemoMode) {
      setSubjects(DEMO_SUBJECTS);
      setLoading(false);
      setError(null);
      return;
    }

    if (!user) return;
    
    try {
      setLoading(true);
      const data = await subjectService.getSubjects(user.id);
      setSubjects(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, [user]);

  const createSubject = async (subject: Database['public']['Tables']['subjects']['Insert']) => {
    if (isDemoMode) {
      // In demo mode, just add to local state
      const newSubject: Subject = {
        id: Date.now().toString(),
        user_id: 'demo-user-id',
        name: subject.name || 'New Subject',
        color: subject.color || '#3B82F6',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setSubjects(prev => [newSubject, ...prev]);
      return newSubject;
    }

    if (!user) throw new Error('No user logged in');
    
    const newSubject = await subjectService.createSubject({
      ...subject,
      user_id: user.id,
    });
    setSubjects(prev => [newSubject, ...prev]);
    return newSubject;
  };

  const updateSubject = async (id: string, updates: Database['public']['Tables']['subjects']['Update']) => {
    if (isDemoMode) {
      // In demo mode, just update local state
      setSubjects(prev => prev.map(s => 
        s.id === id ? { ...s, ...updates, updated_at: new Date().toISOString() } : s
      ));
      return subjects.find(s => s.id === id)!;
    }

    const updated = await subjectService.updateSubject(id, updates);
    setSubjects(prev => prev.map(s => s.id === id ? updated : s));
    return updated;
  };

  const deleteSubject = async (id: string) => {
    if (isDemoMode) {
      // In demo mode, just remove from local state
      setSubjects(prev => prev.filter(s => s.id !== id));
      return;
    }

    await subjectService.deleteSubject(id);
    setSubjects(prev => prev.filter(s => s.id !== id));
  };

  return {
    subjects,
    loading,
    error,
    createSubject,
    updateSubject,
    deleteSubject,
    refetch: fetchSubjects,
  };
}
