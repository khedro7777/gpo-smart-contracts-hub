
import React from 'react';
import Layout from '@/components/layout/Layout';
import PremiumGate from '@/components/premium/PremiumGate';
import GatewayCard from '@/components/gateways/GatewayCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { gatewayConfigs, mockActiveGroups } from '@/config/gateways';

const GatewaysPage = () => {
  const { language } = useLanguage();

  return (
    <PremiumGate feature={language === 'ar' ? 'البوابات' : 'Gateways'}>
      <Layout>
        <div className="min-h-screen bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {language === 'ar' ? 'بوابات الخدمات' : 'Service Gateways'}
              </h1>
              <p className="text-gray-600">
                {language === 'ar' 
                  ? 'اختر البوابة المناسبة لاحتياجاتك التجارية'
                  : 'Choose the right gateway for your business needs'
                }
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {gatewayConfigs.map((config) => (
                <GatewayCard 
                  key={config.id}
                  config={config}
                  activeGroupsCount={mockActiveGroups[config.id as keyof typeof mockActiveGroups]?.length || 0}
                />
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </PremiumGate>
  );
};

export default GatewaysPage;
