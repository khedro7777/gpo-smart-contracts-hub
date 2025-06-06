
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslation } from 'react-i18next';
import { 
  Brain, 
  BarChart3, 
  Users, 
  Target, 
  Zap,
  TrendingUp,
  DollarSign,
  Clock,
  MessageSquare,
  Settings,
  Globe,
  FileText,
  Shield
} from 'lucide-react';
import AIPromptBox from '@/components/ai/AIPromptBox';

interface WorkspaceStats {
  totalSavings: number;
  activeDeals: number;
  supplierNetwork: number;
  successRate: number;
}

const ModernWorkspace: React.FC = () => {
  const { i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const stats: WorkspaceStats = {
    totalSavings: 2850000,
    activeDeals: 12,
    supplierNetwork: 148,
    successRate: 94
  };

  const quickActions = [
    {
      icon: <FileText className="h-5 w-5" />,
      title: i18n.language === 'ar' ? 'إنشاء عقد جديد' : 'Create New Contract',
      description: i18n.language === 'ar' ? 'صياغة عقد بمعايير دولية' : 'Draft international standard contract',
      color: 'bg-blue-50 text-blue-600 border-blue-200'
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: i18n.language === 'ar' ? 'البحث عن موردين' : 'Find Suppliers',
      description: i18n.language === 'ar' ? 'اكتشاف موردين جدد موثوقين' : 'Discover reliable new suppliers',
      color: 'bg-green-50 text-green-600 border-green-200'
    },
    {
      icon: <BarChart3 className="h-5 w-5" />,
      title: i18n.language === 'ar' ? 'تحليل السوق' : 'Market Analysis',
      description: i18n.language === 'ar' ? 'رؤى السوق والاتجاهات' : 'Market insights and trends',
      color: 'bg-purple-50 text-purple-600 border-purple-200'
    },
    {
      icon: <Target className="h-5 w-5" />,
      title: i18n.language === 'ar' ? 'تحسين التكاليف' : 'Cost Optimization',
      description: i18n.language === 'ar' ? 'استراتيجيات توفير التكاليف' : 'Cost-saving strategies',
      color: 'bg-orange-50 text-orange-600 border-orange-200'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'contract',
      title: i18n.language === 'ar' ? 'عقد المعدات الطبية وُقع' : 'Medical Equipment Contract Signed',
      time: '2 hours ago',
      value: '$450,000',
      status: 'completed'
    },
    {
      id: 2,
      type: 'negotiation',
      title: i18n.language === 'ar' ? 'مفاوضات البرمجيات جارية' : 'Software Licensing Negotiation',
      time: '5 hours ago',
      value: '$125,000',
      status: 'in-progress'
    },
    {
      id: 3,
      type: 'analysis',
      title: i18n.language === 'ar' ? 'تحليل السوق مكتمل' : 'Market Analysis Completed',
      time: '1 day ago',
      value: '15% savings',
      status: 'completed'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {i18n.language === 'ar' ? 'مساحة العمل الذكية' : 'Intelligent Workspace'}
                </h1>
                <p className="text-gray-600">
                  {i18n.language === 'ar' ? 'مدعوم بالذكاء الاصطناعي' : 'AI-Powered Business Hub'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                {i18n.language === 'ar' ? 'متصل' : 'Connected'}
              </Badge>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                {i18n.language === 'ar' ? 'الإعدادات' : 'Settings'}
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Zap className="h-4 w-4 mr-2" />
                {i18n.language === 'ar' ? 'إجراء سريع' : 'Quick Action'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              {i18n.language === 'ar' ? 'لوحة التحكم' : 'Dashboard'}
            </TabsTrigger>
            <TabsTrigger value="ai-assistant" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              {i18n.language === 'ar' ? 'المساعد الذكي' : 'AI Assistant'}
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              {i18n.language === 'ar' ? 'التحليلات' : 'Analytics'}
            </TabsTrigger>
            <TabsTrigger value="collaboration" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              {i18n.language === 'ar' ? 'التعاون' : 'Collaboration'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-blue-100">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-600 text-sm font-medium">
                        {i18n.language === 'ar' ? 'إجمالي التوفير' : 'Total Savings'}
                      </p>
                      <p className="text-2xl font-bold text-blue-900">
                        ${stats.totalSavings.toLocaleString()}
                      </p>
                    </div>
                    <DollarSign className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-green-100">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-600 text-sm font-medium">
                        {i18n.language === 'ar' ? 'الصفقات النشطة' : 'Active Deals'}
                      </p>
                      <p className="text-2xl font-bold text-green-900">{stats.activeDeals}</p>
                    </div>
                    <Target className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-50 to-purple-100">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-600 text-sm font-medium">
                        {i18n.language === 'ar' ? 'شبكة الموردين' : 'Supplier Network'}
                      </p>
                      <p className="text-2xl font-bold text-purple-900">{stats.supplierNetwork}</p>
                    </div>
                    <Globe className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-gradient-to-br from-orange-50 to-orange-100">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-600 text-sm font-medium">
                        {i18n.language === 'ar' ? 'معدل النجاح' : 'Success Rate'}
                      </p>
                      <p className="text-2xl font-bold text-orange-900">{stats.successRate}%</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-blue-600" />
                  {i18n.language === 'ar' ? 'إجراءات سريعة' : 'Quick Actions'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className={`h-auto p-4 flex flex-col items-start gap-3 hover:shadow-md transition-all ${action.color}`}
                    >
                      {action.icon}
                      <div className="text-left">
                        <h3 className="font-semibold text-sm">{action.title}</h3>
                        <p className="text-xs opacity-80">{action.description}</p>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-gray-600" />
                  {i18n.language === 'ar' ? 'الأنشطة الأخيرة' : 'Recent Activities'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                        }`}></div>
                        <div>
                          <h4 className="font-medium text-gray-900">{activity.title}</h4>
                          <p className="text-sm text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                      <Badge variant={activity.status === 'completed' ? 'default' : 'secondary'}>
                        {activity.value}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai-assistant" className="h-[calc(100vh-200px)]">
            <Card className="h-full">
              <AIPromptBox />
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>{i18n.language === 'ar' ? 'التحليلات المتقدمة' : 'Advanced Analytics'}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  {i18n.language === 'ar' 
                    ? 'تحليلات مفصلة وتقارير ذكية قادمة قريباً...'
                    : 'Detailed analytics and intelligent reports coming soon...'
                  }
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="collaboration">
            <Card>
              <CardHeader>
                <CardTitle>{i18n.language === 'ar' ? 'أدوات التعاون' : 'Collaboration Tools'}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  {i18n.language === 'ar' 
                    ? 'أدوات التعاون والمشاركة قادمة قريباً...'
                    : 'Collaboration and sharing tools coming soon...'
                  }
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ModernWorkspace;
