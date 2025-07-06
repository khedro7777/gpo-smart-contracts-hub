
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { Users, Clock, TrendingUp } from 'lucide-react';
import { ActiveGroup, GatewayConfig } from '@/types/gateway';

interface GatewayPortalProps {
  config: GatewayConfig;
  activeGroups: ActiveGroup[];
}

const GatewayPortal: React.FC<GatewayPortalProps> = ({
  config,
  activeGroups
}) => {
  const { language } = useLanguage();
  const Icon = config.icon;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'seeking_members': return 'bg-blue-100 text-blue-800';
      case 'awaiting_supply': return 'bg-yellow-100 text-yellow-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'negotiation': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    const statusMap = {
      'seeking_members': language === 'ar' ? 'يبحث عن أعضاء' : 'Seeking Members',
      'awaiting_supply': language === 'ar' ? 'في انتظار العرض' : 'Awaiting Supply',
      'active': language === 'ar' ? 'نشط' : 'Active',
      'negotiation': language === 'ar' ? 'في التفاوض' : 'In Negotiation'
    };
    return statusMap[status as keyof typeof statusMap] || status;
  };

  const getPhaseText = (phase: string) => {
    const phaseMap = {
      'formation': language === 'ar' ? 'التكوين' : 'Formation',
      'recruitment': language === 'ar' ? 'التوظيف' : 'Recruitment',
      'negotiation': language === 'ar' ? 'التفاوض' : 'Negotiation',
      'execution': language === 'ar' ? 'التنفيذ' : 'Execution',
      'completion': language === 'ar' ? 'الاكتمال' : 'Completion'
    };
    return phaseMap[phase as keyof typeof phaseMap] || phase;
  };

  return (
    <div className="space-y-6">
      {/* Portal Header */}
      <Card className={`border-l-4 ${config.color} hover:shadow-lg transition-shadow`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${config.color.replace('border-l-', 'bg-').replace('-500', '-100')} text-white`}>
                <Icon className="h-8 w-8" />
              </div>
              <div>
                <CardTitle className="text-2xl">{config.title}</CardTitle>
                <p className="text-gray-600 mt-2">{config.description}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {config.requiresKyc && (
                <Badge variant="outline" className="text-orange-600">
                  {language === 'ar' ? 'يتطلب KYC' : 'KYC Required'}
                </Badge>
              )}
              {config.requiresPoints && (
                <Badge variant="outline" className="text-blue-600">
                  {language === 'ar' ? 'يتطلب نقاط' : 'Points Required'}
                </Badge>
              )}
              {config.requiresMcp && (
                <Badge variant="outline" className="text-green-600">
                  {language === 'ar' ? 'اختبار MCP' : 'MCP Exam'}
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-600">
            {activeGroups.length} {language === 'ar' ? 'مجموعة نشطة' : 'Active Groups'}
          </div>
        </CardContent>
      </Card>

      {/* Active Groups */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activeGroups.slice(0, 6).map((group) => (
          <Card key={group.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg line-clamp-1">{group.name}</CardTitle>
                <Badge className={getStatusColor(group.status)}>
                  {getStatusText(group.status)}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2">{group.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Group Stats */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span>{group.memberCount}{group.maxMembers ? `/${group.maxMembers}` : ''}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span>{getPhaseText(group.currentPhase)}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all" 
                  style={{ 
                    width: group.maxMembers 
                      ? `${(group.memberCount / group.maxMembers) * 100}%` 
                      : '50%' 
                  }}
                ></div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Link to={`/groups/${group.id}/room`} className="flex-1">
                  <Button size="sm" className="w-full">
                    {language === 'ar' ? 'انضم' : 'Join'}
                  </Button>
                </Link>
                <Button size="sm" variant="outline">
                  {language === 'ar' ? 'عرض' : 'Submit Offer'}
                </Button>
                <Button size="sm" variant="ghost">
                  {language === 'ar' ? 'تواصل' : 'Contact'}
                </Button>
              </div>

              {group.pointsRequired && group.pointsRequired > 0 && (
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  {group.pointsRequired} {language === 'ar' ? 'نقطة مطلوبة' : 'points required'}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {activeGroups.length > 6 && (
        <div className="text-center">
          <Button variant="outline">
            {language === 'ar' ? 'عرض جميع المجموعات' : 'View All Groups'} 
            ({activeGroups.length})
          </Button>
        </div>
      )}
    </div>
  );
};

export default GatewayPortal;
