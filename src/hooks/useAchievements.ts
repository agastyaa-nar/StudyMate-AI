// src/hooks/useAchievements.ts
import { useState, useEffect } from 'react';
import { achievementService } from '@/services/api';
import { useAuth } from './useAuth';
import type { Database } from '@/lib/database.types';

type Achievement = Database['public']['Tables']['achievements']['Row'];

export function useAchievements() {
  const { user } = useAuth();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchAchievements = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const data = await achievementService.getAchievements(user.id);
      setAchievements(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, [user]);

  const unlockAchievement = async (id: string) => {
    const updated = await achievementService.unlockAchievement(id);
    setAchievements(prev => prev.map(a => a.id === id ? updated : a));
    return updated;
  };

  return {
    achievements,
    loading,
    error,
    unlockAchievement,
    refetch: fetchAchievements,
  };
}