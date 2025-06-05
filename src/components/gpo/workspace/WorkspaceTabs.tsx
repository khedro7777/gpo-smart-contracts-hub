
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslation } from 'react-i18next';
import { 
  Building2, 
  Scale, 
  FileText, 
  TrendingUp
} from 'lucide-react';
import RecentActivitiesList from './RecentActivitiesList';
import ActiveNegotiationsList from './ActiveNegotiationsList';

interface WorkspaceTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const WorkspaceTabs: React.FC<WorkspaceTabsProps> = ({ activeTab, setActiveTab }) => {
  const { i18n } = useTranslation();

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
      <div className="overflow-x-auto">
        <TabsList className="grid w-full grid-cols-5 min-w-max">
          <TabsTrigger value="overview" className="text-xs sm:text-sm px-2 sm:px-4">
            {i18n.language === 'ar' ? 'نظرة عامة' : 'Overview'}
          </TabsTrigger>
          <TabsTrigger value="negotiations" className="text-xs sm:text-sm px-2 sm:px-4">
            {i18n.language === 'ar' ? 'المفاوضات' : 'Negotiations'}
          </TabsTrigger>
          <TabsTrigger value="contracts" className="text-xs sm:text-sm px-2 sm:px-4">
            {i18n.language === 'ar' ? 'العقود' : 'Contracts'}
          </TabsTrigger>
          <TabsTrigger value="arbitration" className="text-xs sm:text-sm px-2 sm:px-4">
            {i18n.language === 'ar' ? 'التحكيم' : 'Arbitration'}
          </TabsTrigger>
          <TabsTrigger value="analytics" className="text-xs sm:text-sm px-2 sm:px-4">
            {i18n.language === 'ar' ? 'التحليلات' : 'Analytics'}
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="overview" className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <RecentActivitiesList />
          <ActiveNegotiationsList />
        </div>
      </TabsContent>

      <TabsContent value="negotiations">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">{i18n.language === 'ar' ? 'المفاوضات النشطة' : 'Active Negotiations'}</CardTitle>
            <CardDescription className="text-sm sm:text-base">
              {i18n.language === 'ar' 
                ? 'إدارة المفاوضات التجارية الجارية واتفاقيات الشراء الجماعي'
                : 'Manage ongoing business negotiations and group purchasing agreements'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 sm:py-12">
              <Building2 className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-sm sm:text-base">
                {i18n.language === 'ar' 
                  ? 'واجهة المفاوضات المتقدمة قريباً'
                  : 'Advanced negotiation interface coming soon'
                }
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="contracts">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">{i18n.language === 'ar' ? 'العقود الذكية' : 'Smart Contracts'}</CardTitle>
            <CardDescription className="text-sm sm:text-base">
              {i18n.language === 'ar' 
                ? 'عقود موثقة بـ IPFS مع حقول قابلة للتحرير والتحكم في الإصدارات'
                : 'IPFS-notarized contracts with editable fields and version control'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 sm:py-12">
              <FileText className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-sm sm:text-base">
                {i18n.language === 'ar' 
                  ? 'نظام إدارة العقود قيد التطوير'
                  : 'Contract management system in development'
                }
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="arbitration">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">{i18n.language === 'ar' ? 'تحكيم ORDA' : 'ORDA Arbitration'}</CardTitle>
            <CardDescription className="text-sm sm:text-base">
              {i18n.language === 'ar' 
                ? 'نظام حل النزاعات والتحكيم المتوافق مع منظمة التجارة العالمية'
                : 'WTO-compliant dispute resolution and arbitration system'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 sm:py-12">
              <Scale className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-sm sm:text-base">
                {i18n.language === 'ar' 
                  ? 'واجهة لجنة التحكيم قيد الإنشاء'
                  : 'Arbitration panel interface under construction'
                }
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="analytics">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">{i18n.language === 'ar' ? 'تحليلات الأعمال' : 'Business Analytics'}</CardTitle>
            <CardDescription className="text-sm sm:text-base">
              {i18n.language === 'ar' 
                ? 'لوحة تحليلات مبنية على منهجية كلية هارفارد لإدارة الأعمال'
                : 'Harvard Business School methodology-based analytics dashboard'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 sm:py-12">
              <TrendingUp className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-sm sm:text-base">
                {i18n.language === 'ar' 
                  ? 'لوحة التحليلات المتقدمة ستُطلق قريباً'
                  : 'Advanced analytics dashboard launching soon'
                }
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default WorkspaceTabs;
