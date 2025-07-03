
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { BarChart3, PieChart, LineChart, Activity } from 'lucide-react';

const MCPChartServer = () => {
  const { language } = useLanguage();

  const chartTypes = [
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: language === 'en' ? 'Bar Charts' : 'الرسوم البيانية الشريطية',
      description: language === 'en' ? 'Create professional bar charts' : 'إنشاء رسوم بيانية شريطية احترافية'
    },
    {
      icon: <PieChart className="h-8 w-8" />,
      title: language === 'en' ? 'Pie Charts' : 'الرسوم الدائرية',
      description: language === 'en' ? 'Generate pie and donut charts' : 'إنشاء رسوم دائرية ومخططات دائرية'
    },
    {
      icon: <LineChart className="h-8 w-8" />,
      title: language === 'en' ? 'Line Charts' : 'الرسوم الخطية',
      description: language === 'en' ? 'Build trend and time series charts' : 'بناء رسوم الاتجاهات والسلاسل الزمنية'
    },
    {
      icon: <Activity className="h-8 w-8" />,
      title: language === 'en' ? 'Advanced Charts' : 'الرسوم المتقدمة',
      description: language === 'en' ? 'Complex data visualizations' : 'تصورات البيانات المعقدة'
    }
  ];

  return (
    <DashboardLayout role="client">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {language === 'en' ? 'Chart Generator' : 'منشئ الرسوم البيانية'}
            </h1>
            <p className="text-muted-foreground">
              {language === 'en' 
                ? 'Create professional charts and data visualizations'
                : 'إنشاء رسوم بيانية احترافية وتصورات البيانات'
              }
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {chartTypes.map((chart, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <div className="flex justify-center text-blue-600 mb-2">
                  {chart.icon}
                </div>
                <CardTitle className="text-lg">{chart.title}</CardTitle>
                <CardDescription>{chart.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  {language === 'en' ? 'Create Chart' : 'إنشاء رسم بياني'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'en' ? 'Recent Charts' : 'الرسوم البيانية الأخيرة'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center py-8">
              {language === 'en' 
                ? 'No charts created yet. Start by creating your first chart above.'
                : 'لم يتم إنشاء رسوم بيانية بعد. ابدأ بإنشاء أول رسم بياني أعلاه.'
              }
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MCPChartServer;
