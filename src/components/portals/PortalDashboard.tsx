
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { Portal, PortalDashboard as PortalDashboardType } from '@/types/portals';
import { 
  Users, 
  Activity, 
  TrendingUp, 
  Settings, 
  Bell,
  BarChart3,
  DollarSign,
  Star,
  AlertCircle
} from 'lucide-react';

interface PortalDashboardProps {
  portal: Portal;
  dashboard: PortalDashboardType;
  onUpdateSettings: (settings: any) => void;
  onToggleFeature: (featureId: string) => void;
}

const PortalDashboard: React.FC<PortalDashboardProps> = ({
  portal,
  dashboard,
  onUpdateSettings,
  onToggleFeature
}) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');

  const getActivityIcon = (action: string) => {
    if (action.includes('joined')) return <Users className="h-4 w-4" />;
    if (action.includes('transaction')) return <DollarSign className="h-4 w-4" />;
    if (action.includes('rated')) return <Star className="h-4 w-4" />;
    return <Activity className="h-4 w-4" />;
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'error': return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'warning': return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case 'success': return <Activity className="h-4 w-4 text-green-600" />;
      default: return <Bell className="h-4 w-4 text-blue-600" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <span className="text-4xl">{portal.icon}</span>
        <div>
          <h1 className="text-3xl font-bold">
            {language === 'ar' ? portal.nameAr : portal.name}
          </h1>
          <p className="text-gray-600">
            {language === 'ar' ? 'لوحة تحكم البوابة' : 'Portal Dashboard'}
          </p>
        </div>
        <div className="ml-auto">
          <Badge variant={portal.isActive ? "default" : "secondary"}>
            {portal.isActive 
              ? (language === 'ar' ? 'نشط' : 'Active')
              : (language === 'ar' ? 'غير نشط' : 'Inactive')
            }
          </Badge>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'ar' ? 'إجمالي المستخدمين' : 'Total Users'}
                </p>
                <p className="text-2xl font-bold">{dashboard.stats.totalUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'ar' ? 'المستخدمون النشطون' : 'Active Users'}
                </p>
                <p className="text-2xl font-bold">{dashboard.stats.activeUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'ar' ? 'إجمالي المعاملات' : 'Total Transactions'}
                </p>
                <p className="text-2xl font-bold">{dashboard.stats.totalTransactions}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'ar' ? 'معدل النمو' : 'Growth Rate'}
                </p>
                <p className="text-2xl font-bold">{dashboard.stats.growthRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">
            {language === 'ar' ? 'نظرة عامة' : 'Overview'}
          </TabsTrigger>
          <TabsTrigger value="activity">
            {language === 'ar' ? 'النشاط' : 'Activity'}
          </TabsTrigger>
          <TabsTrigger value="notifications">
            {language === 'ar' ? 'الإشعارات' : 'Notifications'}
          </TabsTrigger>
          <TabsTrigger value="settings">
            {language === 'ar' ? 'الإعدادات' : 'Settings'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'ar' ? 'أداء البوابة' : 'Portal Performance'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>{language === 'ar' ? 'الإيرادات' : 'Revenue'}</span>
                    <Badge variant="outline">${dashboard.stats.revenue}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>{language === 'ar' ? 'متوسط التقييم' : 'Average Rating'}</span>
                    <Badge variant="outline">{dashboard.stats.averageRating}/5</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>{language === 'ar' ? 'معدل النمو' : 'Growth Rate'}</span>
                    <Badge variant="outline">{dashboard.stats.growthRate}%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'ar' ? 'الميزات المتاحة' : 'Available Features'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {portal.features.map((feature) => (
                    <div key={feature.id} className="flex items-center justify-between">
                      <span className="text-sm">
                        {language === 'ar' ? feature.nameAr : feature.name}
                      </span>
                      <Button
                        size="sm"
                        variant={feature.isEnabled ? "default" : "outline"}
                        onClick={() => onToggleFeature(feature.id)}
                      >
                        {feature.isEnabled 
                          ? (language === 'ar' ? 'مفعل' : 'Enabled')
                          : (language === 'ar' ? 'معطل' : 'Disabled')
                        }
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'ar' ? 'النشاط الأخير' : 'Recent Activity'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {dashboard.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    {getActivityIcon(activity.action)}
                    <div className="flex-1">
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-gray-600">
                        {language === 'ar' ? 'بواسطة' : 'By'} {activity.userName}
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
              <CardTitle>
                {language === 'ar' ? 'الإشعارات' : 'Notifications'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {dashboard.notifications.map((notification) => (
                  <div key={notification.id} className="flex items-start gap-3 p-3 border rounded-lg">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1">
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
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'ar' ? 'إعدادات البوابة' : 'Portal Settings'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">
                      {language === 'ar' ? 'بوابة عامة' : 'Public Portal'}
                    </p>
                    <p className="text-sm text-gray-600">
                      {language === 'ar' ? 'السماح للجميع بالوصول' : 'Allow public access'}
                    </p>
                  </div>
                  <Badge variant={dashboard.settings.isPublic ? "default" : "secondary"}>
                    {dashboard.settings.isPublic 
                      ? (language === 'ar' ? 'مفعل' : 'Enabled')
                      : (language === 'ar' ? 'معطل' : 'Disabled')
                    }
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">
                      {language === 'ar' ? 'الموافقة التلقائية' : 'Auto Approval'}
                    </p>
                    <p className="text-sm text-gray-600">
                      {language === 'ar' ? 'الموافقة التلقائية على الطلبات' : 'Automatically approve requests'}
                    </p>
                  </div>
                  <Badge variant={dashboard.settings.autoApproval ? "default" : "secondary"}>
                    {dashboard.settings.autoApproval 
                      ? (language === 'ar' ? 'مفعل' : 'Enabled')
                      : (language === 'ar' ? 'معطل' : 'Disabled')
                    }
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">
                      {language === 'ar' ? 'الحد الأقصى للمشاركين' : 'Max Participants'}
                    </p>
                    <p className="text-sm text-gray-600">
                      {language === 'ar' ? 'عدد المشاركين المسموح' : 'Maximum allowed participants'}
                    </p>
                  </div>
                  <Badge variant="outline">{dashboard.settings.maxParticipants}</Badge>
                </div>

                <Button onClick={() => onUpdateSettings(dashboard.settings)}>
                  {language === 'ar' ? 'حفظ الإعدادات' : 'Save Settings'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PortalDashboard;
