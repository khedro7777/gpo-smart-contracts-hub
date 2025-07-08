
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import PortalCard from '@/components/portals/PortalCard';
import { portals } from '@/config/portals';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PortalsOverview = () => {
  const { language } = useLanguage();

  // Mock stats for demonstration
  const portalStats = {
    'cooperative-purchasing': { activeUsers: 1250, totalTransactions: 3400 },
    'cooperative-marketing': { activeUsers: 980, totalTransactions: 2100 },
    'company-formation': { activeUsers: 450, totalTransactions: 1200 },
    'investment-groups': { activeUsers: 320, totalTransactions: 850 },
    'suppliers': { activeUsers: 2100, totalTransactions: 5600 },
    'freelancers': { activeUsers: 1800, totalTransactions: 4200 },
    'freelancer-groups': { activeUsers: 650, totalTransactions: 1100 },
    'service-providers': { activeUsers: 890, totalTransactions: 2300 },
    'product-listings': { activeUsers: 3200, totalTransactions: 8900 },
    'arbitration-documentation': { activeUsers: 280, totalTransactions: 450 },
    'arbitration-requests': { activeUsers: 180, totalTransactions: 320 },
    'smart-negotiation': { activeUsers: 560, totalTransactions: 890 }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {language === 'ar' ? 'بوابات المنصة' : 'Platform Portals'}
          </h1>
          <p className="text-gray-600">
            {language === 'ar' 
              ? 'نظرة شاملة على جميع بوابات المنصة وإحصائياتها'
              : 'Comprehensive overview of all platform portals and their statistics'
            }
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {language === 'ar' ? 'إجمالي البوابات' : 'Total Portals'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{portals.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {language === 'ar' ? 'البوابات النشطة' : 'Active Portals'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {portals.filter(p => p.isActive).length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {language === 'ar' ? 'إجمالي المستخدمين' : 'Total Users'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Object.values(portalStats).reduce((sum, stats) => sum + stats.activeUsers, 0).toLocaleString()}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {language === 'ar' ? 'إجمالي المعاملات' : 'Total Transactions'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Object.values(portalStats).reduce((sum, stats) => sum + stats.totalTransactions, 0).toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Portal Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {portals.map((portal) => (
            <PortalCard 
              key={portal.id} 
              portal={portal}
              stats={portalStats[portal.id as keyof typeof portalStats]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortalsOverview;
