
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
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
  Settings,
  Plus,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ClientDashboard = () => {
  const { language } = useLanguage();
  const { groups, contracts, invoices, loading } = useClientData();
  const { userPoints } = useUserPoints();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

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

  // Mock contract data for the contracts tab
  const mockContracts = [
    {
      id: '1',
      title: language === 'ar' ? 'عقد شراء معدات المكاتب' : 'Office Equipment Purchase Contract',
      status: 'active',
      amount: '$15,000',
      startDate: '2024-01-15',
      endDate: '2024-12-15',
      supplier: language === 'ar' ? 'الشركة العربية للمعدات' : 'Arab Equipment Co.'
    },
    {
      id: '2',
      title: language === 'ar' ? 'عقد خدمات التسويق الرقمي' : 'Digital Marketing Services Contract',
      status: 'pending',
      amount: '$8,500',
      startDate: '2024-02-01',
      endDate: '2024-07-31',
      supplier: language === 'ar' ? 'وكالة التسويق المتقدم' : 'Advanced Marketing Agency'
    }
  ];

  // Mock invoice data
  const mockInvoices = [
    {
      id: '1',
      number: 'INV-2024-001',
      amount: '$2,500',
      dueDate: '2024-01-30',
      status: 'pending',
      description: language === 'ar' ? 'فاتورة معدات المكاتب' : 'Office Equipment Invoice'
    },
    {
      id: '2',
      number: 'INV-2024-002',
      amount: '$1,200',
      dueDate: '2024-01-15',
      status: 'paid',
      description: language === 'ar' ? 'فاتورة خدمات التسويق' : 'Marketing Services Invoice'
    }
  ];

  return (
    <DashboardLayout role="client">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">
            {language === 'ar' ? 'لوحة تحكم العميل' : 'Client Dashboard'}
          </h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder={language === 'ar' ? 'البحث...' : 'Search...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button onClick={() => navigate('/groups')}>
              <Plus className="h-4 w-4 mr-2" />
              {language === 'ar' ? 'مجموعة جديدة' : 'New Group'}
            </Button>
          </div>
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
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              {language === 'ar' ? 'الإعدادات' : 'Settings'}
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
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                  {language === 'ar' ? 'إدارة العقود' : 'Contract Management'}
                </h2>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  {language === 'ar' ? 'عقد جديد' : 'New Contract'}
                </Button>
              </div>

              <div className="grid gap-4">
                {mockContracts.map((contract) => (
                  <Card key={contract.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">{contract.title}</h3>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600">
                            <div>
                              <span className="font-medium">
                                {language === 'ar' ? 'المورد:' : 'Supplier:'}
                              </span>
                              <p>{contract.supplier}</p>
                            </div>
                            <div>
                              <span className="font-medium">
                                {language === 'ar' ? 'المبلغ:' : 'Amount:'}
                              </span>
                              <p>{contract.amount}</p>
                            </div>
                            <div>
                              <span className="font-medium">
                                {language === 'ar' ? 'المدة:' : 'Duration:'}
                              </span>
                              <p>{contract.startDate} - {contract.endDate}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            contract.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {contract.status === 'active' 
                              ? (language === 'ar' ? 'نشط' : 'Active')
                              : (language === 'ar' ? 'معلق' : 'Pending')
                            }
                          </span>
                          <Button variant="outline" size="sm">
                            {language === 'ar' ? 'عرض' : 'View'}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="invoices" className="mt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                  {language === 'ar' ? 'إدارة الفواتير' : 'Invoice Management'}
                </h2>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  {language === 'ar' ? 'فاتورة جديدة' : 'New Invoice'}
                </Button>
              </div>

              <div className="grid gap-4">
                {mockInvoices.map((invoice) => (
                  <Card key={invoice.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-2">
                            <h3 className="font-semibold text-lg">{invoice.number}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              invoice.status === 'paid' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {invoice.status === 'paid' 
                                ? (language === 'ar' ? 'مدفوع' : 'Paid')
                                : (language === 'ar' ? 'معلق' : 'Pending')
                              }
                            </span>
                          </div>
                          <p className="text-gray-600 mb-2">{invoice.description}</p>
                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                            <div>
                              <span className="font-medium">
                                {language === 'ar' ? 'المبلغ:' : 'Amount:'}
                              </span>
                              <p className="text-lg font-semibold text-gray-900">{invoice.amount}</p>
                            </div>
                            <div>
                              <span className="font-medium">
                                {language === 'ar' ? 'تاريخ الاستحقاق:' : 'Due Date:'}
                              </span>
                              <p>{invoice.dueDate}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            {language === 'ar' ? 'تنزيل' : 'Download'}
                          </Button>
                          {invoice.status === 'pending' && (
                            <Button size="sm">
                              {language === 'ar' ? 'دفع' : 'Pay'}
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <ClientAnalytics />
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">
                {language === 'ar' ? 'إعدادات الحساب' : 'Account Settings'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">
                      {language === 'ar' ? 'المعلومات الشخصية' : 'Personal Information'}
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {language === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                        </label>
                        <Input placeholder={language === 'ar' ? 'أدخل الاسم' : 'Enter name'} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                        </label>
                        <Input type="email" placeholder={language === 'ar' ? 'أدخل البريد' : 'Enter email'} />
                      </div>
                      <Button className="w-full">
                        {language === 'ar' ? 'حفظ التغييرات' : 'Save Changes'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">
                      {language === 'ar' ? 'إعدادات الإشعارات' : 'Notification Settings'}
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>{language === 'ar' ? 'إشعارات البريد' : 'Email Notifications'}</span>
                        <input type="checkbox" className="toggle" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>{language === 'ar' ? 'إشعارات التصويت' : 'Voting Alerts'}</span>
                        <input type="checkbox" className="toggle" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>{language === 'ar' ? 'تحديثات المجموعات' : 'Group Updates'}</span>
                        <input type="checkbox" className="toggle" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ClientDashboard;
