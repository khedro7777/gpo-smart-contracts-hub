
import React from 'react';
import GPOWorkspace from '@/components/gpo/GPOWorkspace';
import ProfessionalHeader from '@/components/gpo/ProfessionalHeader';
import MCPIntelligenceHub from '@/components/gpo/MCPIntelligenceHub';
import { useLanguage } from '@/contexts/LanguageContext';

const GPOWorkspacePage = () => {
  const { direction } = useLanguage();
  
  return (
    <div className={`min-h-screen bg-gray-50 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
      <ProfessionalHeader />
      <GPOWorkspace 
        activeGroups={12}
        totalContracts={45}
        monthlyVolume={2500000}
        successRate={94}
      />
      <MCPIntelligenceHub />
    </div>
  );
};

export default GPOWorkspacePage;
