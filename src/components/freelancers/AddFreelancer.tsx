
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/utils/translations';

interface Freelancer {
  id: number;
  name: string;
  expertise: string;
  rating: number;
}

interface AddFreelancerProps {
  groupId?: number;
  onInvite?: (freelancerId: number) => void;
}

const AddFreelancer: React.FC<AddFreelancerProps> = ({ groupId, onInvite }) => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data for freelancers
  const freelancers: Freelancer[] = [
    {
      id: 1,
      name: language === 'en' ? 'Ahmed Hassan' : 'أحمد حسن',
      expertise: language === 'en' ? 'Contract Specialist' : 'متخصص عقود',
      rating: 4.8,
    },
    {
      id: 2,
      name: language === 'en' ? 'Fatima Ali' : 'فاطمة علي',
      expertise: language === 'en' ? 'Translation Expert' : 'خبير ترجمة',
      rating: 4.9,
    },
    {
      id: 3,
      name: language === 'en' ? 'Mohammed Khalid' : 'محمد خالد',
      expertise: language === 'en' ? 'Legal Consultant' : 'مستشار قانوني',
      rating: 4.7,
    },
    {
      id: 4,
      name: language === 'en' ? 'Sarah Omar' : 'سارة عمر',
      expertise: language === 'en' ? 'Document Reviewer' : 'مراجع وثائق',
      rating: 4.5,
    },
  ];
  
  const filteredFreelancers = searchTerm
    ? freelancers.filter(freelancer => 
        freelancer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        freelancer.expertise.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : freelancers;
  
  const handleInvite = (freelancerId: number) => {
    if (onInvite) {
      onInvite(freelancerId);
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{t('addFreelancer', language)}</CardTitle>
        <CardDescription>
          {t('addFreelancerDesc', language) || (language === 'en' 
            ? 'Invite freelancers to join your group and contribute to your projects' 
            : 'دعوة مستقلين للانضمام إلى مجموعتك والمساهمة في مشاريعك')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative">
            <Input
              placeholder={language === 'en' ? 'Search by name or expertise...' : 'البحث بالاسم أو المهارة...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search text-gray-400"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            </div>
          </div>
          
          <div className="space-y-3">
            {filteredFreelancers.map(freelancer => (
              <div key={freelancer.id} className="border rounded-md p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{freelancer.name}</h3>
                  <p className="text-sm text-gray-500">{freelancer.expertise}</p>
                  <div className="flex items-center mt-1">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i} 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="14" 
                          height="14" 
                          viewBox="0 0 24 24" 
                          fill={i < Math.floor(freelancer.rating) ? "currentColor" : "none"} 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          className="lucide lucide-star"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs ml-1">{freelancer.rating}/5</span>
                  </div>
                </div>
                <Button size="sm" onClick={() => handleInvite(freelancer.id)}>
                  {t('invite', language) || (language === 'en' ? 'Invite' : 'دعوة')}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-gray-500">
          {language === 'en' 
            ? `Showing ${filteredFreelancers.length} of ${freelancers.length} freelancers` 
            : `عرض ${filteredFreelancers.length} من ${freelancers.length} مستقل`}
        </div>
        <Button variant="outline">
          {language === 'en' ? 'View All Freelancers' : 'عرض جميع المستقلين'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddFreelancer;
