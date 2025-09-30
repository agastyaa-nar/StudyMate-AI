// src/hooks/useSubjects.ts
import { useState, useEffect } from 'react';
import { subjectService } from '@/services/api';
import { useAuth } from './useAuth';
import type { Database } from '@/lib/database.types';

type Subject = Database['public']['Tables']['subjects']['Row'];

export function useSubjects() {
  const { user } = useAuth();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSubjects = async () => {
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
    if (!user) throw new Error('No user logged in');
    
    const newSubject = await subjectService.createSubject({
      ...subject,
      user_id: user.id,
    });
    setSubjects(prev => [newSubject, ...prev]);
    return newSubject;
  };

  const updateSubject = async (id: string, updates: Database['public']['Tables']['subjects']['Update']) => {
    const updated = await subjectService.updateSubject(id, updates);
    setSubjects(prev => prev.map(s => s.id === id ? updated : s));
    return updated;
  };

  const deleteSubject = async (id: string) => {
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
