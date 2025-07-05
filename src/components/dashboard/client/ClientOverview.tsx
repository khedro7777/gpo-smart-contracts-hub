
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  TrendingUp, 
  Users, 
  FileText, 
  DollarSign,
  Activity,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';

interface ClientOverviewProps {
  stats: {
    activeGroups: number;
    activeContracts: number;
    pendingInvoices: number;
    availablePoints: number;
  };
  recentActivities: Array<{
    id: string;
    type: string;
    title: string;
    timestamp: string;
    status: string;
  }>;
}

const ClientOverview: React.FC<ClientOverviewProps> = ({ stats, recentActivities }) => {
  const { language } = useLanguage();

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'contract':
        return <FileText className="h-4 w-4" />;
      case 'group':
        return <Users className="h-4 w-4" />;
      case 'payment':
        return <DollarSign className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'urgent':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === 'ar' ? 'المجموعات النشطة' : 'Active Groups'}
            </CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.activeGroups}</div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
              <span className="text-xs text-green-600">+12%</span>
              <span className="text-xs text-gray-500 ml-2">
                {language === 'ar' ? 'من الشهر الماضي' : 'from last month'}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === 'ar' ? 'العقود النشطة' : 'Active Contracts'}
            </CardTitle>
            <FileText className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.activeContracts}</div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
              <span className="text-xs text-green-600">+8%</span>
              <span className="text-xs text-gray-500 ml-2">
                {language === 'ar' ? 'نمو مستمر' : 'steady growth'}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === 'ar' ? 'الفواتير المعلقة' : 'Pending Invoices'}
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.pendingInvoices}</div>
            <div className="flex items-center mt-2">
              <Clock className="h-3 w-3 text-orange-600 mr-1" />
              <span className="text-xs text-orange-600">
                {language === 'ar' ? 'تحتاج مراجعة' : 'need review'}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === 'ar' ? 'النقاط المتاحة' : 'Available Points'}
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats.availablePoints}</div>
            <div className="flex items-center mt-2">
              <Badge variant="secondary" className="text-xs">
                {language === 'ar' ? 'مستقر' : 'stable'}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-600" />
              {language === 'ar' ? 'النشاطات الحديثة' : 'Recent Activities'}
            </CardTitle>
            <Button variant="outline" size="sm">
              {language === 'ar' ? 'عرض الكل' : 'View All'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-full shadow-sm">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{activity.title}</h4>
                    <p className="text-sm text-gray-500">
                      {new Date(activity.timestamp).toLocaleDateString(
                        language === 'ar' ? 'ar-SA' : 'en-US'
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(activity.status)}
                  <Button variant="ghost" size="sm">
                    {language === 'ar' ? 'عرض' : 'View'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'ar' ? 'الإجراءات السريعة' : 'Quick Actions'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-20 flex flex-col items-center gap-2 bg-blue-600 hover:bg-blue-700">
              <Users className="h-6 w-6" />
              <span className="text-sm">
                {language === 'ar' ? 'إنشاء مجموعة' : 'Create Group'}
              </span>
            </Button>
            
            <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
              <FileText className="h-6 w-6" />
              <span className="text-sm">
                {language === 'ar' ? 'عقد جديد' : 'New Contract'}
              </span>
            </Button>
            
            <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
              <DollarSign className="h-6 w-6" />
              <span className="text-sm">
                {language === 'ar' ? 'إدارة المدفوعات' : 'Manage Payments'}
              </span>
            </Button>
            
            <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
              <TrendingUp className="h-6 w-6" />
              <span className="text-sm">
                {language === 'ar' ? 'التقارير' : 'Reports'}
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientOverview;
