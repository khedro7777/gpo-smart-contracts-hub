
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

export interface UserPoints {
  id: string;
  user_id: string;
  total_points: number;
  held_points: number;
  available_points: number;
  created_at: string;
  updated_at: string;
}

export interface PointTransaction {
  id: string;
  user_id: string;
  group_id: string | null;
  amount: number;
  type: 'hold' | 'release' | 'deduct' | 'earn';
  description: string | null;
  created_at: string;
}

export const useUserPoints = () => {
  const [userPoints, setUserPoints] = useState<UserPoints | null>(null);
  const [transactions, setTransactions] = useState<PointTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();

  const fetchUserPoints = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .rpc('get_user_points', { p_user_id: user.id });

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      // The RPC function returns an array, but we expect a single record
      const pointsData = Array.isArray(data) && data.length > 0 ? data[0] : null;
      setUserPoints(pointsData as UserPoints | null);
    } catch (error) {
      console.error('Error fetching user points:', error);
      toast.error(language === 'ar' ? 'خطأ في تحميل النقاط' : 'Error loading points');
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactions = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .rpc('get_point_transactions', { p_user_id: user.id });

      if (error) throw error;
      setTransactions((data as PointTransaction[]) || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const managePoints = async (
    groupId: string,
    amount: number,
    action: 'hold' | 'release' | 'deduct',
    description?: string
  ) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error(language === 'ar' ? 'يجب تسجيل الدخول أولاً' : 'Please login first');
        return false;
      }

      const { data, error } = await supabase.rpc('manage_user_points', {
        p_user_id: user.id,
        p_group_id: groupId,
        p_amount: amount,
        p_action: action,
        p_description: description
      });

      if (error) throw error;

      if (data) {
        await fetchUserPoints();
        await fetchTransactions();
        return true;
      } else {
        toast.error(language === 'ar' ? 'نقاط غير كافية' : 'Insufficient points');
        return false;
      }
    } catch (error) {
      console.error('Error managing points:', error);
      toast.error(language === 'ar' ? 'خطأ في إدارة النقاط' : 'Error managing points');
      return false;
    }
  };

  useEffect(() => {
    fetchUserPoints();
    fetchTransactions();
  }, []);

  return {
    userPoints,
    transactions,
    loading,
    managePoints,
    refetch: () => {
      fetchUserPoints();
      fetchTransactions();
    }
  };
};
