
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/utils/translations';

const SupplierRFQs = () => {
  const { language } = useLanguage();
  
  // Mock data for pending RFQs
  const pendingRFQs = [
    {
      id: 1,
      title: language === 'en' ? 'Office Equipment' : 'معدات مكتبية',
      group: language === 'en' ? 'Tech Startup Collective' : 'مجموعة الشركات الناشئة التقنية',
      received: language === 'en' ? '2 days ago' : 'منذ يومين',
      deadline: language === 'en' ? '5 days left' : 'باقي 5 أيام',
    },
    {
      id: 2,
      title: language === 'en' ? 'IT Hardware' : 'أجهزة تكنولوجيا المعلومات',
      group: language === 'en' ? 'Healthcare Procurement Alliance' : 'تحالف المشتريات الصحية',
      received: language === 'en' ? '3 days ago' : 'منذ 3 أيام',
      deadline: language === 'en' ? '4 days left' : 'باقي 4 أيام',
    },
  ];
  
  // Mock data for responded RFQs
  const respondedRFQs = [
    {
      id: 3,
      title: language === 'en' ? 'Software Licenses' : 'تراخيص البرمجيات',
      group: language === 'en' ? 'Educational Institutions Group' : 'مجموعة المؤسسات التعليمية',
      responded: language === 'en' ? '1 week ago' : 'منذ أسبوع',
      status: language === 'en' ? 'Under Review' : 'قيد المراجعة',
    },
    {
      id: 4,
      title: language === 'en' ? 'Cloud Services' : 'خدمات سحابية',
      group: language === 'en' ? 'Government Agencies Collective' : 'مجموعة الهيئات الحكومية',
      responded: language === 'en' ? '2 weeks ago' : 'منذ أسبوعين',
      status: language === 'en' ? 'Accepted' : 'مقبول',
    },
  ];
  
  return (
    <DashboardLayout role="supplier">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            {t('rfqs', language)}
          </h2>
        </div>
        
        <Tabs defaultValue="pending">
          <TabsList>
            <TabsTrigger value="pending">{t('pendingRFQs', language)}</TabsTrigger>
            <TabsTrigger value="responded">{t('respondedRFQs', language)}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>{t('pendingResponse', language)}</CardTitle>
                <CardDescription>
                  {t('rfqsNeedingResponse', language)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingRFQs.map((rfq) => (
                    <div key={rfq.id} className="border rounded-md p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">{rfq.title}</h3>
                          <p className="text-sm text-gray-500">{rfq.group}</p>
                        </div>
                        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                          {t('pendingResponse', language)}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <p className="text-sm text-gray-500">{rfq.received}</p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            {t('view', language)}
                          </Button>
                          <Button size="sm">
                            {t('respond', language)}
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-red-500 mt-2">{rfq.deadline}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="responded">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>{t('responded', language)}</CardTitle>
                <CardDescription>
                  {t('rfqsYouResponded', language)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {respondedRFQs.map((rfq) => (
                    <div key={rfq.id} className="border rounded-md p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">{rfq.title}</h3>
                          <p className="text-sm text-gray-500">{rfq.group}</p>
                        </div>
                        <Badge className={rfq.status === 'Accepted' || rfq.status === 'مقبول' ? 
                          "bg-green-100 text-green-800 hover:bg-green-200" : 
                          "bg-blue-100 text-blue-800 hover:bg-blue-200"}>
                          {rfq.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <p className="text-sm text-gray-500">{rfq.responded}</p>
                        <Button variant="outline" size="sm">
                          {t('viewDetails', language)}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SupplierRFQs;
