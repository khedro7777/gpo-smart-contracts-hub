
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import type { SuperAdminDashboard as SuperAdminDashboardType, ModuleDashboard, UserRole, ActivityLog } from '@/types/dashboard';
import { 
  Users, 
  Settings, 
  Activity, 
  TrendingUp, 
  Shield, 
  Plus,
  Trash2,
  Edit,
  Power,
  AlertTriangle
} from 'lucide-react';

interface SuperAdminDashboardProps {
  dashboard: SuperAdminDashboardType;
  onCreateModule: (moduleData: any) => void;
  onEditModule: (moduleId: string, moduleData: any) => void;
  onDeleteModule: (moduleId: string) => void;
  onToggleModule: (moduleId: string) => void;
  onAssignRole: (userId: string, role: string) => void;
  onRevokeRole: (userId: string, role: string) => void;
}

const SuperAdminDashboard: React.FC<SuperAdminDashboardProps> = ({
  dashboard,
  onCreateModule,
  onEditModule,
  onDeleteModule,
  onToggleModule,
  onAssignRole,
  onRevokeRole
}) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');

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

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'super_admin': return 'bg-red-100 text-red-800';
      case 'group_manager': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {language === 'ar' ? 'لوحة المدير العام' : 'Super Admin Dashboard'}
          </h1>
          <p className="text-gray-600 mt-1">
            {language === 'ar' ? 'إدارة النظام الكامل' : 'Complete System Management'}
          </p>
        </div>
        <Button onClick={() => onCreateModule({})}>
          <Plus className="h-4 w-4 mr-2" />
          {language === 'ar' ? 'إنشاء وحدة' : 'Create Module'}
        </Button>
      </div>

      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'ar' ? 'إجمالي المستخدمين' : 'Total Users'}
                </p>
                <p className="text-2xl font-bold">{dashboard.totalStats.totalUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'ar' ? 'المجموعات النشطة' : 'Active Groups'}
                </p>
                <p className="text-2xl font-bold">{dashboard.totalStats.activeGroups}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'ar' ? 'وقت التشغيل' : 'System Uptime'}
                </p>
                <p className="text-2xl font-bold">{dashboard.systemHealth.uptime}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'ar' ? 'معدل الأخطاء' : 'Error Rate'}
                </p>
                <p className="text-2xl font-bold">{dashboard.systemHealth.errorRate}%</p>
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
          <TabsTrigger value="modules">
            {language === 'ar' ? 'الوحدات' : 'Modules'}
          </TabsTrigger>
          <TabsTrigger value="users">
            {language === 'ar' ? 'المستخدمين' : 'Users'}
          </TabsTrigger>
          <TabsTrigger value="activity">
            {language === 'ar' ? 'النشاط' : 'Activity'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'ar' ? 'أداء الوحدات' : 'Module Performance'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboard.modules.map((module) => (
                    <div key={module.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{getModuleIcon(module.type)}</span>
                        <div>
                          <p className="font-medium">{module.name}</p>
                          <p className="text-sm text-gray-600">
                            {module.stats.activeUsers} active users
                          </p>
                        </div>
                      </div>
                      <Badge variant={module.isActive ? "default" : "secondary"}>
                        {module.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'ar' ? 'النشاط الأخير' : 'Recent Activity'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dashboard.recentActivity.slice(0, 5).map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-gray-600">
                          {activity.userName} • {activity.module}
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
          </div>
        </TabsContent>

        <TabsContent value="modules" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'ar' ? 'إدارة الوحدات' : 'Module Management'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboard.modules.map((module) => (
                  <div key={module.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{getModuleIcon(module.type)}</span>
                      <div>
                        <h3 className="font-semibold">{module.name}</h3>
                        <p className="text-sm text-gray-600">{module.type}</p>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline">
                            {module.stats.activeUsers} users
                          </Badge>
                          <Badge variant="outline">
                            ${module.stats.revenue}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onToggleModule(module.id)}
                      >
                        <Power className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEditModule(module.id, module)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDeleteModule(module.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'ar' ? 'إدارة المستخدمين والأدوار' : 'User & Role Management'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboard.userRoles.map((userRole) => (
                  <div key={userRole.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Shield className="h-8 w-8 text-gray-400" />
                      <div>
                        <p className="font-medium">{userRole.userName}</p>
                        <Badge className={getRoleColor(userRole.role)}>
                          {userRole.role}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onAssignRole(userRole.userId, 'group_manager')}
                      >
                        {language === 'ar' ? 'تعيين مدير' : 'Assign Manager'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onRevokeRole(userRole.userId, userRole.role)}
                      >
                        {language === 'ar' ? 'إلغاء الدور' : 'Revoke Role'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'ar' ? 'سجل النشاط الكامل' : 'Complete Activity Log'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {dashboard.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 border-l-4 border-blue-200 bg-gray-50 rounded">
                    <Activity className="h-4 w-4 text-blue-600 mt-1" />
                    <div className="flex-1">
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-gray-600">
                        User: {activity.userName} | Module: {activity.module}
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
      </Tabs>
    </div>
  );
};

export default SuperAdminDashboard;
