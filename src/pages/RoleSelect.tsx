
import React from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/utils/translations';
import RoleSelector from '@/components/RoleSelector';
import GPOMachine from '@/components/GPOMachine';

const RoleSelect = () => {
  const { language } = useLanguage();
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-center mb-8">
          {t('selectRole', language)}
        </h1>
        
        <div className="max-w-4xl mx-auto">
          <RoleSelector />
        </div>
      </div>
      
      <GPOMachine />
    </Layout>
  );
};

export default RoleSelect;
