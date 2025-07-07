
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { ModuleDashboard as ModuleDashboardType, ActivityLog, DashboardNotification } from '@/types/dashboard';
import { 
  Users, 
  Activity, 
  TrendingUp, 
  Settings, 
  Bell,
  BarChart3,
  Target,
  DollarSign,
  Star
} from 'lucide-react';

interface ModuleDashboardProps {
  module: ModuleDashboardType;
  activities: ActivityLog[];
  notifications: DashboardNotification[];
  onUpdateSettings: (settings: any) => void;
  onCrossModuleConnect: (targetModule: string) => void;
}

const ModuleDashboard: React.FC<ModuleDashboardProps> = ({
  module,
  activities,
  notifications,
  onUpdateSettings,
  onCrossModuleConnect
}) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  useEffect(() => {
    const unread = notifications.filter(n => !n.isRead).length;
    setUnreadNotifications(unread);
  }, [notifications]);

  const getModuleIcon = (type: string) => {
    switch (type) {
      case 'procurement': return '🛒';
      case 'marketing': return '📊';
      case 'company_formation': return '🏢';
      case 'freelancer': return '💼';
      case 'investment': return '💰';
      default: return '📋';
    }
  };

  const getActivityColor = (action: string) => {
    if (action.includes('created')) return 'bg-green-100 text-green-800';
    if (action.includes('updated')) return 'bg-blue-100 text-blue-800';
    if (action.includes('deleted')) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-4xl">{getModuleIcon(module.type)}</span>
          <div>
            <h1 className="text-3xl font-bold">{module.name}</h1>
            <p className="text-gray-600">
              {language === 'ar' ? 'لوحة تحكم الوحدة' : 'Module Dashboard'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={module.isActive ? "default" : "secondary"}>
            {module.isActive ? 'Active' : 'Inactive'}
          </Badge>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            {language === 'ar' ? 'الإعدادات' : 'Settings'}
          </Button>
        </div>
      </div>

      {/* Real-time Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'ar' ? 'المستخدمون النشطون' : 'Active Users'}
                </p>
                <p className="text-2xl font-bold">{module.stats.activeUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'ar' ? 'إجمالي المعاملات' : 'Total Transactions'}
                </p>
                <p className="text-2xl font-bold">{module.stats.totalTransactions}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'ar' ? 'معدل الإنجاز' : 'Completion Rate'}
                </p>
                <p className="text-2xl font-bold">{module.stats.completionRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'ar' ? 'الإيرادات' : 'Revenue'}
                </p>
                <p className="text-2xl font-bold">${module.stats.revenue}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">
            {language === 'ar' ? 'نظرة عامة' : 'Overview'}
          </TabsTrigger>
          <TabsTrigger value="activity">
            {language === 'ar' ? 'النشاط' : 'Activity'}
          </TabsTrigger>
          <TabsTrigger value="notifications" className="relative">
            {language === 'ar' ? 'الإشعارات' : 'Notifications'}
            {unreadNotifications > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs">
                {unreadNotifications}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="settings">
            {language === 'ar' ? 'الإعدادات' : 'Settings'}
          </TabsTrigger>
          <TabsTrigger value="integration">
            {language === 'ar' ? 'التكامل' : 'Integration'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  {language === 'ar' ? 'أداء الوحدة' : 'Module Performance'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Average Rating</span>
                    <Badge variant="outline">{module.stats.averageRating}/5</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Completion Rate</span>
                    <Badge variant="outline">{module.stats.completionRate}%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Active Users</span>
                    <Badge variant="outline">{module.stats.activeUsers}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'ar' ? 'الصلاحيات' : 'Permissions'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Create Groups</span>
                    <Badge variant={module.permissions.canCreateGroups ? "default" : "secondary"}>
                      {module.permissions.canCreateGroups ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Manage Members</span>
                    <Badge variant={module.permissions.canManageMembers ? "default" : "secondary"}>
                      {module.permissions.canManageMembers ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">View Analytics</span>
                    <Badge variant={module.permissions.canViewAnalytics ? "default" : "secondary"}>
                      {module.permissions.canViewAnalytics ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                {language === 'ar' ? 'سجل النشاط' : 'Activity Log'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium">{activity.action}</p>
                        <Badge className={getActivityColor(activity.action)} variant="outline">
                          {activity.action.split(' ')[0]}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        By {activity.userName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(activity.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                {language === 'ar' ? 'الإشعارات' : 'Notifications'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div key={notification.id} className={`p-3 rounded-lg border-l-4 ${
                    notification.type === 'error' ? 'border-red-500 bg-red-50' :
                    notification.type === 'warning' ? 'border-yellow-500 bg-yellow-50' :
                    notification.type === 'success' ? 'border-green-500 bg-green-50' :
                    'border-blue-500 bg-blue-50'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">{notification.title}</p>
                        <p className="text-sm text-gray-600">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(notification.timestamp).toLocaleString()}
                        </p>
                      </div>
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'ar' ? 'إعدادات الوحدة' : 'Module Settings'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Auto Approval</p>
                    <p className="text-sm text-gray-600">Automatically approve new members</p>
                  </div>
                  <Badge variant={module.settings.autoApproval ? "default" : "secondary"}>
                    {module.settings.autoApproval ? 'Enabled' : 'Disabled'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Max Members</p>
                    <p className="text-sm text-gray-600">Maximum members per group</p>
                  </div>
                  <Badge variant="outline">{module.settings.maxMembers}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Min Points Required</p>
                    <p className="text-sm text-gray-600">Minimum points to join</p>
                  </div>
                  <Badge variant="outline">{module.settings.minPointsRequired}</Badge>
                </div>
                <Button onClick={() => onUpdateSettings(module.settings)}>
                  {language === 'ar' ? 'حفظ الإعدادات' : 'Save Settings'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integration" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'ar' ? 'التكامل مع الوحدات الأخرى' : 'Cross-Module Integration'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  {language === 'ar' 
                    ? 'الوحدات المتصلة حالياً:' 
                    : 'Currently connected modules:'
                  }
                </p>
                <div className="flex flex-wrap gap-2">
                  {module.settings.crossModuleAccess.map((moduleId) => (
                    <Badge key={moduleId} variant="outline">
                      {moduleId}
                    </Badge>
                  ))}
                </div>
                <Button onClick={() => onCrossModuleConnect('new-module')}>
                  {language === 'ar' ? 'ربط وحدة جديدة' : 'Connect New Module'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ModuleDashboard;
