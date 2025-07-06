
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ClientOverview from '@/components/dashboard/client/ClientOverview';
import PremiumGate from '@/components/premium/PremiumGate';
import { useLanguage } from '@/contexts/LanguageContext';

const ClientDashboard = () => {
  const { language } = useLanguage();

  return (
    <PremiumGate feature={language === 'ar' ? 'لوحة تحكم العميل' : 'Client Dashboard'}>
      <DashboardLayout role="client">
        <ClientOverview />
      </DashboardLayout>
    </PremiumGate>
  );
};

export default ClientDashboard;
