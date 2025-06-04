
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useTranslation } from 'react-i18next';
import { 
  Users, 
  Building2, 
  Scale, 
  FileText, 
  Vote, 
  MessageSquare,
  TrendingUp,
  Globe,
  Shield,
  Zap,
  Menu
} from 'lucide-react';

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

  const quickStats = [
    {
      title: i18n.language === 'ar' ? 'المجموعات النشطة' : 'Active Groups',
      value: activeGroups,
      icon: <Users className="h-4 w-4 sm:h-5 sm:w-5" />,
      trend: '+12%',
      color: 'bg-blue-500'
    },
    {
      title: i18n.language === 'ar' ? 'العقود الذكية' : 'Smart Contracts',
      value: totalContracts,
      icon: <FileText className="h-4 w-4 sm:h-5 sm:w-5" />,
      trend: '+8%',
      color: 'bg-green-500'
    },
    {
      title: i18n.language === 'ar' ? 'الحجم الشهري' : 'Monthly Volume',
      value: `$${(monthlyVolume / 1000000).toFixed(1)}M`,
      icon: <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />,
      trend: '+23%',
      color: 'bg-purple-500'
    },
    {
      title: i18n.language === 'ar' ? 'معدل النجاح' : 'Success Rate',
      value: `${successRate}%`,
      icon: <Shield className="h-4 w-4 sm:h-5 sm:w-5" />,
      trend: '+2%',
      color: 'bg-orange-500'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'group_created',
      title: i18n.language === 'ar' ? 'تم تكوين مجموعة الأجهزة التقنية' : 'Tech Hardware Collective formed',
      timestamp: '2 hours ago',
      status: 'active'
    },
    {
      id: 2,
      type: 'contract_signed',
      title: i18n.language === 'ar' ? 'تم تنفيذ عقد اللوازم الطبية' : 'Medical Supplies Contract executed',
      timestamp: '4 hours ago',
      status: 'completed'
    },
    {
      id: 3,
      type: 'arbitration_resolved',
      title: i18n.language === 'ar' ? 'تم حل نزاع مواد البناء' : 'Construction Materials dispute resolved',
      timestamp: '1 day ago',
      status: 'resolved'
    }
  ];

  const activeNegotiations = [
    {
      id: 1,
      title: i18n.language === 'ar' ? 'شراء المعدات الصناعية' : 'Industrial Equipment Purchase',
      participants: 8,
      value: '$1.2M',
      progress: 75,
      deadline: '5 days',
      status: 'negotiating'
    },
    {
      id: 2,
      title: i18n.language === 'ar' ? 'ائتلاف ترخيص البرمجيات' : 'Software Licensing Coalition',
      participants: 15,
      value: '$850K',
      progress: 60,
      deadline: '8 days',
      status: 'voting'
    },
    {
      id: 3,
      title: i18n.language === 'ar' ? 'شبكة الخدمات الصحية' : 'Healthcare Services Network',
      participants: 6,
      value: '$2.1M',
      progress: 90,
      deadline: '2 days',
      status: 'final_review'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 truncate">
                {i18n.language === 'ar' ? 'مساحة عمل GPO' : 'GPO Workspace'}
              </h1>
              <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
                {i18n.language === 'ar' 
                  ? 'منصة التعاون التجاري المهني'
                  : 'Professional business collaboration platform'
                }
              </p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <Badge variant="outline" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                <Globe className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">
                  {i18n.language === 'ar' ? 'العمليات العالمية' : 'Global Operations'}
                </span>
                <span className="sm:hidden">Global</span>
              </Badge>
              <Button className="bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm px-2 sm:px-4">
                <Zap className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">
                  {i18n.language === 'ar' ? 'إجراءات سريعة' : 'Quick Actions'}
                </span>
                <span className="sm:hidden">Actions</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          {quickStats.map((stat, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardContent className="p-3 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">{stat.title}</p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs sm:text-sm text-green-600 font-medium">{stat.trend}</p>
                  </div>
                  <div className={`p-2 sm:p-3 rounded-full ${stat.color} text-white flex-shrink-0`}>
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
          <div className="overflow-x-auto">
            <TabsList className="grid w-full grid-cols-5 min-w-max">
              <TabsTrigger value="overview" className="text-xs sm:text-sm px-2 sm:px-4">
                {i18n.language === 'ar' ? 'نظرة عامة' : 'Overview'}
              </TabsTrigger>
              <TabsTrigger value="negotiations" className="text-xs sm:text-sm px-2 sm:px-4">
                {i18n.language === 'ar' ? 'المفاوضات' : 'Negotiations'}
              </TabsTrigger>
              <TabsTrigger value="contracts" className="text-xs sm:text-sm px-2 sm:px-4">
                {i18n.language === 'ar' ? 'العقود' : 'Contracts'}
              </TabsTrigger>
              <TabsTrigger value="arbitration" className="text-xs sm:text-sm px-2 sm:px-4">
                {i18n.language === 'ar' ? 'التحكيم' : 'Arbitration'}
              </TabsTrigger>
              <TabsTrigger value="analytics" className="text-xs sm:text-sm px-2 sm:px-4">
                {i18n.language === 'ar' ? 'التحليلات' : 'Analytics'}
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Recent Activities */}
              <Card>
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5" />
                    {i18n.language === 'ar' ? 'الأنشطة الحديثة' : 'Recent Activities'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 sm:space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg">
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{activity.title}</p>
                          <p className="text-xs sm:text-sm text-gray-600">{activity.timestamp}</p>
                        </div>
                        <Badge variant={activity.status === 'completed' ? 'default' : 'secondary'} className="text-xs ml-2 flex-shrink-0">
                          {activity.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Active Negotiations */}
              <Card>
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <Vote className="h-4 w-4 sm:h-5 sm:w-5" />
                    {i18n.language === 'ar' ? 'المفاوضات النشطة' : 'Active Negotiations'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 sm:space-y-4">
                    {activeNegotiations.map((negotiation) => (
                      <div key={negotiation.id} className="p-3 sm:p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900 text-sm sm:text-base truncate flex-1">{negotiation.title}</h4>
                          <Badge variant="outline" className="text-xs ml-2 flex-shrink-0">{negotiation.status}</Badge>
                        </div>
                        <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600 mb-2">
                          <span>{negotiation.participants} participants</span>
                          <span>{negotiation.value}</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs sm:text-sm">
                            <span>Progress</span>
                            <span>{negotiation.progress}%</span>
                          </div>
                          <Progress value={negotiation.progress} className="h-1 sm:h-2" />
                        </div>
                        <p className="text-xs sm:text-sm text-gray-500 mt-2">
                          Deadline: {negotiation.deadline}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="negotiations">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">{i18n.language === 'ar' ? 'المفاوضات النشطة' : 'Active Negotiations'}</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  {i18n.language === 'ar' 
                    ? 'إدارة المفاوضات التجارية الجارية واتفاقيات الشراء الجماعي'
                    : 'Manage ongoing business negotiations and group purchasing agreements'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 sm:py-12">
                  <Building2 className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 text-sm sm:text-base">
                    {i18n.language === 'ar' 
                      ? 'واجهة المفاوضات المتقدمة قريباً'
                      : 'Advanced negotiation interface coming soon'
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contracts">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">{i18n.language === 'ar' ? 'العقود الذكية' : 'Smart Contracts'}</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  {i18n.language === 'ar' 
                    ? 'عقود موثقة بـ IPFS مع حقول قابلة للتحرير والتحكم في الإصدارات'
                    : 'IPFS-notarized contracts with editable fields and version control'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 sm:py-12">
                  <FileText className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 text-sm sm:text-base">
                    {i18n.language === 'ar' 
                      ? 'نظام إدارة العقود قيد التطوير'
                      : 'Contract management system in development'
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="arbitration">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">{i18n.language === 'ar' ? 'تحكيم ORDA' : 'ORDA Arbitration'}</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  {i18n.language === 'ar' 
                    ? 'نظام حل النزاعات والتحكيم المتوافق مع منظمة التجارة العالمية'
                    : 'WTO-compliant dispute resolution and arbitration system'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 sm:py-12">
                  <Scale className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 text-sm sm:text-base">
                    {i18n.language === 'ar' 
                      ? 'واجهة لجنة التحكيم قيد الإنشاء'
                      : 'Arbitration panel interface under construction'
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">{i18n.language === 'ar' ? 'تحليلات الأعمال' : 'Business Analytics'}</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  {i18n.language === 'ar' 
                    ? 'لوحة تحليلات مبنية على منهجية كلية هارفارد لإدارة الأعمال'
                    : 'Harvard Business School methodology-based analytics dashboard'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 sm:py-12">
                  <TrendingUp className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 text-sm sm:text-base">
                    {i18n.language === 'ar' 
                      ? 'لوحة التحليلات المتقدمة ستُطلق قريباً'
                      : 'Advanced analytics dashboard launching soon'
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GPOWorkspace;
