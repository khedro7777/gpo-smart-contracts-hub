
import React from 'react';
import Layout from '@/components/layout/Layout';
import DiscoverGroups from '@/components/groups/DiscoverGroups';
import PremiumGate from '@/components/premium/PremiumGate';
import { useLanguage } from '@/contexts/LanguageContext';

const GroupsPage = () => {
  const { language } = useLanguage();

  return (
    <PremiumGate feature={language === 'ar' ? 'المجموعات' : 'Groups'}>
      <Layout>
        <div className="min-h-screen bg-gray-50">
          <DiscoverGroups />
        </div>
      </Layout>
    </PremiumGate>
  );
};

export default GroupsPage;
