
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

export interface GroupDiscussion {
  id: string;
  group_id: string;
  user_id: string;
  message: string;
  message_type: 'general' | 'suggestion' | 'complaint' | 'admin_notice';
  parent_id: string | null;
  created_at: string;
  updated_at: string;
}

export const useGroupDiscussions = (groupId?: string) => {
  const [discussions, setDiscussions] = useState<GroupDiscussion[]>([]);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();

  const fetchDiscussions = async () => {
    if (!groupId) return;

    try {
      const { data, error } = await supabase
        .rpc('get_group_discussions', { p_group_id: groupId });

      if (error) throw error;
      setDiscussions(data || []);
    } catch (error) {
      console.error('Error fetching discussions:', error);
      toast.error(language === 'ar' ? 'خطأ في تحميل المناقشات' : 'Error loading discussions');
    } finally {
      setLoading(false);
    }
  };

  const postMessage = async (
    message: string,
    messageType: 'general' | 'suggestion' | 'complaint' | 'admin_notice' = 'general',
    parentId?: string
  ) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || !groupId) {
        toast.error(language === 'ar' ? 'يجب تسجيل الدخول أولاً' : 'Please login first');
        return null;
      }

      const { data, error } = await supabase
        .rpc('create_group_discussion', {
          p_group_id: groupId,
          p_user_id: user.id,
          p_message: message,
          p_message_type: messageType,
          p_parent_id: parentId || null
        });

      if (error) throw error;

      toast.success(language === 'ar' ? 'تم إرسال الرسالة بنجاح' : 'Message sent successfully');
      await fetchDiscussions();
      return data;
    } catch (error) {
      console.error('Error posting message:', error);
      toast.error(language === 'ar' ? 'خطأ في إرسال الرسالة' : 'Error posting message');
      return null;
    }
  };

  useEffect(() => {
    fetchDiscussions();
  }, [groupId]);

  return {
    discussions,
    loading,
    postMessage,
    refetch: fetchDiscussions
  };
};
