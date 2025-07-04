
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

export interface GroupVotingSession {
  id: string;
  group_id: string;
  title: string;
  description: string | null;
  type: 'admin_election' | 'decision' | 'contract_approval';
  phase: string;
  max_selections: number;
  candidates: string[];
  options: any;
  status: 'active' | 'completed' | 'cancelled';
  created_by: string;
  created_at: string;
  deadline: string | null;
  results: any;
}

export interface GroupVote {
  id: string;
  voting_session_id: string;
  voter_id: string;
  selections: string[];
  choice: string | null;
  created_at: string;
}

export const useGroupVoting = (groupId?: string) => {
  const [votingSessions, setVotingSessions] = useState<GroupVotingSession[]>([]);
  const [userVotes, setUserVotes] = useState<GroupVote[]>([]);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();

  const fetchVotingSessions = async () => {
    if (!groupId) return;

    try {
      const { data, error } = await supabase
        .rpc('get_group_voting_sessions', { p_group_id: groupId });

      if (error) throw error;
      setVotingSessions((data as GroupVotingSession[]) || []);
    } catch (error) {
      console.error('Error fetching voting sessions:', error);
      toast.error(language === 'ar' ? 'خطأ في تحميل جلسات التصويت' : 'Error loading voting sessions');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserVotes = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .rpc('get_user_votes', { p_user_id: user.id });

      if (error) throw error;
      setUserVotes((data as GroupVote[]) || []);
    } catch (error) {
      console.error('Error fetching user votes:', error);
    }
  };

  const createVotingSession = async (sessionData: {
    title: string;
    description?: string;
    type: 'admin_election' | 'decision' | 'contract_approval';
    phase: string;
    maxSelections?: number;
    candidates?: string[];
    options?: any;
    deadline?: string;
  }) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || !groupId) {
        toast.error(language === 'ar' ? 'يجب تسجيل الدخول أولاً' : 'Please login first');
        return null;
      }

      const { data, error } = await supabase
        .rpc('create_voting_session', {
          p_group_id: groupId,
          p_title: sessionData.title,
          p_description: sessionData.description || null,
          p_type: sessionData.type,
          p_phase: sessionData.phase,
          p_max_selections: sessionData.maxSelections || 1,
          p_candidates: sessionData.candidates || [],
          p_options: sessionData.options || {},
          p_created_by: user.id,
          p_deadline: sessionData.deadline || null
        });

      if (error) throw error;

      toast.success(language === 'ar' ? 'تم إنشاء جلسة التصويت بنجاح' : 'Voting session created successfully');
      await fetchVotingSessions();
      return data;
    } catch (error) {
      console.error('Error creating voting session:', error);
      toast.error(language === 'ar' ? 'خطأ في إنشاء جلسة التصويت' : 'Error creating voting session');
      return null;
    }
  };

  const castVote = async (sessionId: string, selections: string[], choice?: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error(language === 'ar' ? 'يجب تسجيل الدخول أولاً' : 'Please login first');
        return false;
      }

      const { data, error } = await supabase
        .rpc('cast_vote', {
          p_voting_session_id: sessionId,
          p_voter_id: user.id,
          p_selections: selections,
          p_choice: choice || null
        });

      if (error) throw error;

      toast.success(language === 'ar' ? 'تم تسجيل صوتك بنجاح' : 'Vote cast successfully');
      await fetchUserVotes();
      return true;
    } catch (error) {
      console.error('Error casting vote:', error);
      toast.error(language === 'ar' ? 'خطأ في تسجيل الصوت' : 'Error casting vote');
      return false;
    }
  };

  const createAdminElection = async (groupId: string, phase: string, candidates: string[]) => {
    return createVotingSession({
      title: `🗳️ ${language === 'ar' ? 'انتخاب 3 مشرفين للمرحلة' : 'Elect 3 Admins for Phase'} ${phase}`,
      description: language === 'ar' ? 'اختر 3 أعضاء لإدارة هذه المرحلة' : 'Select 3 members to manage this phase',
      type: 'admin_election',
      phase: phase,
      maxSelections: 3,
      candidates: candidates
    });
  };

  useEffect(() => {
    fetchVotingSessions();
    fetchUserVotes();
  }, [groupId]);

  return {
    votingSessions,
    userVotes,
    loading,
    createVotingSession,
    createAdminElection,
    castVote,
    refetch: () => {
      fetchVotingSessions();
      fetchUserVotes();
    }
  };
};
