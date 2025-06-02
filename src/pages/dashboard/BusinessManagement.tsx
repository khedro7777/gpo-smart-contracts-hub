
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  BarChart3, 
  Users, 
  FileText, 
  TrendingUp, 
  DollarSign,
  Calendar,
  Target,
  Award,
  AlertCircle,
  CheckCircle,
  Clock,
  Building2,
  Settings,
  PieChart,
  Activity
} from 'lucide-react';

const BusinessManagement = () => {
  const { language } = useLanguage();
  
  const businessMetrics = [
    {
      title: language === 'en' ? 'Revenue Growth' : 'نمو الإيرادات',
      value: '+23.5%',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: language === 'en' ? 'Active Projects' : 'المشاريع النشطة',
      value: '142',
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: language === 'en' ? 'Team Members' : 'أعضاء الفريق',
      value: '28',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: language === 'en' ? 'Completion Rate' : 'معدل الإنجاز',
      value: '94.2%',
      icon: Target,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'project',
      title: language === 'en' ? 'New project initiated' : 'بدء مشروع جديد',
      description: language === 'en' ? 'Tech Startup Procurement' : 'مشتريات الشركة الناشئة التقنية',
      time: '2 hours ago',
      status: 'active'
    },
    {
      id: 2,
      type: 'team',
      title: language === 'en' ? 'Team member added' : 'إضافة عضو فريق',
      description: language === 'en' ? 'Sarah joined as Project Manager' : 'انضمت سارة كمديرة مشروع',
      time: '5 hours ago',
      status: 'completed'
    },
    {
      id: 3,
      type: 'milestone',
      title: language === 'en' ? 'Milestone achieved' : 'تحقيق إنجاز',
      description: language === 'en' ? 'Q1 targets exceeded' : 'تجاوز أهداف الربع الأول',
      time: '1 day ago',
      status: 'completed'
    }
  ];

  const upcomingTasks = [
    {
      id: 1,
      title: language === 'en' ? 'Review quarterly reports' : 'مراجعة التقارير الفصلية',
      dueDate: '2025-01-20',
      priority: 'high',
      assignee: 'John Doe'
    },
    {
      id: 2,
      title: language === 'en' ? 'Client presentation preparation' : 'إعداد عرض تقديمي للعميل',
      dueDate: '2025-01-22',
      priority: 'medium',
      assignee: 'Jane Smith'
    },
    {
      id: 3,
      title: language === 'en' ? 'Team performance review' : 'مراجعة أداء الفريق',
      dueDate: '2025-01-25',
      priority: 'low',
      assignee: 'Mike Johnson'
    }
  ];

  return (
    <DashboardLayout role="supplier">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Building2 className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold">
              {language === 'en' ? 'Business Management' : 'إدارة الأعمال'}
            </h1>
            <p className="text-gray-600">
              {language === 'en' 
                ? 'Manage your business operations, team, and performance'
                : 'إدارة عمليات الأعمال والفريق والأداء'
              }
            </p>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {businessMetrics.map((metric, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  </div>
                  <div className={`p-3 ${metric.bgColor} rounded-full`}>
                    <metric.icon className={`h-6 w-6 ${metric.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">
              {language === 'en' ? 'Overview' : 'نظرة عامة'}
            </TabsTrigger>
            <TabsTrigger value="projects">
              {language === 'en' ? 'Projects' : 'المشاريع'}
            </TabsTrigger>
            <TabsTrigger value="team">
              {language === 'en' ? 'Team' : 'الفريق'}
            </TabsTrigger>
            <TabsTrigger value="analytics">
              {language === 'en' ? 'Analytics' : 'التحليلات'}
            </TabsTrigger>
            <TabsTrigger value="settings">
              {language === 'en' ? 'Settings' : 'الإعدادات'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activities */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    {language === 'en' ? 'Recent Activities' : 'الأنشطة الأخيرة'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          activity.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
                        }`} />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{activity.title}</p>
                          <p className="text-xs text-gray-600">{activity.description}</p>
                          <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                        </div>
                        <Badge variant={activity.status === 'completed' ? 'default' : 'secondary'}>
                          {activity.status === 'completed' 
                            ? (language === 'en' ? 'Done' : 'مكتمل')
                            : (language === 'en' ? 'Active' : 'نشط')
                          }
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Tasks */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    {language === 'en' ? 'Upcoming Tasks' : 'المهام القادمة'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingTasks.map((task) => (
                      <div key={task.id} className="border rounded-lg p-3">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-sm">{task.title}</h4>
                          <Badge variant={
                            task.priority === 'high' ? 'destructive' :
                            task.priority === 'medium' ? 'default' : 'secondary'
                          }>
                            {task.priority}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-600">
                          <span>{language === 'en' ? 'Assigned to:' : 'مُكلف لـ:'} {task.assignee}</span>
                          <span>{language === 'en' ? 'Due:' : 'موعد التسليم:'} {task.dueDate}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  {language === 'en' ? 'Performance Summary' : 'ملخص الأداء'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        {language === 'en' ? 'Project Completion' : 'إنجاز المشاريع'}
                      </span>
                      <span className="text-sm text-gray-600">87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        {language === 'en' ? 'Customer Satisfaction' : 'رضا العملاء'}
                      </span>
                      <span className="text-sm text-gray-600">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        {language === 'en' ? 'Team Efficiency' : 'كفاءة الفريق'}
                      </span>
                      <span className="text-sm text-gray-600">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{language === 'en' ? 'Project Management' : 'إدارة المشاريع'}</CardTitle>
                <CardDescription>
                  {language === 'en' 
                    ? 'Track and manage all your business projects'
                    : 'تتبع وإدارة جميع مشاريع العمل'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Project placeholder content */}
                  <div className="text-center py-12">
                    <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">
                      {language === 'en' ? 'Project management features coming soon' : 'ميزات إدارة المشاريع قريباً'}
                    </h3>
                    <p className="text-gray-500">
                      {language === 'en' 
                        ? 'Advanced project tracking and management tools are under development'
                        : 'أدوات تتبع وإدارة المشاريع المتقدمة قيد التطوير'
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{language === 'en' ? 'Team Management' : 'إدارة الفريق'}</CardTitle>
                <CardDescription>
                  {language === 'en' 
                    ? 'Manage your team members, roles, and permissions'
                    : 'إدارة أعضاء الفريق والأدوار والصلاحيات'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Team placeholder content */}
                  <div className="text-center py-12">
                    <Users className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">
                      {language === 'en' ? 'Team management features coming soon' : 'ميزات إدارة الفريق قريباً'}
                    </h3>
                    <p className="text-gray-500">
                      {language === 'en' 
                        ? 'Comprehensive team management tools are under development'
                        : 'أدوات إدارة الفريق الشاملة قيد التطوير'
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{language === 'en' ? 'Business Analytics' : 'تحليلات الأعمال'}</CardTitle>
                <CardDescription>
                  {language === 'en' 
                    ? 'Detailed insights and analytics for your business performance'
                    : 'رؤى وتحليلات مفصلة لأداء أعمالك'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Analytics placeholder content */}
                  <div className="text-center py-12">
                    <PieChart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">
                      {language === 'en' ? 'Advanced analytics coming soon' : 'التحليلات المتقدمة قريباً'}
                    </h3>
                    <p className="text-gray-500">
                      {language === 'en' 
                        ? 'Detailed business intelligence and analytics tools are under development'
                        : 'أدوات ذكاء الأعمال والتحليلات المفصلة قيد التطوير'
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{language === 'en' ? 'Business Settings' : 'إعدادات الأعمال'}</CardTitle>
                <CardDescription>
                  {language === 'en' 
                    ? 'Configure your business preferences and settings'
                    : 'تكوين تفضيلات وإعدادات أعمالك'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Settings placeholder content */}
                  <div className="text-center py-12">
                    <Settings className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">
                      {language === 'en' ? 'Business settings coming soon' : 'إعدادات الأعمال قريباً'}
                    </h3>
                    <p className="text-gray-500">
                      {language === 'en' 
                        ? 'Comprehensive business configuration options are under development'
                        : 'خيارات تكوين الأعمال الشاملة قيد التطوير'
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default BusinessManagement;
