
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import QuickStatsGrid from './workspace/QuickStatsGrid';
import WorkspaceHeader from './workspace/WorkspaceHeader';
import WorkspaceTabs from './workspace/WorkspaceTabs';

interface WorkspaceProps {
  activeGroups: number;
  totalContracts: number;
  monthlyVolume: number;
  successRate: number;
}

const GPOWorkspace: React.FC<WorkspaceProps> = ({
  activeGroups = 12,
  totalContracts = 45,
  monthlyVolume = 2500000,
  successRate = 94
}) => {
  const { i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <WorkspaceHeader />
        
        <QuickStatsGrid
          activeGroups={activeGroups}
          totalContracts={totalContracts}
          monthlyVolume={monthlyVolume}
          successRate={successRate}
        />

        <WorkspaceTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
};

export default GPOWorkspace;
