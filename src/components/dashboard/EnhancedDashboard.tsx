
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/utils/translations';
import RasaChatbot from '@/components/chatbot/RasaChatbot';
import ContractAnalyzer from '@/components/enhanced/ContractAnalyzer';
import SupplierMatchingEngine from '@/components/advanced/SupplierMatchingEngine';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  ShoppingCart,
  Bot,
  FileText,
  Search,
  BarChart3
} from 'lucide-react';

interface EnhancedDashboardProps {
  role: 'client' | 'freelancer' | 'supplier';
}

const EnhancedDashboard: React.FC<EnhancedDashboardProps> = ({ role }) => {
  const { language } = useLanguage();

  const getDashboardStats = () => {
    switch (role) {
      case 'supplier':
        return [
          {
            title: t('activeRFQs', language),
            value: '8',
            change: '+12%',
            icon: ShoppingCart,
            trend: 'up'
          },
          {
            title: t('monthlyRevenue', language),
            value: '$45,200',
            change: '+8%',
            icon: DollarSign,
            trend: 'up'
          },
          {
            title: t('activeContracts', language),
            value: '12',
            change: '+3',
            icon: FileText,
            trend: 'up'
          },
          {
            title: t('customerSatisfaction', language),
            value: '96%',
            change: '+2%',
            icon: TrendingUp,
            trend: 'up'
          }
        ];
      case 'client':
        return [
          {
            title: t('activeProcurements', language),
            value: '5',
            change: '+2',
            icon: ShoppingCart,
            trend: 'up'
          },
          {
            title: t('costSavings', language),
            value: '18.5%',
            change: '+3.2%',
            icon: DollarSign,
            trend: 'up'
          },
          {
            title: t('supplierRating', language),
            value: '4.8',
            change: '+0.2',
            icon: Users,
            trend: 'up'
          },
          {
            title: t('completedOrders', language),
            value: '142',
            change: '+15',
            icon: BarChart3,
            trend: 'up'
          }
        ];
      default:
        return [];
    }
  };

  const stats = getDashboardStats();

  return (
    <div className="space-y-6">
      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">{stat.change}</span>
                  </div>
                </div>
                <div className="p-3 bg-blue-50 rounded-full">
                  <stat.icon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Assistant */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-blue-600" />
              {language === 'en' ? 'AI Assistant' : 'المساعد الذكي'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[400px]">
              <RasaChatbot />
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'en' ? 'Quick Actions' : 'الإجراءات السريعة'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button className="h-16 flex flex-col items-center gap-2">
                <Search className="h-5 w-5" />
                <span className="text-sm">
                  {language === 'en' ? 'Find Suppliers' : 'البحث عن موردين'}
                </span>
              </Button>
              
              <Button variant="outline" className="h-16 flex flex-col items-center gap-2">
                <FileText className="h-5 w-5" />
                <span className="text-sm">
                  {language === 'en' ? 'New Contract' : 'عقد جديد'}
                </span>
              </Button>
              
              <Button variant="outline" className="h-16 flex flex-col items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                <span className="text-sm">
                  {language === 'en' ? 'Analytics' : 'التحليلات'}
                </span>
              </Button>
              
              <Button variant="outline" className="h-16 flex flex-col items-center gap-2">
                <Users className="h-5 w-5" />
                <span className="text-sm">
                  {language === 'en' ? 'Join Group' : 'انضم لمجموعة'}
                </span>
              </Button>
            </div>

            {/* Recent Activities */}
            <div className="mt-6">
              <h4 className="font-semibold mb-3">
                {language === 'en' ? 'Recent Activities' : 'الأنشطة الأخيرة'}
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {language === 'en' ? 'New RFQ received' : 'طلب عرض أسعار جديد'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {language === 'en' ? '2 hours ago' : 'منذ ساعتين'}
                    </p>
                  </div>
                  <Badge variant="secondary">New</Badge>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {language === 'en' ? 'Contract signed' : 'تم توقيع العقد'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {language === 'en' ? '1 day ago' : 'منذ يوم'}
                    </p>
                  </div>
                  <Badge variant="outline">Completed</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI-Powered Tools */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Contract Analyzer */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-600" />
              {language === 'en' ? 'Contract Intelligence' : 'ذكاء العقود'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] overflow-y-auto">
              <ContractAnalyzer />
            </div>
          </CardContent>
        </Card>

        {/* Supplier Matching */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-green-600" />
              {language === 'en' ? 'Smart Supplier Matching' : 'مطابقة الموردين الذكية'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] overflow-y-auto">
              <SupplierMatchingEngine />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedDashboard;
