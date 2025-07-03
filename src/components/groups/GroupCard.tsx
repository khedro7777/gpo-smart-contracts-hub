
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useGroups, Group } from '@/hooks/useGroups';
import { Users, Calendar, Target, Eye } from 'lucide-react';

interface GroupCardProps {
  group: Group;
  onView?: (group: Group) => void;
}

const GroupCard: React.FC<GroupCardProps> = ({ group, onView }) => {
  const { language } = useLanguage();
  const { joinGroup } = useGroups();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return language === 'ar' ? 'نشط' : 'Active';
      case 'pending': return language === 'ar' ? 'معلق' : 'Pending';
      case 'completed': return language === 'ar' ? 'مكتمل' : 'Completed';
      default: return status;
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'procurement': return language === 'ar' ? 'شراء تعاوني' : 'Procurement';
      case 'marketing': return language === 'ar' ? 'تسويق تعاوني' : 'Marketing';
      case 'company_formation': return language === 'ar' ? 'تأسيس شركات' : 'Company Formation';
      case 'freelance': return language === 'ar' ? 'مستقلين' : 'Freelance';
      default: return type;
    }
  };

  const handleJoin = async () => {
    await joinGroup(group.id);
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{group.name}</CardTitle>
          <Badge className={getStatusColor(group.status)}>
            {getStatusText(group.status)}
          </Badge>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Badge variant="outline">{getTypeText(group.type)}</Badge>
          <Badge variant="outline">{group.service_gateway}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4 line-clamp-2">{group.description}</p>
        
        {group.business_objective && (
          <div className="flex items-start gap-2 mb-4">
            <Target className="h-4 w-4 text-blue-600 mt-0.5" />
            <p className="text-sm text-gray-700 line-clamp-2">{group.business_objective}</p>
          </div>
        )}

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{group.member_count || 0} {language === 'ar' ? 'عضو' : 'members'}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{new Date(group.created_at).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onView?.(group)}
            className="flex-1"
          >
            <Eye className="h-4 w-4 mr-2" />
            {language === 'ar' ? 'عرض' : 'View'}
          </Button>
          <Button 
            size="sm" 
            onClick={handleJoin}
            className="flex-1"
          >
            <Users className="h-4 w-4 mr-2" />
            {language === 'ar' ? 'انضمام' : 'Join'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GroupCard;
