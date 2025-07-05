
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import { Group } from './useGroups';

export interface GroupMembership {
  id: string;
  group_id: string;
  user_id: string;
  role: 'member' | 'admin' | 'creator';
  status: 'active' | 'pending' | 'awaiting_approval';
  approval_status: 'approved' | 'pending' | 'rejected';
  joined_at: string;
}

export const useGroupMembership = (groupId?: string) => {
  const [membership, setMembership] = useState<GroupMembership | null>(null);
  const [group, setGroup] = useState<Group | null>(null);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();

  const fetchGroupAndMembership = async () => {
    if (!groupId) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch group details
      const { data: groupData, error: groupError } = await supabase
        .from('groups')
        .select('*')
        .eq('id', groupId)
        .single();

      if (groupError) throw groupError;
      setGroup(groupData);

      // Check user membership
      const { data: membershipData, error: membershipError } = await supabase
        .from('group_members')
        .select('*')
        .eq('group_id', groupId)
        .eq('user_id', user.id)
        .single();

      if (membershipError && membershipError.code !== 'PGRST116') {
        throw membershipError;
      }

      setMembership(membershipData);
    } catch (error) {
      console.error('Error fetching group membership:', error);
      toast.error(language === 'ar' ? 'خطأ في تحميل بيانات المجموعة' : 'Error loading group data');
    } finally {
      setLoading(false);
    }
  };

  const joinGroup = async (acceptTerms: boolean = false) => {
    if (!groupId || !group) return false;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error(language === 'ar' ? 'يجب تسجيل الدخول أولاً' : 'Please login first');
        return false;
      }

      if (!acceptTerms) {
        toast.error(language === 'ar' ? 'يجب قبول الشروط والأحكام' : 'You must accept terms and conditions');
        return false;
      }

      // Check user points
      const { data: userPoints } = await supabase
        .rpc('get_user_points', { p_user_id: user.id });

      const points = userPoints?.[0];
      const requiredPoints = group.points_required || 0;

      if (requiredPoints > 0 && (!points || points.available_points < requiredPoints)) {
        toast.error(language === 'ar' ? 'نقاط غير كافية' : 'Insufficient points');
        return false;
      }

      // Handle points based on group status
      if (requiredPoints > 0) {
        const action = group.status === 'pending_members' ? 'hold' : 'deduct';
        const description = group.status === 'pending_members' 
          ? 'Points held for group membership'
          : 'Points deducted for group membership';

        const success = await supabase.rpc('manage_user_points', {
          p_user_id: user.id,
          p_group_id: groupId,
          p_amount: requiredPoints,
          p_action: action,
          p_description: description
        });

        if (!success) {
          toast.error(language === 'ar' ? 'خطأ في إدارة النقاط' : 'Error managing points');
          return false;
        }
      }

      // Create membership request
      const { error } = await supabase
        .from('group_members')
        .insert([{
          group_id: groupId,
          user_id: user.id,
          role: 'member',
          status: 'awaiting_approval',
          approval_status: 'pending'
        }]);

      if (error) throw error;

      toast.success(language === 'ar' ? 'تم إرسال طلب الانضمام بنجاح' : 'Join request sent successfully');
      await fetchGroupAndMembership();
      return true;
    } catch (error) {
      console.error('Error joining group:', error);
      toast.error(language === 'ar' ? 'خطأ في الانضمام للمجموعة' : 'Error joining group');
      return false;
    }
  };

  useEffect(() => {
    fetchGroupAndMembership();
  }, [groupId]);

  return {
    membership,
    group,
    loading,
    joinGroup,
    refetch: fetchGroupAndMembership
  };
};
