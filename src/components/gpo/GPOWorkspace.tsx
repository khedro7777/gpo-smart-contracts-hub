
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import PremiumGate from '@/components/premium/PremiumGate';
import WorkspaceHeader from './workspace/WorkspaceHeader';
import QuickStatsGrid from './workspace/QuickStatsGrid';
import WorkspaceTabs from './workspace/WorkspaceTabs';
import ActiveNegotiationsList from './workspace/ActiveNegotiationsList';
import RecentActivitiesList from './workspace/RecentActivitiesList';
import { 
  Users, 
  FileText, 
  TrendingUp, 
  DollarSign,
  BarChart3,
  Activity
} from 'lucide-react';

interface GPOWorkspaceProps {
  activeGroups: number;
  totalContracts: number;
  monthlyVolume: number;
  successRate: number;
}

const GPOWorkspace: React.FC<GPOWorkspaceProps> = ({
  activeGroups,
  totalContracts,
  monthlyVolume,
  successRate
}) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <PremiumGate feature={language === 'ar' ? 'GPO مساحة العمل' : 'GPO Workspace'}>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <WorkspaceHeader />
          
          <QuickStatsGrid 
            activeGroups={activeGroups}
            totalContracts={totalContracts}
            monthlyVolume={monthlyVolume}
            successRate={successRate}
          />
          
          <WorkspaceTabs activeTab={activeTab} onTabChange={setActiveTab} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <ActiveNegotiationsList />
            <RecentActivitiesList />
          </div>
        </div>
      </div>
    </PremiumGate>
  );
};

export default GPOWorkspace;
