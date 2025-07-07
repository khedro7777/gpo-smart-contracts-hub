
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import { ActiveGroup, GroupMembership, NegotiationSession } from '@/types/gateway';
import WorkflowManager from '../workflow/WorkflowManager';
import { 
  Users, 
  DollarSign, 
  Calendar, 
  FileText, 
  MessageSquare, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Settings,
  Share2,
  Download
} from 'lucide-react';

interface EnhancedGroupManagementProps {
  group: ActiveGroup;
  membership: GroupMembership;
  onGroupUpdate?: (group: ActiveGroup) => void;
  onMembershipUpdate?: (membership: GroupMembership) => void;
}

const EnhancedGroupManagement: React.FC<EnhancedGroupManagementProps> = ({
  group,
  membership,
  onGroupUpdate,
  onMembershipUpdate
}) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [groupData, setGroupData] = useState<ActiveGroup>(group);
  const [membershipData, setMembershipData] = useState<GroupMembership>(membership);

  // Mock data for demonstration
  const [negotiations] = useState<NegotiationSession[]>([
    {
      id: '1',
      groupId: group.id,
      title: language === 'ar' ? 'تفاوض المورد الرئيسي' : 'Main Supplier Negotiation',
      description: language === 'ar' ? 'تفاوض حول الأسعار والشروط' : 'Negotiating prices and terms',
      status: 'active',
      participants: ['supplier1', 'member1', 'member2'],
      currentOffer: { amount: 50000, terms: '30 days payment' },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]);

  const [groupMetrics] = useState({
    totalContributions: 45000,
    averageContribution: 2250,
    expectedSavings: 15.5,
    complianceScore: 94,
    riskScore: 23,
    participationRate: 87
  });

  const getPhaseColor = (phase: string) => {
    const phaseColors: Record<string, string> = {
      'formation': 'bg-blue-100 text-blue-800',
      'recruitment': 'bg-yellow-100 text-yellow-800',
      'negotiation': 'bg-purple-100 text-purple-800',
      'execution': 'bg-green-100 text-green-800',
      'completion': 'bg-gray-100 text-gray-800'
    };
    return phaseColors[phase] || 'bg-gray-100 text-gray-800';
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

  const handleContribute = () => {
    // Implementation for contribution
    console.log('Contributing to group');
  };

  const handleInviteMembers = () => {
    // Implementation for inviting members
    console.log('Inviting members');
  };

  const handleStartNegotiation = () => {
    // Implementation for starting negotiation
    console.log('Starting negotiation');
  };

  return (
    <div className="space-y-6">
      {/* Group Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-2xl mb-2 flex items-center gap-3">
                {groupData.name}
                <Badge className={getPhaseColor(groupData.currentPhase)}>
                  {getPhaseText(groupData.currentPhase)}
                </Badge>
              </CardTitle>
              <p className="text-gray-600 mb-4">{groupData.description}</p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{groupData.memberCount}</div>
                  <div className="text-sm text-gray-600">
                    {language === 'ar' ? 'عضو' : 'Members'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    ${groupData.currentAmount?.toLocaleString() || 0}
                  </div>
                  <div className="text-sm text-gray-600">
                    {language === 'ar' ? 'مساهم' : 'Contributed'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {groupData.pointsRequired || 0}
                  </div>
                  <div className="text-sm text-gray-600">
                    {language === 'ar' ? 'نقاط مطلوبة' : 'Points Required'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {groupData.complianceLevel || 0}%
                  </div>
                  <div className="text-sm text-gray-600">
                    {language === 'ar' ? 'الامتثال' : 'Compliance'}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col gap-2">
              <Button onClick={handleContribute} className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                {language === 'ar' ? 'مساهمة' : 'Contribute'}
              </Button>
              <Button variant="outline" onClick={handleInviteMembers} className="flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                {language === 'ar' ? 'دعوة' : 'Invite'}
              </Button>
              {membershipData.role === 'admin' && (
                <Button variant="outline" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  {language === 'ar' ? 'إعدادات' : 'Settings'}
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">
            {language === 'ar' ? 'نظرة عامة' : 'Overview'}
          </TabsTrigger>
          <TabsTrigger value="workflow">
            {language === 'ar' ? 'سير العمل' : 'Workflow'}
          </TabsTrigger>
          <TabsTrigger value="negotiations">
            {language === 'ar' ? 'التفاوض' : 'Negotiations'}
          </TabsTrigger>
          <TabsTrigger value="documents">
            {language === 'ar' ? 'المستندات' : 'Documents'}
          </TabsTrigger>
          <TabsTrigger value="analytics">
            {language === 'ar' ? 'التحليلات' : 'Analytics'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Progress Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  {language === 'ar' ? 'تقدم المجموعة' : 'Group Progress'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{language === 'ar' ? 'الأعضاء' : 'Members'}</span>
                    <span>{groupData.memberCount} / {groupData.maxMembers}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(groupData.memberCount / (groupData.maxMembers || 1)) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                {groupData.targetAmount && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{language === 'ar' ? 'المبلغ المستهدف' : 'Target Amount'}</span>
                      <span>${groupData.currentAmount?.toLocaleString()} / ${groupData.targetAmount.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${((groupData.currentAmount || 0) / groupData.targetAmount) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  {language === 'ar' ? 'تقييم المخاطر' : 'Risk Assessment'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{language === 'ar' ? 'مستوى المخاطر' : 'Risk Level'}</span>
                    <Badge className={
                      groupData.riskLevel === 'low' ? 'bg-green-100 text-green-800' :
                      groupData.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }>
                      {groupData.riskLevel}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{language === 'ar' ? 'درجة الامتثال' : 'Compliance Score'}</span>
                    <span className="text-sm font-medium">{groupData.complianceLevel || 0}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{language === 'ar' ? 'التحقق من KYC' : 'KYC Verification'}</span>
                    {groupData.kycRequired ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <Clock className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Requirements & Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {groupData.requirements && groupData.requirements.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>{language === 'ar' ? 'المتطلبات' : 'Requirements'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {groupData.requirements.map((req, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        {req}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {groupData.benefits && groupData.benefits.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>{language === 'ar' ? 'الفوائد' : 'Benefits'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {groupData.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="workflow">
          <WorkflowManager 
            steps={[
              {
                id: '1',
                title: language === 'ar' ? 'تكوين المجموعة' : 'Group Formation',
                description: language === 'ar' ? 'إنشاء وتكوين المجموعة' : 'Create and configure group',
                status: 'completed',
                requirements: [language === 'ar' ? 'تحديد الأهداف' : 'Define objectives'],
                completedAt: new Date().toISOString()
              },
              {
                id: '2',
                title: language === 'ar' ? 'تجميع الأعضاء' : 'Member Recruitment',
                description: language === 'ar' ? 'دعوة وتجميع الأعضاء' : 'Invite and recruit members',
                status: 'in_progress',
                requirements: [language === 'ar' ? 'الوصول للحد الأدنى من الأعضاء' : 'Reach minimum members']
              },
              {
                id: '3',
                title: language === 'ar' ? 'تحديد المتطلبات' : 'Requirements Definition',
                description: language === 'ar' ? 'تحديد المتطلبات التفصيلية' : 'Define detailed requirements',
                status: 'pending',
                requirements: [language === 'ar' ? 'مواصفات تقنية' : 'Technical specifications']
              }
            ]}
            canEdit={membershipData.role === 'admin'}
            onStepUpdate={(stepId, status) => {
              console.log(`Step ${stepId} updated to ${status}`);
            }}
          />
        </TabsContent>

        <TabsContent value="negotiations">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">
                {language === 'ar' ? 'جلسات التفاوض' : 'Negotiation Sessions'}
              </h3>
              <Button onClick={handleStartNegotiation} className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                {language === 'ar' ? 'بدء تفاوض' : 'Start Negotiation'}
              </Button>
            </div>

            {negotiations.map((negotiation) => (
              <Card key={negotiation.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{negotiation.title}</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{negotiation.description}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      {negotiation.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <span className="text-sm font-medium">
                        {language === 'ar' ? 'المشاركون' : 'Participants'}
                      </span>
                      <p className="text-sm text-gray-600">
                        {negotiation.participants.length} {language === 'ar' ? 'مشارك' : 'participants'}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium">
                        {language === 'ar' ? 'العرض الحالي' : 'Current Offer'}
                      </span>
                      <p className="text-sm text-gray-600">
                        ${negotiation.currentOffer?.amount.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium">
                        {language === 'ar' ? 'تاريخ البدء' : 'Started'}
                      </span>
                      <p className="text-sm text-gray-600">
                        {new Date(negotiation.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline">
                      {language === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                    </Button>
                    <Button size="sm" variant="outline">
                      {language === 'ar' ? 'انضم للتفاوض' : 'Join Negotiation'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="documents">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">
                {language === 'ar' ? 'مستندات المجموعة' : 'Group Documents'}
              </h3>
              <Button className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                {language === 'ar' ? 'رفع مستند' : 'Upload Document'}
              </Button>
            </div>

            {groupData.documents && groupData.documents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {groupData.documents.map((doc) => (
                  <Card key={doc.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <FileText className="h-8 w-8 text-blue-600" />
                        <div className="flex-1">
                          <h4 className="font-medium">{doc.name}</h4>
                          <p className="text-sm text-gray-600">{doc.type}</p>
                          <Badge className={
                            doc.status === 'approved' ? 'bg-green-100 text-green-800' :
                            doc.status === 'rejected' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }>
                            {doc.status}
                          </Badge>
                        </div>
                        <Button size="sm" variant="outline" className="flex items-center gap-1">
                          <Download className="h-3 w-3" />
                          {language === 'ar' ? 'تحميل' : 'Download'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">
                    {language === 'ar' ? 'لا توجد مستندات مرفوعة بعد' : 'No documents uploaded yet'}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{language === 'ar' ? 'مقاييس المجموعة' : 'Group Metrics'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>{language === 'ar' ? 'إجمالي المساهمات' : 'Total Contributions'}</span>
                  <span className="font-bold">${groupMetrics.totalContributions.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>{language === 'ar' ? 'متوسط المساهمة' : 'Average Contribution'}</span>
                  <span className="font-bold">${groupMetrics.averageContribution.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>{language === 'ar' ? 'الوفورات المتوقعة' : 'Expected Savings'}</span>
                  <span className="font-bold text-green-600">{groupMetrics.expectedSavings}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>{language === 'ar' ? 'معدل المشاركة' : 'Participation Rate'}</span>
                  <span className="font-bold">{groupMetrics.participationRate}%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{language === 'ar' ? 'درجات الأداء' : 'Performance Scores'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>{language === 'ar' ? 'درجة الامتثال' : 'Compliance Score'}</span>
                    <span className="font-bold text-green-600">{groupMetrics.complianceScore}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${groupMetrics.complianceScore}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>{language === 'ar' ? 'درجة المخاطر' : 'Risk Score'}</span>
                    <span className="font-bold text-yellow-600">{groupMetrics.riskScore}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-600 h-2 rounded-full" 
                      style={{ width: `${groupMetrics.riskScore}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedGroupManagement;
