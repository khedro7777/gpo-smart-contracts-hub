
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import MCPDashboard from '@/components/mcp/MCPDashboard';
import PredictiveAnalytics from '@/components/advanced/PredictiveAnalytics';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';

const AIInsights = () => {
  const { language } = useLanguage();
  
  return (
    <DashboardLayout role="client">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {language === 'en' ? 'AI-Powered Business Intelligence' : 'ذكاء الأعمال المدعوم بالذكاء الاصطناعي'}
          </h1>
          <p className="text-xl text-gray-600">
            {language === 'en' 
              ? 'Advanced analytics and intelligent insights for optimal decision making'
              : 'تحليلات متقدمة ورؤى ذكية لاتخاذ قرارات مثلى'
            }
          </p>
        </div>

        <Tabs defaultValue="insights" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="insights">
              {language === 'en' ? 'AI Insights' : 'رؤى الذكاء الاصطناعي'}
            </TabsTrigger>
            <TabsTrigger value="analytics">
              {language === 'en' ? 'Predictive Analytics' : 'التحليلات التنبؤية'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="insights">
            <MCPDashboard />
          </TabsContent>

          <TabsContent value="analytics">
            <PredictiveAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AIInsights;
