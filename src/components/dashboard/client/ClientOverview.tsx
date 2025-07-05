
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  FileText, 
  DollarSign, 
  TrendingUp,
  Clock,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Plus,
  Eye
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
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'urgent': return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/groups')}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {language === 'ar' ? 'المجموعات النشطة' : 'Active Groups'}
                </p>
                <p className="text-2xl font-bold text-blue-600">{stats.activeGroups}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <div className="mt-4">
              <Button size="sm" variant="outline" className="w-full">
                <Eye className="h-4 w-4 mr-2" />
                {language === 'ar' ? 'عرض الكل' : 'View All'}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {language === 'ar' ? 'العقود النشطة' : 'Active Contracts'}
                </p>
                <p className="text-2xl font-bold text-green-600">{stats.activeContracts}</p>
              </div>
              <FileText className="h-8 w-8 text-green-600" />
            </div>
            <div className="mt-4">
              <Button size="sm" variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                {language === 'ar' ? 'عقد جديد' : 'New Contract'}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {language === 'ar' ? 'الفواتير المعلقة' : 'Pending Invoices'}
                </p>
                <p className="text-2xl font-bold text-orange-600">{stats.pendingInvoices}</p>
              </div>
              <DollarSign className="h-8 w-8 text-orange-600" />
            </div>
            <div className="mt-4">
              <Button size="sm" variant="outline" className="w-full">
                <Eye className="h-4 w-4 mr-2" />
                {language === 'ar' ? 'عرض الفواتير' : 'View Invoices'}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {language === 'ar' ? 'النقاط المتاحة' : 'Available Points'}
                </p>
                <p className="text-2xl font-bold text-purple-600">{stats.availablePoints}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
            <div className="mt-4">
              <Button size="sm" variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                {language === 'ar' ? 'شراء نقاط' : 'Buy Points'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            {language === 'ar' ? 'الإجراءات السريعة' : 'Quick Actions'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              className="h-20 flex flex-col items-center gap-2"
              onClick={() => navigate('/groups')}
            >
              <Users className="h-6 w-6" />
              <span className="text-sm">
                {language === 'ar' ? 'انضم لمجموعة' : 'Join Group'}
              </span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center gap-2"
              onClick={() => navigate('/gateways')}
            >
              <FileText className="h-6 w-6" />
              <span className="text-sm">
                {language === 'ar' ? 'البوابات' : 'Gateways'}
              </span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center gap-2"
              onClick={() => navigate('/voting')}
            >
              <TrendingUp className="h-6 w-6" />
              <span className="text-sm">
                {language === 'ar' ? 'التصويت' : 'Voting'}
              </span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center gap-2"
              onClick={() => navigate('/gpo')}
            >
              <DollarSign className="h-6 w-6" />
              <span className="text-sm">
                {language === 'ar' ? 'GPO' : 'GPO'}
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold">
              {language === 'ar' ? 'الأنشطة الأخيرة' : 'Recent Activities'}
            </CardTitle>
            <Button variant="ghost" size="sm">
              {language === 'ar' ? 'عرض الكل' : 'View All'}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className={`p-2 rounded-full ${getStatusColor(activity.status)}`}>
                  {getStatusIcon(activity.status)}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(activity.timestamp).toLocaleDateString(
                      language === 'ar' ? 'ar-SA' : 'en-US'
                    )}
                  </p>
                </div>
                <Badge className={getStatusColor(activity.status)}>
                  {activity.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'ar' ? 'توفير التكاليف' : 'Cost Savings'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {language === 'ar' ? 'هذا الشهر' : 'This Month'}
                </span>
                <span className="text-lg font-bold text-green-600">$2,450</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {language === 'ar' ? 'إجمالي التوفير' : 'Total Savings'}
                </span>
                <span className="text-lg font-bold text-green-600">$18,320</span>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <p className="text-sm text-green-800">
                  {language === 'ar' 
                    ? 'متوسط توفير 23% من خلال المشتريات الجماعية'
                    : 'Average 23% savings through group purchasing'
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'ar' ? 'نشاط المجموعات' : 'Group Activity'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {language === 'ar' ? 'مجموعات نشطة' : 'Active Groups'}
                </span>
                <span className="text-lg font-bold text-blue-600">{stats.activeGroups}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {language === 'ar' ? 'مشاريع مكتملة' : 'Completed Projects'}
                </span>
                <span className="text-lg font-bold text-blue-600">8</span>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <p className="text-sm text-blue-800">
                  {language === 'ar' 
                    ? 'معدل نجاح 94% في المشاريع'
                    : '94% success rate in projects'
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClientOverview;
