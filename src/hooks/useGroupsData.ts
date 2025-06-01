
import { useLanguage } from '@/contexts/LanguageContext';

export const useGroupsData = () => {
  const { language } = useLanguage();
  
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

  return {
    activeGroups,
    groupInvitations,
    votingOptions,
  };
};
