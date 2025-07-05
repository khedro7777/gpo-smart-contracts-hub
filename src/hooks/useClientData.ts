
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

export interface ClientGroup {
  id: string;
  name: string;
  description: string;
  type: string;
  status: string;
  member_count?: number;
  created_at: string;
  current_phase: string;
}

export interface ClientContract {
  id: string;
  title: string;
  status: string;
  group_id: string;
  created_at: string;
  updated_at: string;
}

export interface ClientInvoice {
  id: string;
  amount: number;
  status: string;
  due_date: string;
  created_at: string;
}

export const useClientData = () => {
  const [groups, setGroups] = useState<ClientGroup[]>([]);
  const [contracts, setContracts] = useState<ClientContract[]>([]);
  const [invoices, setInvoices] = useState<ClientInvoice[]>([]);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();

  const fetchClientGroups = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get groups where user is a member or creator
      const { data: userGroups, error } = await supabase
        .from('groups')
        .select('*')
        .or(`creator_id.eq.${user.id},admins.cs.{${user.id}}`)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const clientGroups = userGroups?.map(group => ({
        id: group.id,
        name: group.name,
        description: group.description || '',
        type: group.type,
        status: group.status,
        created_at: group.created_at,
        current_phase: group.current_phase || 'initial'
      })) || [];

      setGroups(clientGroups);
    } catch (error) {
      console.error('Error fetching client groups:', error);
      toast.error(language === 'ar' ? 'خطأ في تحميل المجموعات' : 'Error loading groups');
    }
  };

  const fetchClientContracts = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('contracts')
        .select('*')
        .eq('created_by', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setContracts(data || []);
    } catch (error) {
      console.error('Error fetching contracts:', error);
      toast.error(language === 'ar' ? 'خطأ في تحميل العقود' : 'Error loading contracts');
    }
  };

  const fetchClientInvoices = async () => {
    try {
      // Mock invoice data - في التطبيق الحقيقي، سيكون هناك جدول للفواتير
      const mockInvoices: ClientInvoice[] = [
        {
          id: '1',
          amount: 1500,
          status: 'pending',
          due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          amount: 2800,
          status: 'paid',
          due_date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
        }
      ];
      setInvoices(mockInvoices);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      await Promise.all([
        fetchClientGroups(),
        fetchClientContracts(),
        fetchClientInvoices()
      ]);
      setLoading(false);
    };

    fetchAllData();
  }, []);

  return {
    groups,
    contracts,
    invoices,
    loading,
    refetch: () => {
      fetchClientGroups();
      fetchClientContracts();
      fetchClientInvoices();
    }
  };
};
