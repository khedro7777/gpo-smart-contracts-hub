
import React from 'react';
import { useParams } from 'react-router-dom';
import { useGroupMembership } from '@/hooks/useGroupMembership';
import { useLanguage } from '@/contexts/LanguageContext';
import GroupRoom from '@/components/groups/GroupRoom';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Lock } from 'lucide-react';

const GroupRoomPage = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const { language } = useLanguage();
  const { membership, group, loading } = useGroupMembership(groupId);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">
            {language === 'ar' ? 'جاري التحميل...' : 'Loading...'}
          </p>
        </div>
      </div>
    );
  }

  if (!group) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card>
          <CardContent className="p-8 text-center">
            <Lock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {language === 'ar' ? 'المجموعة غير موجودة' : 'Group not found'}
            </h3>
            <p className="text-gray-600">
              {language === 'ar' 
                ? 'المجموعة المطلوبة غير موجودة أو تم حذفها'
                : 'The requested group does not exist or has been deleted'
              }
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!membership) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card>
          <CardContent className="p-8 text-center">
            <Lock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {language === 'ar' ? 'الوصول مقيد' : 'Access Restricted'}
            </h3>
            <p className="text-gray-600 mb-4">
              {language === 'ar' 
                ? 'هذه المجموعة متاحة للأعضاء والمشتركين فقط'
                : 'This group is only available to members and subscribers'
              }
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <GroupRoom 
        group={group}
        userRole={membership.role}
        membershipStatus={membership.status}
      />
    </div>
  );
};

export default GroupRoomPage;
