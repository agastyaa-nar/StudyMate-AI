// src/hooks/useFlashcards.ts
import { useState, useEffect } from 'react';
import { flashcardService } from '@/services/api';
import { useAuth } from './useAuth';
import type { Database } from '@/lib/database.types';

type Flashcard = Database['public']['Tables']['flashcards']['Row'];

export function useFlashcards(subject?: string) {
  const { user } = useAuth();
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchFlashcards = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const data = await flashcardService.getFlashcards(user.id, subject);
      setFlashcards(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlashcards();
  }, [user, subject]);

  const createFlashcard = async (flashcard: Database['public']['Tables']['flashcards']['Insert']) => {
    if (!user) throw new Error('No user logged in');
    
    const newFlashcard = await flashcardService.createFlashcard({
      ...flashcard,
      user_id: user.id,
    });
    setFlashcards(prev => [newFlashcard, ...prev]);
    return newFlashcard;
  };

  const updateFlashcard = async (id: string, updates: Database['public']['Tables']['flashcards']['Update']) => {
    const updated = await flashcardService.updateFlashcard(id, updates);
    setFlashcards(prev => prev.map(f => f.id === id ? updated : f));
    return updated;
  };

  const deleteFlashcard = async (id: string) => {
    await flashcardService.deleteFlashcard(id);
    setFlashcards(prev => prev.filter(f => f.id !== id));
  };

  const updateMastery = async (id: string, masteryChange: number) => {
    const updated = await flashcardService.updateMastery(id, masteryChange);
    setFlashcards(prev => prev.map(f => f.id === id ? updated : f));
    return updated;
  };

  return {
    flashcards,
    loading,
    error,
    createFlashcard,
    updateFlashcard,
    deleteFlashcard,
    updateMastery,
    refetch: fetchFlashcards,
  };
}