
import React from 'react';
import Layout from '@/components/layout/Layout';
import GatewayPortal from '@/components/gateways/GatewayPortal';
import PremiumGate from '@/components/premium/PremiumGate';
import { useLanguage } from '@/contexts/LanguageContext';

const GatewaysPage = () => {
  const { language } = useLanguage();

  return (
    <PremiumGate feature={language === 'ar' ? 'البوابات' : 'Gateways'}>
      <Layout>
        <GatewayPortal />
      </Layout>
    </PremiumGate>
  );
};

export default GatewaysPage;
