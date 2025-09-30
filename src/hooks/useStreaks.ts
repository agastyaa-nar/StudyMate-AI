// src/hooks/useStreaks.ts
import { useState, useEffect } from 'react';
import { streakService } from '@/services/api';
import { useAuth } from './useAuth';
import type { Database } from '@/lib/database.types';

type Streak = Database['public']['Tables']['streaks']['Row'];

export function useStreaks() {
  const { user } = useAuth();
  const [streaks, setStreaks] = useState<Streak[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchStreaks = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const data = await streakService.getStreaks(user.id);
      setStreaks(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStreaks();
  }, [user]);

  return {
    streaks,
    loading,
    error,
    refetch: fetchStreaks,
  };
}