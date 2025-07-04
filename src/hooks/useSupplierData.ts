
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

export interface SupplierGroup {
  id: string;
  name: string;
  description: string;
  type: string;
  status: string;
  member_count?: number;
  created_at: string;
}

export interface SupplierContract {
  id: string;
  title: string;
  status: string;
  group_id: string;
  created_at: string;
  updated_at: string;
}

export interface SupplierRFQ {
  id: string;
  group_id: string;
  title: string;
  description: string;
  status: string;
  deadline: string;
  created_at: string;
}

export const useSupplierData = () => {
  const [groups, setGroups] = useState<SupplierGroup[]>([]);
  const [contracts, setContracts] = useState<SupplierContract[]>([]);
  const [rfqs, setRfqs] = useState<SupplierRFQ[]>([]);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();

  const fetchSupplierGroups = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get groups where user is a member
      const { data: memberGroups, error: memberError } = await supabase
        .from('group_members')
        .select(`
          group_id,
          groups (
            id,
            name,
            description,
            type,
            status,
            created_at
          )
        `)
        .eq('user_id', user.id)
        .eq('status', 'active');

      if (memberError) throw memberError;

      const supplierGroups = memberGroups?.map(mg => ({
        id: mg.groups.id,
        name: mg.groups.name,
        description: mg.groups.description || '',
        type: mg.groups.type,
        status: mg.groups.status,
        created_at: mg.groups.created_at
      })) || [];

      setGroups(supplierGroups);
    } catch (error) {
      console.error('Error fetching supplier groups:', error);
      toast.error(language === 'ar' ? 'خطأ في تحميل المجموعات' : 'Error loading groups');
    }
  };

  const fetchSupplierContracts = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('contracts')
        .select('*')
        .eq('created_by', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContracts(data || []);
    } catch (error) {
      console.error('Error fetching contracts:', error);
      toast.error(language === 'ar' ? 'خطأ في تحميل العقود' : 'Error loading contracts');
    }
  };

  const fetchSupplierRFQs = async () => {
    try {
      // Mock RFQ data - in real implementation, this would come from a voting_sessions or proposals table
      const mockRFQs: SupplierRFQ[] = [
        {
          id: '1',
          group_id: 'group-1',
          title: language === 'ar' ? 'طلب عرض: معدات مكتبية' : 'RFQ: Office Equipment',
          description: language === 'ar' ? 'طلب عروض أسعار لمعدات مكتبية متنوعة' : 'Request for quotation for various office equipment',
          status: 'pending',
          deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          group_id: 'group-2',
          title: language === 'ar' ? 'طلب عرض: أجهزة تقنية' : 'RFQ: IT Hardware',
          description: language === 'ar' ? 'طلب عروض أسعار لأجهزة حاسب وشبكات' : 'Request for quotation for computers and networking equipment',
          status: 'responded',
          deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
          created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
        }
      ];
      setRfqs(mockRFQs);
    } catch (error) {
      console.error('Error fetching RFQs:', error);
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      await Promise.all([
        fetchSupplierGroups(),
        fetchSupplierContracts(),
        fetchSupplierRFQs()
      ]);
      setLoading(false);
    };

    fetchAllData();
  }, []);

  return {
    groups,
    contracts,
    rfqs,
    loading,
    refetch: () => {
      fetchSupplierGroups();
      fetchSupplierContracts();
      fetchSupplierRFQs();
    }
  };
};
