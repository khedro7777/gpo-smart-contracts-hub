
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { GroupManagerDashboard as GroupManagerDashboardType } from '@/types/dashboard';
import { 
  Users, 
  UserPlus, 
  UserMinus, 
  BarChart3, 
  Settings, 
  FileText,
  TrendingUp,
  Calendar,
  MessageSquare,
  Award
} from 'lucide-react';

interface GroupManagerDashboardProps {
  dashboard: GroupManagerDashboardType;
  onInviteMember: (email: string) => void;
  onRemoveMember: (memberId: string) => void;
  onUpdateGroup: (groupData: any) => void;
  onGenerateReport: () => void;
}

const GroupManagerDashboard: React.FC<GroupManagerDashboardProps> = ({
  dashboard,
  onInviteMember,
  onRemoveMember,
  onUpdateGroup,
  onGenerateReport
}) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [inviteEmail, setInviteEmail] = useState('');

  const handleInviteMember = () => {
    if (inviteEmail.trim()) {
      onInviteMember(inviteEmail);
      setInviteEmail('');
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{dashboard.groupName}</h1>
          <p className="text-gray-600">
            {language === 'ar' ? 'لوحة مدير المجموعة' : 'Group Manager Dashboard'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">
            {dashboard.memberCount} {language === 'ar' ? 'عضو' : 'Members'}
          </Badge>
          <Button onClick={onGenerateReport}>
            <FileText className="h-4 w-4 mr-2" />
            {language === 'ar' ? 'تقرير' : 'Report'}
          </Button>
        </div>
      </div>

      {/* Group Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'ar' ? 'الأعضاء' : 'Members'}
                </p>
                <p className="text-2xl font-bold">{dashboard.memberCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'ar' ? 'المشاريع النشطة' : 'Active Projects'}
                </p>
                <p className="text-2xl font-bold">{dashboard.groupStats.activeProjects}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'ar' ? 'المشاريع المكتملة' : 'Completed Projects'}
                </p>
                <p className="text-2xl font-bold">{dashboard.groupStats.completedProjects}</p>
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
                  {language === 'ar' ? 'مستوى التفاعل' : 'Engagement'}
                </p>
                <p className="text-2xl font-bold">{dashboard.groupStats.memberEngagement}%</p>
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
          <TabsTrigger value="members">
            {language === 'ar' ? 'الأعضاء' : 'Members'}
          </TabsTrigger>
          <TabsTrigger value="projects">
            {language === 'ar' ? 'المشاريع' : 'Projects'}
          </TabsTrigger>
          <TabsTrigger value="reports">
            {language === 'ar' ? 'التقارير' : 'Reports'}
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
                  {language === 'ar' ? 'أداء المجموعة' : 'Group Performance'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Average Rating</span>
                    <Badge variant="outline">{dashboard.groupStats.averageRating}/5</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Member Engagement</span>
                    <Badge variant="outline">{dashboard.groupStats.memberEngagement}%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Project Success Rate</span>
                    <Badge variant="outline">
                      {Math.round((dashboard.groupStats.completedProjects / 
                        (dashboard.groupStats.activeProjects + dashboard.groupStats.completedProjects)) * 100)}%
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'ar' ? 'الصلاحيات المتاحة' : 'Available Permissions'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Invite Members</span>
                    <Badge variant={dashboard.permissions.canInviteMembers ? "default" : "secondary"}>
                      {dashboard.permissions.canInviteMembers ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Remove Members</span>
                    <Badge variant={dashboard.permissions.canRemoveMembers ? "default" : "secondary"}>
                      {dashboard.permissions.canRemoveMembers ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Modify Group</span>
                    <Badge variant={dashboard.permissions.canModifyGroup ? "default" : "secondary"}>
                      {dashboard.permissions.canModifyGroup ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">View Reports</span>
                    <Badge variant={dashboard.permissions.canViewReports ? "default" : "secondary"}>
                      {dashboard.permissions.canViewReports ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="members" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{language === 'ar' ? 'إدارة الأعضاء' : 'Member Management'}</span>
                {dashboard.pendingInvitations > 0 && (
                  <Badge variant="outline">
                    {dashboard.pendingInvitations} {language === 'ar' ? 'دعوة معلقة' : 'Pending Invitations'}
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {dashboard.permissions.canInviteMembers && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium mb-2">
                    {language === 'ar' ? 'دعوة عضو جديد' : 'Invite New Member'}
                  </h3>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      placeholder={language === 'ar' ? 'البريد الإلكتروني' : 'Email address'}
                      className="flex-1 px-3 py-2 border rounded-md"
                    />
                    <Button onClick={handleInviteMember}>
                      <UserPlus className="h-4 w-4 mr-2" />
                      {language === 'ar' ? 'دعوة' : 'Invite'}
                    </Button>
                  </div>
                </div>
              )}
              
              <div className="space-y-3">
                <p className="text-sm text-gray-600">
                  {language === 'ar' ? 'الأعضاء الحاليون:' : 'Current Members:'}
                </p>
                {/* Member list would be populated from props */}
                <div className="text-center py-8 text-gray-500">
                  {language === 'ar' ? 'قائمة الأعضاء قيد التطوير' : 'Member list under development'}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'ar' ? 'إدارة المشاريع' : 'Project Management'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-medium text-green-800">
                    {language === 'ar' ? 'المشاريع النشطة' : 'Active Projects'}
                  </h3>
                  <p className="text-2xl font-bold text-green-600">
                    {dashboard.groupStats.activeProjects}
                  </p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-medium text-blue-800">
                    {language === 'ar' ? 'المشاريع المكتملة' : 'Completed Projects'}
                  </h3>
                  <p className="text-2xl font-bold text-blue-600">
                    {dashboard.groupStats.completedProjects}
                  </p>
                </div>
              </div>
              <div className="mt-4 text-center py-8 text-gray-500">
                {language === 'ar' ? 'تفاصيل المشاريع قيد التطوير' : 'Project details under development'}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'ar' ? 'التقارير والتحليلات' : 'Reports & Analytics'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {dashboard.permissions.canViewReports ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium">Performance Report</h3>
                      <p className="text-sm text-gray-600">Group performance metrics</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        {language === 'ar' ? 'إنشاء' : 'Generate'}
                      </Button>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium">Member Engagement</h3>
                      <p className="text-sm text-gray-600">Engagement analytics</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        {language === 'ar' ? 'إنشاء' : 'Generate'}
                      </Button>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium">Project Summary</h3>
                      <p className="text-sm text-gray-600">Project completion report</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        {language === 'ar' ? 'إنشاء' : 'Generate'}
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  {language === 'ar' 
                    ? 'ليس لديك صلاحية لعرض التقارير'
                    : 'You do not have permission to view reports'
                  }
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'ar' ? 'إعدادات المجموعة' : 'Group Settings'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {dashboard.permissions.canModifyGroup ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {language === 'ar' ? 'اسم المجموعة' : 'Group Name'}
                    </label>
                    <input
                      type="text"
                      defaultValue={dashboard.groupName}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {language === 'ar' ? 'الوحدات المتاحة' : 'Available Modules'}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {dashboard.modules.map((module) => (
                        <Badge key={module} variant="outline">
                          {module}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button onClick={() => onUpdateGroup({})}>
                    {language === 'ar' ? 'حفظ الإعدادات' : 'Save Settings'}
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  {language === 'ar' 
                    ? 'ليس لديك صلاحية لتعديل إعدادات المجموعة'
                    : 'You do not have permission to modify group settings'
                  }
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GroupManagerDashboard;
