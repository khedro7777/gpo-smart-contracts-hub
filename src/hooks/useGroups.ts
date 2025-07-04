
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

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
}

export interface CreateGroupData {
  name: string;
  description?: string;
  type: string;
  service_gateway: string;
  business_objective?: string;
}

export const useGroups = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();

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
          status: 'active'
        }])
        .select()
        .single();

      if (error) throw error;
      
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

      const { error } = await supabase
        .from('group_members')
        .insert([{
          group_id: groupId,
          user_id: user.id,
          role: 'member'
        }]);

      if (error) throw error;
      
      toast.success(language === 'ar' ? 'تم الانضمام للمجموعة بنجاح' : 'Joined group successfully');
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
