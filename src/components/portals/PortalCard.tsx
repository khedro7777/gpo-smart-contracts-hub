
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Portal } from '@/types/portals';
import { Link } from 'react-router-dom';

interface PortalCardProps {
  portal: Portal;
  stats?: {
    activeUsers: number;
    totalTransactions: number;
  };
}

const PortalCard: React.FC<PortalCardProps> = ({ portal, stats }) => {
  const { language } = useLanguage();

  return (
    <Card className={`border-l-4 ${portal.color} hover:shadow-lg transition-shadow`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{portal.icon}</span>
            <div>
              <CardTitle className="text-lg">
                {language === 'ar' ? portal.nameAr : portal.name}
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                {language === 'ar' ? portal.descriptionAr : portal.description}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <Badge variant={portal.isActive ? "default" : "secondary"}>
              {portal.isActive 
                ? (language === 'ar' ? 'نشط' : 'Active')
                : (language === 'ar' ? 'غير نشط' : 'Inactive')
              }
            </Badge>
            {portal.requiresKyc && (
              <Badge variant="outline" className="text-orange-600 text-xs">
                {language === 'ar' ? 'يتطلب KYC' : 'KYC Required'}
              </Badge>
            )}
            {portal.requiresPoints && (
              <Badge variant="outline" className="text-blue-600 text-xs">
                {portal.minimumPoints} {language === 'ar' ? 'نقطة' : 'Points'}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {stats && (
              <div>
                <span>{stats.activeUsers} {language === 'ar' ? 'مستخدم نشط' : 'Active Users'}</span>
                <span className="mx-2">•</span>
                <span>{stats.totalTransactions} {language === 'ar' ? 'معاملة' : 'Transactions'}</span>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <Link to={portal.route}>
              <Button size="sm">
                {language === 'ar' ? 'دخول' : 'Enter'}
              </Button>
            </Link>
            <Link to={`/dashboard/portal/${portal.id}`}>
              <Button size="sm" variant="outline">
                {language === 'ar' ? 'لوحة التحكم' : 'Dashboard'}
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortalCard;
