
import React from 'react';
import PremiumGate from '@/components/premium/PremiumGate';
import GatewayPortal from './GatewayPortal';
import { useLanguage } from '@/contexts/LanguageContext';
import { gatewayConfigs, mockActiveGroups } from '@/config/gateways';

const ProcurementGateway = () => {
  const { language } = useLanguage();
  const config = gatewayConfigs.find(g => g.id === 'procurement')!;
  const activeGroups = mockActiveGroups.procurement;

  return (
    <PremiumGate feature={language === 'ar' ? 'بوابة المشتريات' : 'Procurement Gateway'}>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <GatewayPortal 
            config={config}
            activeGroups={activeGroups}
          />
        </div>
      </div>
    </PremiumGate>
  );
};

export default ProcurementGateway;
