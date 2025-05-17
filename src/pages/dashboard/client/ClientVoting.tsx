
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import VotingSystem from '@/components/voting/VotingSystem';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/utils/translations';

const ClientVoting = () => {
  const { language } = useLanguage();
  
  // Mock data for votes
  const supplierVotingOptions = [
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
  
  const contractVotingOptions = [
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
  ];
  
  const freelancerVotingOptions = [
    {
      id: 1,
      text: language === 'en' ? 'Hire Ahmed Hassan for the translation work' : 'توظيف أحمد حسن للعمل في الترجمة',
      votes: 7,
    },
    {
      id: 2,
      text: language === 'en' ? 'Hire Sara Ali for the translation work' : 'توظيف سارة علي للعمل في الترجمة',
      votes: 4,
    },
    {
      id: 3,
      text: language === 'en' ? 'Look for more candidates' : 'البحث عن مرشحين آخرين',
      votes: 2,
    },
  ];
  
  const handleVote = (optionId: number) => {
    console.log(`Voted for option: ${optionId}`);
    // Implementation would update the vote count in a real application
  };
  
  return (
    <DashboardLayout role="client">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">
            {t('voteSystem', language)}
          </h2>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{t('activeVotes', language) || (language === 'en' ? 'Active Votes' : 'التصويتات النشطة')}</CardTitle>
            <CardDescription>
              {language === 'en' 
                ? 'Your vote is required on these important decisions'
                : 'تصويتك مطلوب على هذه القرارات المهمة'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <VotingSystem
                title={language === 'en' ? 'Vote on Supplier Selection' : 'التصويت على اختيار المورد'}
                description={language === 'en' ? 'Please vote on the supplier offer for the Office Equipment Purchase' : 'الرجاء التصويت على عرض المورد لشراء معدات المكاتب'}
                options={supplierVotingOptions}
                totalVotes={12}
                requiredVotes={10}
                endDate={language === 'en' ? 'May 20, 2025' : '20 مايو 2025'}
                isOpen={true}
                onVote={handleVote}
              />
              
              <VotingSystem
                title={language === 'en' ? 'Vote on Freelancer Selection' : 'التصويت على اختيار مستقل'}
                description={language === 'en' ? 'Select a freelancer for the document translation work' : 'اختر مستقلاً للعمل في ترجمة المستندات'}
                options={freelancerVotingOptions}
                totalVotes={13}
                requiredVotes={8}
                endDate={language === 'en' ? 'May 22, 2025' : '22 مايو 2025'}
                isOpen={true}
                onVote={handleVote}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>{t('pastVotes', language) || (language === 'en' ? 'Past Votes' : 'التصويتات السابقة')}</CardTitle>
            <CardDescription>
              {language === 'en' 
                ? 'History of previous voting decisions'
                : 'سجل قرارات التصويت السابقة'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <VotingSystem
                title={language === 'en' ? 'Vote on Contract Terms' : 'التصويت على شروط العقد'}
                options={contractVotingOptions}
                totalVotes={8}
                requiredVotes={6}
                endDate={language === 'en' ? 'May 15, 2025' : '15 مايو 2025'}
                isOpen={false}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ClientVoting;
