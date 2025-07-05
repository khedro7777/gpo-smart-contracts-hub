
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import { ClientGroup } from '@/hooks/useClientData';
import { 
  Users, 
  Clock, 
  TrendingUp, 
  Vote, 
  Settings,
  Eye,
  UserPlus,
  MessageSquare
} from 'lucide-react';

interface ClientGroupsOverviewProps {
  groups: ClientGroup[];
  onGroupSelect: (groupId: string) => void;
}

const ClientGroupsOverview: React.FC<ClientGroupsOverviewProps> = ({ groups, onGroupSelect }) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('all');

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'pending_members': return 'bg-yellow-100 text-yellow-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'negotiation': return 'bg-blue-100 text-blue-800';
      case 'contract': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPhaseText = (phase: string) => {
    switch (phase) {
      case 'pending_members': return language === 'ar' ? 'انتظار الأعضاء' : 'Pending Members';
      case 'active': return language === 'ar' ? 'نشط' : 'Active';
      case 'negotiation': return language === 'ar' ? 'التفاوض' : 'Negotiation';
      case 'contract': return language === 'ar' ? 'العقد' : 'Contract';
      case 'completed': return language === 'ar' ? 'مكتمل' : 'Completed';
      default: return phase;
    }
  };

  const filterGroups = (status: string) => {
    if (status === 'all') return groups;
    return groups.filter(group => {
      switch (status) {
        case 'active':
          return group.current_phase === 'active' || group.current_phase === 'negotiation';
        case 'pending':
          return group.current_phase === 'pending_members';
        case 'completed':
          return group.current_phase === 'completed';
        default:
          return true;
      }
    });
  };

  const GroupCard = ({ group }: { group: ClientGroup }) => (
    <Card className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-500">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
              {group.name}
            </CardTitle>
            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
              {group.description}
            </p>
          </div>
          <Badge className={getPhaseColor(group.current_phase)}>
            {getPhaseText(group.current_phase)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Group Stats */}
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{group.member_count || 0} {language === 'ar' ? 'عضو' : 'members'}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>
                {language === 'ar' ? 'أنشئ في' : 'Created'} {' '}
                {new Date(group.created_at).toLocaleDateString(
                  language === 'ar' ? 'ar-SA' : 'en-US'
                )}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button 
              size="sm" 
              onClick={() => onGroupSelect(group.id)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Eye className="h-4 w-4 mr-2" />
              {language === 'ar' ? 'دخول الغرفة' : 'Enter Room'}
            </Button>
            
            <Button variant="outline" size="sm">
              <MessageSquare className="h-4 w-4 mr-2" />
              {language === 'ar' ? 'المناقشات' : 'Discussions'}
            </Button>
            
            <Button variant="outline" size="sm">
              <Vote className="h-4 w-4 mr-2" />
              {language === 'ar' ? 'التصويت' : 'Voting'}
            </Button>

            {group.current_phase === 'pending_members' && (
              <Button variant="outline" size="sm">
                <UserPlus className="h-4 w-4 mr-2" />
                {language === 'ar' ? 'دعوة أعضاء' : 'Invite Members'}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          {language === 'ar' ? 'مجموعاتي' : 'My Groups'}
        </h2>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <UserPlus className="h-4 w-4 mr-2" />
          {language === 'ar' ? 'إنشاء مجموعة جديدة' : 'Create New Group'}
        </Button>
      </div>

      {/* Groups Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">
            {language === 'ar' ? 'الكل' : 'All'} ({groups.length})
          </TabsTrigger>
          <TabsTrigger value="active">
            {language === 'ar' ? 'نشط' : 'Active'} ({filterGroups('active').length})
          </TabsTrigger>
          <TabsTrigger value="pending">
            {language === 'ar' ? 'معلق' : 'Pending'} ({filterGroups('pending').length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            {language === 'ar' ? 'مكتمل' : 'Completed'} ({filterGroups('completed').length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {filterGroups(activeTab).length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filterGroups(activeTab).map((group) => (
                <GroupCard key={group.id} group={group} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {language === 'ar' ? 'لا توجد مجموعات' : 'No Groups Found'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {language === 'ar' 
                    ? 'لم تنضم إلى أي مجموعة من هذا النوع بعد'
                    : "You haven't joined any groups of this type yet"
                  }
                </p>
                <Button>
                  {language === 'ar' ? 'استكشف المجموعات' : 'Explore Groups'}
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientGroupsOverview;
