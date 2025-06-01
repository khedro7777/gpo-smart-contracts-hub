
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/utils/translations';

interface ActiveGroup {
  id: number;
  name: string;
  members: number;
  status: string;
  progress: number;
  lastActivity: string;
  type: string;
}

interface ActiveGroupCardProps {
  group: ActiveGroup;
}

const ActiveGroupCard: React.FC<ActiveGroupCardProps> = ({ group }) => {
  const { language } = useLanguage();
  
  const getStatusBadge = (status: string) => {
    if (status === 'Active' || status === 'نشط') {
      return <Badge className="bg-green-100 text-green-800">{status}</Badge>;
    } else if (status === 'RFQ Sent' || status === 'تم إرسال طلب العروض') {
      return <Badge className="bg-blue-100 text-blue-800">{status}</Badge>;
    } else {
      return <Badge className="bg-yellow-100 text-yellow-800">{status}</Badge>;
    }
  };
  
  const getProgressColor = (progress: number) => {
    if (progress < 30) return 'bg-red-500';
    if (progress < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle>{group.name}</CardTitle>
          {getStatusBadge(group.status)}
        </div>
        <CardDescription>
          <span className="flex items-center gap-2">
            <Users size={16} />
            {group.members} {t('members', language)}
          </span>
          <span className="text-xs block mt-1">{group.type}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">{t('progress', language)}</span>
              <span className="text-sm font-medium">{group.progress}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div 
                className={`h-2 rounded-full ${getProgressColor(group.progress)}`}
                style={{ width: `${group.progress}%` }}
              />
            </div>
          </div>
          <div className="text-sm text-gray-500">
            {t('lastActivity', language)}: {group.lastActivity}
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="w-full flex justify-end gap-2">
          <Button variant="outline" size="sm">
            {t('viewMembers', language)}
          </Button>
          <Button size="sm">
            {t('manageGroup', language)}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ActiveGroupCard;
