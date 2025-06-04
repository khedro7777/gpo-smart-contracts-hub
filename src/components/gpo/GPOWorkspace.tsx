
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
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
  Zap
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
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');

  const quickStats = [
    {
      title: language === 'en' ? 'Active Groups' : 'المجموعات النشطة',
      value: activeGroups,
      icon: <Users className="h-5 w-5" />,
      trend: '+12%',
      color: 'bg-blue-500'
    },
    {
      title: language === 'en' ? 'Smart Contracts' : 'العقود الذكية',
      value: totalContracts,
      icon: <FileText className="h-5 w-5" />,
      trend: '+8%',
      color: 'bg-green-500'
    },
    {
      title: language === 'en' ? 'Monthly Volume' : 'الحجم الشهري',
      value: `$${(monthlyVolume / 1000000).toFixed(1)}M`,
      icon: <TrendingUp className="h-5 w-5" />,
      trend: '+23%',
      color: 'bg-purple-500'
    },
    {
      title: language === 'en' ? 'Success Rate' : 'معدل النجاح',
      value: `${successRate}%`,
      icon: <Shield className="h-5 w-5" />,
      trend: '+2%',
      color: 'bg-orange-500'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'group_created',
      title: language === 'en' ? 'Tech Hardware Collective formed' : 'تم تكوين مجموعة الأجهزة التقنية',
      timestamp: '2 hours ago',
      status: 'active'
    },
    {
      id: 2,
      type: 'contract_signed',
      title: language === 'en' ? 'Medical Supplies Contract executed' : 'تم تنفيذ عقد اللوازم الطبية',
      timestamp: '4 hours ago',
      status: 'completed'
    },
    {
      id: 3,
      type: 'arbitration_resolved',
      title: language === 'en' ? 'Construction Materials dispute resolved' : 'تم حل نزاع مواد البناء',
      timestamp: '1 day ago',
      status: 'resolved'
    }
  ];

  const activeNegotiations = [
    {
      id: 1,
      title: language === 'en' ? 'Industrial Equipment Purchase' : 'شراء المعدات الصناعية',
      participants: 8,
      value: '$1.2M',
      progress: 75,
      deadline: '5 days',
      status: 'negotiating'
    },
    {
      id: 2,
      title: language === 'en' ? 'Software Licensing Coalition' : 'ائتلاف ترخيص البرمجيات',
      participants: 15,
      value: '$850K',
      progress: 60,
      deadline: '8 days',
      status: 'voting'
    },
    {
      id: 3,
      title: language === 'en' ? 'Healthcare Services Network' : 'شبكة الخدمات الصحية',
      participants: 6,
      value: '$2.1M',
      progress: 90,
      deadline: '2 days',
      status: 'final_review'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {language === 'en' ? 'GPO Workspace' : 'مساحة عمل GPO'}
              </h1>
              <p className="text-gray-600 mt-2">
                {language === 'en' 
                  ? 'Professional business collaboration platform'
                  : 'منصة التعاون التجاري المهني'
                }
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                {language === 'en' ? 'Global Operations' : 'العمليات العالمية'}
              </Badge>
              <Button className="bg-gpo-blue hover:bg-gpo-blue/90">
                <Zap className="h-4 w-4 mr-2" />
                {language === 'en' ? 'Quick Actions' : 'إجراءات سريعة'}
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600 font-medium">{stat.trend}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.color} text-white`}>
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">
              {language === 'en' ? 'Overview' : 'نظرة عامة'}
            </TabsTrigger>
            <TabsTrigger value="negotiations">
              {language === 'en' ? 'Negotiations' : 'المفاوضات'}
            </TabsTrigger>
            <TabsTrigger value="contracts">
              {language === 'en' ? 'Contracts' : 'العقود'}
            </TabsTrigger>
            <TabsTrigger value="arbitration">
              {language === 'en' ? 'Arbitration' : 'التحكيم'}
            </TabsTrigger>
            <TabsTrigger value="analytics">
              {language === 'en' ? 'Analytics' : 'التحليلات'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activities */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    {language === 'en' ? 'Recent Activities' : 'الأنشطة الحديثة'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{activity.title}</p>
                          <p className="text-sm text-gray-600">{activity.timestamp}</p>
                        </div>
                        <Badge variant={activity.status === 'completed' ? 'default' : 'secondary'}>
                          {activity.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Active Negotiations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Vote className="h-5 w-5" />
                    {language === 'en' ? 'Active Negotiations' : 'المفاوضات النشطة'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activeNegotiations.map((negotiation) => (
                      <div key={negotiation.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{negotiation.title}</h4>
                          <Badge variant="outline">{negotiation.status}</Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                          <span>{negotiation.participants} participants</span>
                          <span>{negotiation.value}</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{negotiation.progress}%</span>
                          </div>
                          <Progress value={negotiation.progress} className="h-2" />
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
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
                <CardTitle>{language === 'en' ? 'Active Negotiations' : 'المفاوضات النشطة'}</CardTitle>
                <CardDescription>
                  {language === 'en' 
                    ? 'Manage ongoing business negotiations and group purchasing agreements'
                    : 'إدارة المفاوضات التجارية الجارية واتفاقيات الشراء الجماعي'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">
                    {language === 'en' 
                      ? 'Advanced negotiation interface coming soon'
                      : 'واجهة المفاوضات المتقدمة قريباً'
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contracts">
            <Card>
              <CardHeader>
                <CardTitle>{language === 'en' ? 'Smart Contracts' : 'العقود الذكية'}</CardTitle>
                <CardDescription>
                  {language === 'en' 
                    ? 'IPFS-notarized contracts with editable fields and version control'
                    : 'عقود موثقة بـ IPFS مع حقول قابلة للتحرير والتحكم في الإصدارات'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">
                    {language === 'en' 
                      ? 'Contract management system in development'
                      : 'نظام إدارة العقود قيد التطوير'
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="arbitration">
            <Card>
              <CardHeader>
                <CardTitle>{language === 'en' ? 'ORDA Arbitration' : 'تحكيم ORDA'}</CardTitle>
                <CardDescription>
                  {language === 'en' 
                    ? 'WTO-compliant dispute resolution and arbitration system'
                    : 'نظام حل النزاعات والتحكيم المتوافق مع منظمة التجارة العالمية'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Scale className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">
                    {language === 'en' 
                      ? 'Arbitration panel interface under construction'
                      : 'واجهة لجنة التحكيم قيد الإنشاء'
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>{language === 'en' ? 'Business Analytics' : 'تحليلات الأعمال'}</CardTitle>
                <CardDescription>
                  {language === 'en' 
                    ? 'Harvard Business School methodology-based analytics dashboard'
                    : 'لوحة تحليلات مبنية على منهجية كلية هارفارد لإدارة الأعمال'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">
                    {language === 'en' 
                      ? 'Advanced analytics dashboard launching soon'
                      : 'لوحة التحليلات المتقدمة ستُطلق قريباً'
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
