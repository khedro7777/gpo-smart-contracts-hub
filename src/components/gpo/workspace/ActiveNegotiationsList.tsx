
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useTranslation } from 'react-i18next';
import { Vote } from 'lucide-react';

const ActiveNegotiationsList: React.FC = () => {
  const { i18n } = useTranslation();

  const activeNegotiations = [
    {
      id: 1,
      title: i18n.language === 'ar' ? 'شراء المعدات الصناعية' : 'Industrial Equipment Purchase',
      participants: 8,
      value: '$1.2M',
      progress: 75,
      deadline: '5 days',
      status: 'negotiating'
    },
    {
      id: 2,
      title: i18n.language === 'ar' ? 'ائتلاف ترخيص البرمجيات' : 'Software Licensing Coalition',
      participants: 15,
      value: '$850K',
      progress: 60,
      deadline: '8 days',
      status: 'voting'
    },
    {
      id: 3,
      title: i18n.language === 'ar' ? 'شبكة الخدمات الصحية' : 'Healthcare Services Network',
      participants: 6,
      value: '$2.1M',
      progress: 90,
      deadline: '2 days',
      status: 'final_review'
    }
  ];

  return (
    <Card>
      <CardHeader className="pb-3 sm:pb-4">
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <Vote className="h-4 w-4 sm:h-5 sm:w-5" />
          {i18n.language === 'ar' ? 'المفاوضات النشطة' : 'Active Negotiations'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 sm:space-y-4">
          {activeNegotiations.map((negotiation) => (
            <div key={negotiation.id} className="p-3 sm:p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900 text-sm sm:text-base truncate flex-1">{negotiation.title}</h4>
                <Badge variant="outline" className="text-xs ml-2 flex-shrink-0">{negotiation.status}</Badge>
              </div>
              <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600 mb-2">
                <span>{negotiation.participants} participants</span>
                <span>{negotiation.value}</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span>Progress</span>
                  <span>{negotiation.progress}%</span>
                </div>
                <Progress value={negotiation.progress} className="h-1 sm:h-2" />
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-2">
                Deadline: {negotiation.deadline}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActiveNegotiationsList;
