
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useGroups } from '@/hooks/useGroups';
import GroupRoom from '@/components/groups/GroupRoom';
import PremiumGate from '@/components/premium/PremiumGate';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home } from 'lucide-react';

const GroupRoomPage = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { groups, loading } = useGroups();
  const [group, setGroup] = useState(null);
  const [userRole, setUserRole] = useState<'member' | 'admin' | 'creator'>('member');
  const [membershipStatus, setMembershipStatus] = useState<'active' | 'pending' | 'awaiting_approval'>('active');

  useEffect(() => {
    if (groupId && groups.length > 0) {
      const foundGroup = groups.find(g => g.id === groupId);
      if (foundGroup) {
        setGroup(foundGroup);
        setUserRole('member');
        setMembershipStatus('active');
      }
    }
  }, [groupId, groups]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">
              {language === 'ar' ? 'جاري التحميل...' : 'Loading...'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!group) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/groups')}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {language === 'ar' ? 'العودة للمجموعات' : 'Back to Groups'}
            </Button>
          </div>
          
          <Card>
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-semibold mb-2">
                {language === 'ar' ? 'المجموعة غير موجودة' : 'Group Not Found'}
              </h3>
              <p className="text-gray-600 mb-4">
                {language === 'ar' 
                  ? 'لم يتم العثور على المجموعة المطلوبة'
                  : 'The requested group could not be found'
                }
              </p>
              <div className="flex gap-4 justify-center">
                <Button onClick={() => navigate('/groups')}>
                  {language === 'ar' ? 'تصفح المجموعات' : 'Browse Groups'}
                </Button>
                <Button variant="outline" onClick={() => navigate('/dashboard')}>
                  <Home className="h-4 w-4 mr-2" />
                  {language === 'ar' ? 'الرئيسية' : 'Dashboard'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <PremiumGate feature={language === 'ar' ? 'غرفة المجموعة' : 'Group Room'}>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/groups')}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {language === 'ar' ? 'العودة للمجموعات' : 'Back to Groups'}
            </Button>
          </div>
          
          <GroupRoom 
            group={group}
            userRole={userRole}
            membershipStatus={membershipStatus}
          />
        </div>
      </div>
    </PremiumGate>
  );
};

export default GroupRoomPage;
