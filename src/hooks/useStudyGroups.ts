// src/hooks/useStudyGroups.ts
import { useState, useEffect } from 'react';
import { studyGroupService } from '@/services/api';
import { useAuth } from './useAuth';
import type { Database } from '@/lib/database.types';

type StudyGroup = Database['public']['Tables']['study_groups']['Row'];

export function useStudyGroups() {
  const { user } = useAuth();
  const [myGroups, setMyGroups] = useState<any[]>([]);
  const [publicGroups, setPublicGroups] = useState<StudyGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchMyGroups = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const data = await studyGroupService.getMyGroups(user.id);
      setMyGroups(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPublicGroups = async () => {
    try {
      setLoading(true);
      const data = await studyGroupService.getPublicGroups();
      setPublicGroups(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyGroups();
    fetchPublicGroups();
  }, [user]);

  const createGroup = async (group: Database['public']['Tables']['study_groups']['Insert']) => {
    if (!user) throw new Error('No user logged in');
    
    const newGroup = await studyGroupService.createGroup({
      ...group,
      owner_id: user.id,
    });
    setMyGroups(prev => [newGroup, ...prev]);
    return newGroup;
  };

  const joinGroup = async (groupId: string) => {
    if (!user) throw new Error('No user logged in');
    
    await studyGroupService.joinGroup(groupId, user.id);
    await fetchMyGroups();
  };

  const leaveGroup = async (groupId: string) => {
    if (!user) throw new Error('No user logged in');
    
    await studyGroupService.leaveGroup(groupId, user.id);
    setMyGroups(prev => prev.filter(g => g.id !== groupId));
  };

  return {
    myGroups,
    publicGroups,
    loading,
    error,
    createGroup,
    joinGroup,
    leaveGroup,
    refetchMyGroups: fetchMyGroups,
    refetchPublicGroups: fetchPublicGroups,
  };
}