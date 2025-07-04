
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { Group } from '@/hooks/useGroups';
import { 
  Users, 
  MessageSquare, 
  Vote, 
  FileText, 
  AlertTriangle, 
  Settings,
  TrendingUp,
  Clock
} from 'lucide-react';
import GroupDiscussions from './GroupDiscussions';
import GroupVoting from './GroupVoting';
import AdminPanel from './AdminPanel';

interface GroupRoomProps {
  group: Group;
  userRole: 'member' | 'admin' | 'creator';
  membershipStatus: 'active' | 'pending' | 'awaiting_approval';
}

const GroupRoom: React.FC<GroupRoomProps> = ({ group, userRole, membershipStatus }) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'pending_members': return 'bg-yellow-100 text-yellow-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'negotiation': return 'bg-blue-100 text-blue-800';
      case 'contract': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPhaseText = (phase: string) => {
    switch (phase) {
      case 'pending_members': return language === 'ar' ? 'انتظار الأعضاء' : 'Pending Members';
      case 'active': return language === 'ar' ? 'نشط' : 'Active';
      case 'negotiation': return language === 'ar' ? 'التفاوض' : 'Negotiation';
      case 'contract': return language === 'ar' ? 'العقد' : 'Contract';
      default: return phase;
    }
  };

  if (membershipStatus === 'awaiting_approval') {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardContent className="p-8 text-center">
            <Clock className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              {language === 'ar' ? 'في انتظار الموافقة' : 'Awaiting Approval'}
            </h3>
            <p className="text-gray-600">
              {language === 'ar' 
                ? 'طلب انضمامك قيد المراجعة من قبل مشرفي المجموعة'
                : 'Your join request is being reviewed by group administrators'
              }
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Group Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{group.name}</h1>
            <p className="text-gray-600">{group.description}</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className={getPhaseColor(group.current_phase || 'initial')}>
              {getPhaseText(group.current_phase || 'initial')}
            </Badge>
            {userRole === 'admin' && (
              <Badge variant="outline" className="text-blue-600">
                {language === 'ar' ? 'مشرف' : 'Admin'}
              </Badge>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">
                    {language === 'ar' ? 'الأعضاء' : 'Members'}
                  </p>
                  <p className="text-lg font-semibold">{group.member_count || 0}</p>
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
                    {language === 'ar' ? 'النقاط المطلوبة' : 'Points Required'}
                  </p>
                  <p className="text-lg font-semibold">{group.points_required || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Vote className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">
                    {language === 'ar' ? 'الجولة' : 'Round'}
                  </p>
                  <p className="text-lg font-semibold">{group.round_number || 1}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-600">
                    {language === 'ar' ? 'البوابة' : 'Gateway'}
                  </p>
                  <p className="text-lg font-semibold">{group.service_gateway}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            {language === 'ar' ? 'نظرة عامة' : 'Overview'}
          </TabsTrigger>
          <TabsTrigger value="discussions" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            {language === 'ar' ? 'المناقشات' : 'Discussions'}
          </TabsTrigger>
          <TabsTrigger value="voting" className="flex items-center gap-2">
            <Vote className="h-4 w-4" />
            {language === 'ar' ? 'التصويت' : 'Voting'}
          </TabsTrigger>
          <TabsTrigger value="files" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            {language === 'ar' ? 'الملفات' : 'Files'}
          </TabsTrigger>
          <TabsTrigger value="members" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            {language === 'ar' ? 'الأعضاء' : 'Members'}
          </TabsTrigger>
          {userRole === 'admin' && (
            <TabsTrigger value="admin" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              {language === 'ar' ? 'الإدارة' : 'Admin'}
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'ar' ? 'الهدف التجاري' : 'Business Objective'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  {group.business_objective || 
                    (language === 'ar' ? 'لم يتم تحديد الهدف التجاري' : 'No business objective specified')
                  }
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'ar' ? 'تفاصيل المجموعة' : 'Group Details'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {language === 'ar' ? 'النوع:' : 'Type:'}
                  </span>
                  <span className="font-medium">{group.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {language === 'ar' ? 'الحد الأدنى للأعضاء:' : 'Min Members:'}
                  </span>
                  <span className="font-medium">{group.min_members || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {language === 'ar' ? 'الحد الأقصى للأعضاء:' : 'Max Members:'}
                  </span>
                  <span className="font-medium">{group.max_members || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {language === 'ar' ? 'تاريخ الإنشاء:' : 'Created:'}
                  </span>
                  <span className="font-medium">
                    {new Date(group.created_at).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="discussions" className="mt-6">
          <GroupDiscussions groupId={group.id} />
        </TabsContent>

        <TabsContent value="voting" className="mt-6">
          <GroupVoting groupId={group.id} userRole={userRole} />
        </TabsContent>

        <TabsContent value="files" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'ar' ? 'الملفات والعقود' : 'Files & Contracts'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                {language === 'ar' 
                  ? 'سيتم إضافة نظام إدارة الملفات قريباً'
                  : 'File management system coming soon'
                }
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="members" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'ar' ? 'أعضاء المجموعة' : 'Group Members'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                {language === 'ar' 
                  ? 'قائمة الأعضاء قيد التطوير'
                  : 'Members list under development'
                }
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {userRole === 'admin' && (
          <TabsContent value="admin" className="mt-6">
            <AdminPanel groupId={group.id} />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default GroupRoom;
