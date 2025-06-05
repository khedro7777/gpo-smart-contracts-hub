
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';
import { MessageSquare } from 'lucide-react';

const RecentActivitiesList: React.FC = () => {
  const { i18n } = useTranslation();

  const recentActivities = [
    {
      id: 1,
      type: 'group_created',
      title: i18n.language === 'ar' ? 'تم تكوين مجموعة الأجهزة التقنية' : 'Tech Hardware Collective formed',
      timestamp: '2 hours ago',
      status: 'active'
    },
    {
      id: 2,
      type: 'contract_signed',
      title: i18n.language === 'ar' ? 'تم تنفيذ عقد اللوازم الطبية' : 'Medical Supplies Contract executed',
      timestamp: '4 hours ago',
      status: 'completed'
    },
    {
      id: 3,
      type: 'arbitration_resolved',
      title: i18n.language === 'ar' ? 'تم حل نزاع مواد البناء' : 'Construction Materials dispute resolved',
      timestamp: '1 day ago',
      status: 'resolved'
    }
  ];

  return (
    <Card>
      <CardHeader className="pb-3 sm:pb-4">
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5" />
          {i18n.language === 'ar' ? 'الأنشطة الحديثة' : 'Recent Activities'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 sm:space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg">
              <div className="min-w-0 flex-1">
                <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{activity.title}</p>
                <p className="text-xs sm:text-sm text-gray-600">{activity.timestamp}</p>
              </div>
              <Badge variant={activity.status === 'completed' ? 'default' : 'secondary'} className="text-xs ml-2 flex-shrink-0">
                {activity.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivitiesList;
