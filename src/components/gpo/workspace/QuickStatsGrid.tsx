
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { 
  Users, 
  FileText, 
  TrendingUp,
  Shield
} from 'lucide-react';

interface QuickStatsGridProps {
  activeGroups: number;
  totalContracts: number;
  monthlyVolume: number;
  successRate: number;
}

const QuickStatsGrid: React.FC<QuickStatsGridProps> = ({
  activeGroups,
  totalContracts,
  monthlyVolume,
  successRate
}) => {
  const { i18n } = useTranslation();

  const quickStats = [
    {
      title: i18n.language === 'ar' ? 'المجموعات النشطة' : 'Active Groups',
      value: activeGroups,
      icon: <Users className="h-4 w-4 sm:h-5 sm:w-5" />,
      trend: '+12%',
      color: 'bg-blue-500'
    },
    {
      title: i18n.language === 'ar' ? 'العقود الذكية' : 'Smart Contracts',
      value: totalContracts,
      icon: <FileText className="h-4 w-4 sm:h-5 sm:w-5" />,
      trend: '+8%',
      color: 'bg-green-500'
    },
    {
      title: i18n.language === 'ar' ? 'الحجم الشهري' : 'Monthly Volume',
      value: `$${(monthlyVolume / 1000000).toFixed(1)}M`,
      icon: <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />,
      trend: '+23%',
      color: 'bg-purple-500'
    },
    {
      title: i18n.language === 'ar' ? 'معدل النجاح' : 'Success Rate',
      value: `${successRate}%`,
      icon: <Shield className="h-4 w-4 sm:h-5 sm:w-5" />,
      trend: '+2%',
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
      {quickStats.map((stat, index) => (
        <Card key={index} className="relative overflow-hidden">
          <CardContent className="p-3 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">{stat.title}</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs sm:text-sm text-green-600 font-medium">{stat.trend}</p>
              </div>
              <div className={`p-2 sm:p-3 rounded-full ${stat.color} text-white flex-shrink-0`}>
                {stat.icon}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default QuickStatsGrid;
