
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import { useUserPoints } from './useUserPoints';

export interface Group {
  id: string;
  name: string;
  description: string;
  type: string;
  service_gateway: string;
  business_objective: string;
  status: string;
  creator_id: string;
  created_at: string;
  member_count?: number;
  points_required?: number;
  current_phase?: string;
  round_number?: number;
  min_members?: number;
  max_members?: number;
  admins?: string[];
  visibility?: string;
}

export interface CreateGroupData {
  name: string;
  description?: string;
  type: string;
  service_gateway: string;
  business_objective?: string;
  points_required?: number;
  min_members?: number;
  max_members?: number;
}

export const useGroups = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();
  const { managePoints } = useUserPoints();

  const fetchGroups = async () => {
    try {
      const { data, error } = await supabase
        .from('groups')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGroups(data || []);
    } catch (error) {
      console.error('Error fetching groups:', error);
      toast.error(language === 'ar' ? 'خطأ في تحميل المجموعات' : 'Error loading groups');
    } finally {
      setLoading(false);
    }
  };

  const createGroup = async (groupData: CreateGroupData) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error(language === 'ar' ? 'يجب تسجيل الدخول أولاً' : 'Please login first');
        return null;
      }

      const { data, error } = await supabase
        .from('groups')
        .insert([{
          name: groupData.name,
          description: groupData.description || '',
          type: groupData.type,
          service_gateway: groupData.service_gateway,
          business_objective: groupData.business_objective || '',
          creator_id: user.id,
          status: 'awaiting_activation',
          current_phase: 'pending_members',
          visibility: 'private',
          points_required: groupData.points_required || 10,
          min_members: groupData.min_members || 5,
          max_members: groupData.max_members || 20,
          round_number: 1
        }])
        .select()
        .single();

      if (error) throw error;
      
      // Automatically add creator as member
      await supabase
        .from('group_members')
        .insert([{
          group_id: data.id,
          user_id: user.id,
          role: 'member',
          status: 'active',
          approval_status: 'approved'
        }]);

      toast.success(language === 'ar' ? 'تم إنشاء المجموعة بنجاح' : 'Group created successfully');
      await fetchGroups();
      return data;
    } catch (error) {
      console.error('Error creating group:', error);
      toast.error(language === 'ar' ? 'خطأ في إنشاء المجموعة' : 'Error creating group');
      return null;
    }
  };

  const joinGroup = async (groupId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error(language === 'ar' ? 'يجب تسجيل الدخول أولاً' : 'Please login first');
        return false;
      }

      // Get group details
      const { data: group, error: groupError } = await supabase
        .from('groups')
        .select('points_required, status')
        .eq('id', groupId)
        .single();

      if (groupError) throw groupError;

      const pointsRequired = group.points_required || 0;
      
      // Handle points based on group status
      let pointsSuccess = true;
      if (pointsRequired > 0) {
        if (group.status === 'pending_members') {
          // Hold points for pending groups
          pointsSuccess = await managePoints(groupId, pointsRequired, 'hold', 'Points held for group membership');
        } else if (group.status === 'active') {
          // Deduct points for active groups
          pointsSuccess = await managePoints(groupId, pointsRequired, 'deduct', 'Points deducted for group membership');
        }
      }

      if (!pointsSuccess) {
        return false;
      }

      // Create join request
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
      return true;
    } catch (error) {
      console.error('Error joining group:', error);
      toast.error(language === 'ar' ? 'خطأ في الانضمام للمجموعة' : 'Error joining group');
      return false;
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return {
    groups,
    loading,
    createGroup,
    joinGroup,
    refetch: fetchGroups
  };
};
