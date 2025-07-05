
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import { useGroupVoting } from '@/hooks/useGroupVoting';
import { 
  Vote, 
  Users, 
  Shield, 
  AlertTriangle, 
  FileText, 
  Clock,
  CheckCircle,
  UserPlus,
  Gavel
} from 'lucide-react';

interface GroupGovernanceProps {
  groupId: string;
  userRole: 'member' | 'admin' | 'creator';
  currentPhase: string;
}

const GroupGovernance: React.FC<GroupGovernanceProps> = ({ 
  groupId, 
  userRole, 
  currentPhase 
}) => {
  const { language } = useLanguage();
  const { createAdminElection, votingSessions, loading } = useGroupVoting(groupId);
  const [activeGovernanceTab, setActiveGovernanceTab] = useState('elections');

  const handleCreateAdminElection = async () => {
    // Mock candidates - في التطبيق الحقيقي سيتم جلبهم من قاعدة البيانات
    const mockCandidates = [
      'user-1', 'user-2', 'user-3', 'user-4', 'user-5', 'user-6'
    ];
    
    await createAdminElection(groupId, currentPhase, mockCandidates);
  };

  const getPhaseDescription = (phase: string) => {
    switch (phase) {
      case 'pending_members':
        return language === 'ar' 
          ? 'في هذه المرحلة يتم انتظار انضمام الأعضاء الجدد'
          : 'In this phase, we are waiting for new members to join';
      case 'active':
        return language === 'ar'
          ? 'المجموعة نشطة ويمكن للأعضاء المشاركة في جميع الأنشطة'
          : 'The group is active and members can participate in all activities';
      case 'negotiation':
        return language === 'ar'
          ? 'مرحلة التفاوض مع الموردين والأطراف الخارجية'
          : 'Negotiation phase with suppliers and external parties';
      case 'contract':
        return language === 'ar'
          ? 'مرحلة إعداد وتوقيع العقود'
          : 'Contract preparation and signing phase';
      default:
        return language === 'ar' ? 'مرحلة غير محددة' : 'Undefined phase';
    }
  };

  const adminElections = votingSessions.filter(session => session.type === 'admin_election');
  const currentElection = adminElections.find(election => election.status === 'active');

  return (
    <div className="space-y-6">
      {/* Phase Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-600" />
            {language === 'ar' ? 'المرحلة الحالية' : 'Current Phase'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold capitalize">{currentPhase}</h3>
              <p className="text-gray-600">{getPhaseDescription(currentPhase)}</p>
            </div>
            <Badge className="bg-blue-100 text-blue-800">
              {language === 'ar' ? 'نشط' : 'Active'}
            </Badge>
          </div>
          
          {(userRole === 'admin' || userRole === 'creator') && !currentElection && (
            <Button 
              onClick={handleCreateAdminElection}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Vote className="h-4 w-4 mr-2" />
              {language === 'ar' ? 'بدء انتخاب المشرفين' : 'Start Admin Election'}
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Governance Tabs */}
      <Tabs value={activeGovernanceTab} onValueChange={setActiveGovernanceTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="elections" className="flex items-center gap-2">
            <Vote className="h-4 w-4" />
            {language === 'ar' ? 'الانتخابات' : 'Elections'}
          </TabsTrigger>
          <TabsTrigger value="admins" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            {language === 'ar' ? 'المشرفون' : 'Admins'}
          </TabsTrigger>
          <TabsTrigger value="decisions" className="flex items-center gap-2">
            <Gavel className="h-4 w-4" />
            {language === 'ar' ? 'القرارات' : 'Decisions'}
          </TabsTrigger>
          <TabsTrigger value="external" className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            {language === 'ar' ? 'الأطراف الخارجية' : 'External Parties'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="elections" className="mt-6">
          <div className="space-y-4">
            {currentElection && (
              <Card className="border-l-4 border-l-purple-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Vote className="h-5 w-5 text-purple-600" />
                    {currentElection.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{currentElection.description}</p>
                  <div className="flex items-center gap-4">
                    <Badge className="bg-green-100 text-green-800">
                      {language === 'ar' ? 'جاري التصويت' : 'Voting Active'}
                    </Badge>
                    {currentElection.deadline && (
                      <span className="text-sm text-gray-600">
                        {language === 'ar' ? 'ينتهي:' : 'Ends:'} {' '}
                        {new Date(currentElection.deadline).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {adminElections.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <Vote className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {language === 'ar' ? 'لا توجد انتخابات' : 'No Elections'}
                  </h3>
                  <p className="text-gray-600">
                    {language === 'ar' 
                      ? 'لم يتم إجراء أي انتخابات بعد في هذه المجموعة'
                      : 'No elections have been conducted in this group yet'
                    }
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Past Elections */}
            {adminElections.filter(e => e.status === 'completed').map((election) => (
              <Card key={election.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      {election.title}
                    </CardTitle>
                    <Badge variant="outline" className="text-green-600">
                      {language === 'ar' ? 'مكتمل' : 'Completed'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-2">{election.description}</p>
                  <p className="text-sm text-gray-500">
                    {language === 'ar' ? 'اكتمل في:' : 'Completed on:'} {' '}
                    {new Date(election.created_at).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="admins" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                {language === 'ar' ? 'المشرفون الحاليون' : 'Current Admins'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  {language === 'ar' 
                    ? 'سيتم عرض قائمة المشرفين الحاليين هنا'
                    : 'Current admins list will be displayed here'
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="decisions" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gavel className="h-5 w-5 text-purple-600" />
                {language === 'ar' ? 'القرارات المتخذة' : 'Decisions Made'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Gavel className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  {language === 'ar' 
                    ? 'سيتم عرض القرارات المتخذة في المجموعة هنا'
                    : 'Group decisions will be displayed here'
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="external" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-green-600" />
                {language === 'ar' ? 'الأطراف الخارجية' : 'External Parties'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <UserPlus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  {language === 'ar' 
                    ? 'سيتم عرض الموردين والأطراف الخارجية المضافة هنا'
                    : 'Added suppliers and external parties will be displayed here'
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GroupGovernance;
