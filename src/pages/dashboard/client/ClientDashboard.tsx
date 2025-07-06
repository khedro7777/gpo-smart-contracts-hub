
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ClientOverview from '@/components/dashboard/client/ClientOverview';
import PremiumGate from '@/components/premium/PremiumGate';
import { useLanguage } from '@/contexts/LanguageContext';

const ClientDashboard = () => {
  const { language } = useLanguage();

  // Mock data for ClientOverview props
  const stats = {
    activeGroups: 3,
    activeContracts: 8,
    pendingInvoices: 2,
    availablePoints: 1250
  };

  const recentActivities = [
    {
      id: '1',
      type: 'group_joined',
      title: language === 'ar' ? 'انضممت إلى مجموعة الشراء التقني' : 'Joined Tech Procurement Group',
      timestamp: new Date().toISOString(),
      status: 'completed'
    },
    {
      id: '2',
      type: 'contract_signed',
      title: language === 'ar' ? 'تم توقيع عقد جديد' : 'New contract signed',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      status: 'completed'
    },
    {
      id: '3',
      type: 'invoice_pending',
      title: language === 'ar' ? 'فاتورة في انتظار الدفع' : 'Invoice pending payment',
      timestamp: new Date(Date.now() - 172800000).toISOString(),
      status: 'pending'
    },
    {
      id: '4',
      type: 'voting_urgent',
      title: language === 'ar' ? 'تصويت عاجل مطلوب' : 'Urgent voting required',
      timestamp: new Date(Date.now() - 259200000).toISOString(),
      status: 'urgent'
    }
  ];

  return (
    <PremiumGate feature={language === 'ar' ? 'لوحة تحكم العميل' : 'Client Dashboard'}>
      <DashboardLayout role="client">
        <ClientOverview stats={stats} recentActivities={recentActivities} />
      </DashboardLayout>
    </PremiumGate>
  );
};

export default ClientDashboard;
