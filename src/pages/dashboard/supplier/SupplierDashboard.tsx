
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSupplierData } from '@/hooks/useSupplierData';
import { useUserPoints } from '@/hooks/useUserPoints';
import { 
  Users, 
  FileText, 
  Clock, 
  CheckCircle, 
  DollarSign,
  TrendingUp,
  Package,
  Award
} from 'lucide-react';

const SupplierDashboard = () => {
  const { language } = useLanguage();
  const { groups, contracts, rfqs, loading } = useSupplierData();
  const { userPoints } = useUserPoints();

  const getStatusBadge = (status: string) => {
    const statusMap = {
      active: { color: 'bg-green-100 text-green-800', text: language === 'ar' ? 'نشط' : 'Active' },
      pending: { color: 'bg-yellow-100 text-yellow-800', text: language === 'ar' ? 'معلق' : 'Pending' },
      completed: { color: 'bg-blue-100 text-blue-800', text: language === 'ar' ? 'مكتمل' : 'Completed' },
      draft: { color: 'bg-gray-100 text-gray-800', text: language === 'ar' ? 'مسودة' : 'Draft' },
      responded: { color: 'bg-purple-100 text-purple-800', text: language === 'ar' ? 'تم الرد' : 'Responded' }
    };
    
    const statusInfo = statusMap[status as keyof typeof statusMap] || statusMap.pending;
    return <Badge className={statusInfo.color}>{statusInfo.text}</Badge>;
  };

  if (loading) {
    return (
      <DashboardLayout role="supplier">
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
    activeRFQs: rfqs.filter(rfq => rfq.status === 'pending').length,
    activeContracts: contracts.filter(contract => contract.status === 'active').length,
    totalGroups: groups.length,
    availablePoints: userPoints?.available_points || 0
  };

  return (
    <DashboardLayout role="supplier">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900">
            {language === 'ar' ? 'لوحة تحكم المورد' : 'Supplier Dashboard'}
          </h2>
          <Button className="bg-blue-600 hover:bg-blue-700">
            {language === 'ar' ? 'إنشاء عرض جديد' : 'Create New Offer'}
          </Button>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {language === 'ar' ? 'طلبات العروض النشطة' : 'Active RFQs'}
              </CardTitle>
              <FileText className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.activeRFQs}</div>
              <CardDescription>
                {language === 'ar' ? 'طلبات تحتاج للرد' : 'Requests need response'}
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {language === 'ar' ? 'العقود النشطة' : 'Active Contracts'}
              </CardTitle>
              <Award className="h-4 w-4 text-green-600" />
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
                {language === 'ar' ? 'المجموعات' : 'Groups'}
              </CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{stats.totalGroups}</div>
              <CardDescription>
                {language === 'ar' ? 'مجموعات نشطة' : 'Active groups'}
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {language === 'ar' ? 'النقاط المتاحة' : 'Available Points'}
              </CardTitle>
              <DollarSign className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.availablePoints}</div>
              <CardDescription>
                {language === 'ar' ? 'نقاط للاستخدام' : 'Points to use'}
              </CardDescription>
            </CardContent>
          </Card>
        </div>
        
        {/* Recent RFQs and Groups */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                {language === 'ar' ? 'طلبات العروض الأخيرة' : 'Recent RFQs'}
              </CardTitle>
              <CardDescription>
                {language === 'ar' ? 'طلبات عروض الأسعار التي تحتاج ردك' : 'RFQs that need your response'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {rfqs.length > 0 ? rfqs.map((rfq) => (
                  <div key={rfq.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{rfq.title}</h4>
                      <p className="text-sm text-gray-500 mt-1">{rfq.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        {getStatusBadge(rfq.status)}
                        <span className="text-xs text-gray-400">
                          {language === 'ar' ? 'الموعد النهائي:' : 'Deadline:'} {new Date(rfq.deadline).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      {rfq.status === 'pending' 
                        ? (language === 'ar' ? 'رد' : 'Respond')
                        : (language === 'ar' ? 'عرض' : 'View')
                      }
                    </Button>
                  </div>
                )) : (
                  <div className="text-center py-8 text-gray-500">
                    <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>{language === 'ar' ? 'لا توجد طلبات عروض حاليًا' : 'No RFQs available'}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-600" />
                {language === 'ar' ? 'المجموعات النشطة' : 'Active Groups'}
              </CardTitle>
              <CardDescription>
                {language === 'ar' ? 'المجموعات التي أنت عضو فيها' : 'Groups you are a member of'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {groups.length > 0 ? groups.map((group) => (
                  <div key={group.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{group.name}</h4>
                      <p className="text-sm text-gray-500 mt-1">{group.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        {getStatusBadge(group.status)}
                        <span className="text-xs text-gray-400">
                          {group.type}
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      {language === 'ar' ? 'عرض' : 'View'}
                    </Button>
                  </div>
                )) : (
                  <div className="text-center py-8 text-gray-500">
                    <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>{language === 'ar' ? 'لم تنضم إلى أي مجموعة بعد' : 'No groups joined yet'}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Contracts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-green-600" />
              {language === 'ar' ? 'العقود الأخيرة' : 'Recent Contracts'}
            </CardTitle>
            <CardDescription>
              {language === 'ar' ? 'العقود التي أنشأتها أو وقعت عليها' : 'Contracts you created or signed'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contracts.length > 0 ? contracts.map((contract) => (
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
      </div>
    </DashboardLayout>
  );
};

export default SupplierDashboard;
