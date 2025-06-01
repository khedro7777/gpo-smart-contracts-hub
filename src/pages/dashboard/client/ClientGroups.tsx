
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import VotingSystem from '@/components/voting/VotingSystem';
import AddFreelancer from '@/components/freelancers/AddFreelancer';
import ActiveGroupCard from '@/components/groups/ActiveGroupCard';
import GroupInvitations from '@/components/groups/GroupInvitations';
import DiscoverGroups from '@/components/groups/DiscoverGroups';
import GPOMachine from '@/components/GPOMachine';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/utils/translations';
import { useGroupsData } from '@/hooks/useGroupsData';

const ClientGroups = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('active');
  const { activeGroups, groupInvitations, votingOptions } = useGroupsData();
  
  const handleVote = (optionId: number) => {
    console.log(`Voted for option: ${optionId}`);
  };
  
  const handleInviteFreelancer = (freelancerId: number) => {
    console.log(`Invited freelancer: ${freelancerId}`);
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
                <ActiveGroupCard key={group.id} group={group} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="invitations">
            <GroupInvitations invitations={groupInvitations} />
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
            <DiscoverGroups />
          </TabsContent>
        </Tabs>
        
        <div className="mt-8">
          <GPOMachine />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClientGroups;
