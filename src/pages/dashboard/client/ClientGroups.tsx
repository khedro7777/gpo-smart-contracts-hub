
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import VotingSystem from '@/components/voting/VotingSystem';
import AddFreelancer from '@/components/freelancers/AddFreelancer';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/utils/translations';

const ClientGroups = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('active');
  
  // Mock data for active groups
  const activeGroups = [
    {
      id: 1,
      name: language === 'en' ? 'Office Equipment Purchase' : 'شراء معدات مكتبية',
      members: 12,
      status: language === 'en' ? 'Active' : 'نشط',
      progress: 70,
      lastActivity: language === 'en' ? '2 days ago' : 'منذ يومين',
      type: language === 'en' ? 'Purchasing Group' : 'مجموعة شراء',
    },
    {
      id: 2,
      name: language === 'en' ? 'Software Licenses' : 'تراخيص برمجية',
      members: 8,
      status: language === 'en' ? 'RFQ Sent' : 'تم إرسال طلب العروض',
      progress: 40,
      lastActivity: language === 'en' ? '1 week ago' : 'منذ أسبوع',
      type: language === 'en' ? 'Purchasing Group' : 'مجموعة شراء',
    },
  ];
  
  // Mock data for group invitations
  const groupInvitations = [
    {
      id: 3,
      name: language === 'en' ? 'IT Hardware Procurement' : 'شراء معدات تكنولوجيا المعلومات',
      invitedBy: language === 'en' ? 'Ahmed Mohamed' : 'أحمد محمد',
      members: 15,
      expiresIn: language === 'en' ? '3 days' : '3 أيام',
    },
    {
      id: 4,
      name: language === 'en' ? 'Cloud Services' : 'خدمات سحابية',
      invitedBy: language === 'en' ? 'Sara Ahmed' : 'سارة أحمد',
      members: 7,
      expiresIn: language === 'en' ? '5 days' : '5 أيام',
    },
  ];
  
  // Mock data for voting
  const votingOptions = [
    {
      id: 1,
      text: language === 'en' ? 'Accept supplier offer #1 (15,000 USD)' : 'قبول عرض المورد #1 (15,000 دولار)',
      votes: 8,
    },
    {
      id: 2,
      text: language === 'en' ? 'Accept supplier offer #2 (17,500 USD)' : 'قبول عرض المورد #2 (17,500 دولار)',
      votes: 3,
    },
    {
      id: 3,
      text: language === 'en' ? 'Request more information before deciding' : 'طلب مزيد من المعلومات قبل اتخاذ القرار',
      votes: 1,
    },
  ];
  
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
  
  const handleVote = (optionId: number) => {
    console.log(`Voted for option: ${optionId}`);
    // Here you would update the vote count in a real application
  };
  
  const handleInviteFreelancer = (freelancerId: number) => {
    console.log(`Invited freelancer: ${freelancerId}`);
    // Here you would handle the invitation in a real application
  };
  
  return (
    <DashboardLayout role="client">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            {t('myGroups', language)}
          </h2>
          <Button>
            {t('createNewGroup', language)}
          </Button>
        </div>
        
        <Tabs defaultValue="active" onValueChange={setActiveTab} value={activeTab}>
          <TabsList>
            <TabsTrigger value="active">{t('activeGroups', language)}</TabsTrigger>
            <TabsTrigger value="invitations">{t('invitations', language)}</TabsTrigger>
            <TabsTrigger value="voting">{t('voteSystem', language)}</TabsTrigger>
            <TabsTrigger value="freelancers">{t('freelancersList', language)}</TabsTrigger>
            <TabsTrigger value="discover">{t('discover', language)}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeGroups.map((group) => (
                <Card key={group.id} className="w-full">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle>{group.name}</CardTitle>
                      {getStatusBadge(group.status)}
                    </div>
                    <CardDescription>
                      <span className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
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
                          ></div>
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
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="invitations">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>{t('pendingInvitations', language)}</CardTitle>
                <CardDescription>
                  {t('groupInvitationsDesc', language)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {groupInvitations.map((invitation) => (
                    <div key={invitation.id} className="border rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{invitation.name}</h3>
                          <p className="text-sm text-gray-500">
                            {language === 'en' ? 'Invited by' : 'دعوة من'}: {invitation.invitedBy}
                          </p>
                          <p className="text-sm text-gray-500">
                            {invitation.members} {t('members', language)}
                          </p>
                          <p className="text-sm text-red-500 mt-1">
                            {language === 'en' ? 'Expires in' : 'تنتهي في'}: {invitation.expiresIn}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          {t('decline', language)}
                        </Button>
                        <Button size="sm">
                          {t('accept', language)}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="voting">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <VotingSystem
                title={language === 'en' ? 'Vote on Supplier Selection' : 'التصويت على اختيار المورد'}
                description={language === 'en' ? 'Please vote on the supplier offer for the Office Equipment Purchase' : 'الرجاء التصويت على عرض المورد لشراء معدات المكاتب'}
                options={votingOptions}
                totalVotes={12}
                requiredVotes={10}
                endDate={language === 'en' ? 'May 20, 2025' : '20 مايو 2025'}
                isOpen={true}
                onVote={handleVote}
              />
              
              <VotingSystem
                title={language === 'en' ? 'Vote on Contract Terms' : 'التصويت على شروط العقد'}
                options={[
                  {
                    id: 1,
                    text: language === 'en' ? 'Accept terms as presented' : 'قبول الشروط كما هي معروضة',
                    votes: 5,
                  },
                  {
                    id: 2,
                    text: language === 'en' ? 'Request modifications to payment terms' : 'طلب تعديلات على شروط الدفع',
                    votes: 3,
                  }
                ]}
                totalVotes={8}
                requiredVotes={6}
                endDate={language === 'en' ? 'May 15, 2025' : '15 مايو 2025'}
                isOpen={false}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="freelancers">
            <div className="grid grid-cols-1 gap-6">
              <AddFreelancer onInvite={handleInviteFreelancer} />
            </div>
          </TabsContent>
          
          <TabsContent value="discover">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>{t('discoverGroups', language)}</CardTitle>
                <CardDescription>
                  {t('discoverGroupsDesc', language)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-gray-400"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path></svg>
                  <h3 className="mt-4 text-lg font-semibold">{t('findGroups', language)}</h3>
                  <p className="mt-2 text-sm text-gray-500 max-w-sm mx-auto">
                    {t('findGroupsDesc', language)}
                  </p>
                  <Button className="mt-4">
                    {t('searchGroups', language)}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ClientGroups;
