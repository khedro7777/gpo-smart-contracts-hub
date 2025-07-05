
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useClientData } from '@/hooks/useClientData';
import { useUserPoints } from '@/hooks/useUserPoints';
import { 
  Users, 
  FileText, 
  DollarSign, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Building
} from 'lucide-react';

const ClientDashboard = () => {
  const { language } = useLanguage();
  const { groups, contracts, invoices, loading } = useClientData();
  const { userPoints } = useUserPoints();

  const getStatusBadge = (status: string) => {
    const statusMap = {
      active: { color: 'bg-green-100 text-green-800', text: language === 'ar' ? 'نشط' : 'Active' },
      pending: { color: 'bg-yellow-100 text-yellow-800', text: language === 'ar' ? 'معلق' : 'Pending' },
      completed: { color: 'bg-blue-100 text-blue-800', text: language === 'ar' ? 'مكتمل' : 'Completed' },
      draft: { color: 'bg-gray-100 text-gray-800', text: language === 'ar' ? 'مسودة' : 'Draft' },
      paid: { color: 'bg-green-100 text-green-800', text: language === 'ar' ? 'مدفوع' : 'Paid' },
      overdue: { color: 'bg-red-100 text-red-800', text: language === 'ar' ? 'متأخر' : 'Overdue' }
    };
    
    const statusInfo = statusMap[status as keyof typeof statusMap] || statusMap.pending;
    return <Badge className={statusInfo.color}>{statusInfo.text}</Badge>;
  };

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

  return (
    <DashboardLayout role="client">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900">
            {language === 'ar' ? 'لوحة تحكم العميل' : 'Client Dashboard'}
          </h2>
          <Button className="bg-blue-600 hover:bg-blue-700">
            {language === 'ar' ? 'إنشاء مجموعة جديدة' : 'Create New Group'}
          </Button>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {language === 'ar' ? 'المجموعات النشطة' : 'Active Groups'}
              </CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.activeGroups}</div>
              <CardDescription>
                {language === 'ar' ? 'مجموعات نشطة' : 'Active groups'}
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {language === 'ar' ? 'العقود النشطة' : 'Active Contracts'}
              </CardTitle>
              <FileText className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.activeContracts}</div>
              <CardDescription>
                {language === 'ar' ? 'عقود قيد التنفيذ' : 'Contracts in progress'}
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {language === 'ar' ? 'الفواتير المعلقة' : 'Pending Invoices'}
              </CardTitle>
              <AlertCircle className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.pendingInvoices}</div>
              <CardDescription>
                {language === 'ar' ? 'فواتير تنتظر الدفع' : 'Invoices awaiting payment'}
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {language === 'ar' ? 'النقاط المتاحة' : 'Available Points'}
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{stats.availablePoints}</div>
              <CardDescription>
                {language === 'ar' ? 'نقاط للاستخدام' : 'Points to use'}
              </CardDescription>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Active Groups */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5 text-blue-600" />
                {language === 'ar' ? 'المجموعات النشطة' : 'Active Groups'}
              </CardTitle>
              <CardDescription>
                {language === 'ar' ? 'المجموعات التي أنت جزء منها' : 'Groups you are part of'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {groups.length > 0 ? groups.slice(0, 3).map((group) => (
                  <div key={group.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{group.name}</h4>
                      <p className="text-sm text-gray-500 mt-1">{group.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        {getStatusBadge(group.status)}
                        <span className="text-xs text-gray-400">
                          {language === 'ar' ? 'المرحلة:' : 'Phase:'} {group.current_phase}
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      {language === 'ar' ? 'عرض' : 'View'}
                    </Button>
                  </div>
                )) : (
                  <div className="text-center py-8 text-gray-500">
                    <Building className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>{language === 'ar' ? 'لم تنضم إلى أي مجموعة بعد' : 'No groups joined yet'}</p>
                    <Button variant="outline" className="mt-2">
                      {language === 'ar' ? 'استكشف المجموعات' : 'Explore Groups'}
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-green-600" />
                {language === 'ar' ? 'النشاط الأخير' : 'Recent Activity'}
              </CardTitle>
              <CardDescription>
                {language === 'ar' ? 'آخر الأنشطة والتحديثات' : 'Latest activities and updates'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {language === 'ar' ? 'تم توقيع عقد المجموعة' : 'Group contract signed'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {language === 'ar' ? 'منذ يومين' : '2 days ago'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <Users className="h-5 w-5 text-blue-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {language === 'ar' ? 'دعوة مجموعة جديدة' : 'New group invitation'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {language === 'ar' ? 'منذ 3 أيام' : '3 days ago'}
                    </p>
                  </div>
                  <Badge variant="secondary">
                    {language === 'ar' ? 'جديد' : 'New'}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                  <DollarSign className="h-5 w-5 text-orange-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {language === 'ar' ? 'تم استلام فاتورة' : 'Invoice received'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {language === 'ar' ? 'منذ 5 أيام' : '5 days ago'}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contracts and Invoices */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Contracts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-purple-600" />
                {language === 'ar' ? 'العقود الأخيرة' : 'Recent Contracts'}
              </CardTitle>
              <CardDescription>
                {language === 'ar' ? 'العقود التي أنشأتها أو وقعت عليها' : 'Contracts you created or signed'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contracts.length > 0 ? contracts.slice(0, 3).map((contract) => (
                  <div key={contract.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{contract.title}</h4>
                      <div className="flex items-center gap-2 mt-2">
                        {getStatusBadge(contract.status)}
                        <span className="text-xs text-gray-400">
                          {language === 'ar' ? 'أنشئ في:' : 'Created:'} {new Date(contract.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      {language === 'ar' ? 'عرض' : 'View'}
                    </Button>
                  </div>
                )) : (
                  <div className="text-center py-8 text-gray-500">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>{language === 'ar' ? 'لا توجد عقود بعد' : 'No contracts yet'}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recent Invoices */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                {language === 'ar' ? 'الفواتير الأخيرة' : 'Recent Invoices'}
              </CardTitle>
              <CardDescription>
                {language === 'ar' ? 'الفواتير والمدفوعات الأخيرة' : 'Recent invoices and payments'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {invoices.length > 0 ? invoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">
                          ${invoice.amount.toLocaleString()}
                        </span>
                        {getStatusBadge(invoice.status)}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {language === 'ar' ? 'تاريخ الاستحقاق:' : 'Due:'} {new Date(invoice.due_date).toLocaleDateString()}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      {invoice.status === 'pending' 
                        ? (language === 'ar' ? 'ادفع' : 'Pay')
                        : (language === 'ar' ? 'عرض' : 'View')
                      }
                    </Button>
                  </div>
                )) : (
                  <div className="text-center py-8 text-gray-500">
                    <DollarSign className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>{language === 'ar' ? 'لا توجد فواتير' : 'No invoices'}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClientDashboard;
