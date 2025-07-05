import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import { useClientData } from '@/hooks/useClientData';
import { useUserPoints } from '@/hooks/useUserPoints';
import { useNavigate } from 'react-router-dom';
import ClientOverview from '@/components/dashboard/client/ClientOverview';
import ClientGroupsOverview from '@/components/dashboard/client/ClientGroupsOverview';
import ClientAnalytics from '@/components/dashboard/client/ClientAnalytics';
import { 
  Home,
  Users, 
  FileText, 
  DollarSign, 
  BarChart3,
  MessageSquare,
  Vote
} from 'lucide-react';

const ClientDashboard = () => {
  const { language } = useLanguage();
  const { groups, contracts, invoices, loading } = useClientData();
  const { userPoints } = useUserPoints();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  if (loading) {
    return (
      <DashboardLayout role="client">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">{language === 'ar' ? 'جاري التحميل...' : 'Loading...'}</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const stats = {
    activeGroups: groups.filter(group => group.status === 'active').length,
    activeContracts: contracts.filter(contract => contract.status === 'active').length,
    pendingInvoices: invoices.filter(invoice => invoice.status === 'pending').length,
    availablePoints: userPoints?.available_points || 0
  };

  // Mock recent activities data
  const recentActivities = [
    {
      id: '1',
      type: 'contract',
      title: language === 'ar' ? 'تم توقيع عقد المجموعة الذكية' : 'Smart Group Contract Signed',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'completed'
    },
    {
      id: '2',
      type: 'group',
      title: language === 'ar' ? 'دعوة مجموعة التقنية المالية' : 'FinTech Group Invitation',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'pending'
    },
    {
      id: '3',
      type: 'payment',
      title: language === 'ar' ? 'فاتورة مستحقة للدفع' : 'Invoice Due for Payment',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'urgent'
    }
  ];

  const handleGroupSelect = (groupId: string) => {
    navigate(`/groups/${groupId}/room`);
  };

  return (
    <DashboardLayout role="client">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">
            {language === 'ar' ? 'لوحة تحكم العميل' : 'Client Dashboard'}
          </h1>
        </div>
        
        {/* Main Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              {language === 'ar' ? 'نظرة عامة' : 'Overview'}
            </TabsTrigger>
            <TabsTrigger value="groups" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              {language === 'ar' ? 'المجموعات' : 'Groups'}
            </TabsTrigger>
            <TabsTrigger value="contracts" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              {language === 'ar' ? 'العقود' : 'Contracts'}
            </TabsTrigger>
            <TabsTrigger value="invoices" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              {language === 'ar' ? 'الفواتير' : 'Invoices'}
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              {language === 'ar' ? 'التحليلات' : 'Analytics'}
            </TabsTrigger>
            <TabsTrigger value="discussions" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              {language === 'ar' ? 'المناقشات' : 'Discussions'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <ClientOverview 
              stats={stats}
              recentActivities={recentActivities}
            />
          </TabsContent>

          <TabsContent value="groups" className="mt-6">
            <ClientGroupsOverview 
              groups={groups}
              onGroupSelect={handleGroupSelect}
            />
          </TabsContent>

          <TabsContent value="contracts" className="mt-6">
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                {language === 'ar' ? 'إدارة العقود قيد التطوير' : 'Contract management under development'}
              </p>
            </div>
          </TabsContent>

          <TabsContent value="invoices" className="mt-6">
            <div className="text-center py-8">
              <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                {language === 'ar' ? 'إدارة الفواتير قيد التطوير' : 'Invoice management under development'}
              </p>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <ClientAnalytics />
          </TabsContent>

          <TabsContent value="discussions" className="mt-6">
            <div className="text-center py-8">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                {language === 'ar' ? 'منطقة المناقشات قيد التطوير' : 'Discussions area under development'}
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ClientDashboard;
