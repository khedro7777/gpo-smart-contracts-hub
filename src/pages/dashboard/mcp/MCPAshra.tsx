
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';
import { Code, Bug, Zap, FileCode } from 'lucide-react';

const MCPAshra = () => {
  const { language } = useLanguage();

  const analysisFeatures = [
    {
      icon: <Code className="h-6 w-6" />,
      title: language === 'en' ? 'Code Review' : 'مراجعة الكود',
      description: language === 'en' ? 'Comprehensive code analysis' : 'تحليل شامل للكود'
    },
    {
      icon: <Bug className="h-6 w-6" />,
      title: language === 'en' ? 'Bug Detection' : 'اكتشاف الأخطاء',
      description: language === 'en' ? 'Find bugs and vulnerabilities' : 'العثور على الأخطاء والثغرات'
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: language === 'en' ? 'Performance' : 'الأداء',
      description: language === 'en' ? 'Optimize code performance' : 'تحسين أداء الكود'
    },
    {
      icon: <FileCode className="h-6 w-6" />,
      title: language === 'en' ? 'Documentation' : 'التوثيق',
      description: language === 'en' ? 'Generate code documentation' : 'إنتاج توثيق الكود'
    }
  ];

  return (
    <DashboardLayout role="client">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {language === 'en' ? 'Code Analysis (Ashra)' : 'تحليل الكود (عشرة)'}
            </h1>
            <p className="text-muted-foreground">
              {language === 'en' 
                ? 'Advanced code analysis and optimization tools'
                : 'أدوات تحليل وتحسين الكود المتقدمة'
              }
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'en' ? 'Code Input' : 'إدخال الكود'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Textarea 
                placeholder={language === 'en' ? 'Paste your code here for analysis...' : 'الصق الكود هنا للتحليل...'}
                className="min-h-[200px] font-mono"
              />
              <Button className="w-full">
                <Code className="h-4 w-4 mr-2" />
                {language === 'en' ? 'Analyze Code' : 'تحليل الكود'}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {analysisFeatures.map((feature, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <div className="flex justify-center text-teal-600 mb-2">
                  {feature.icon}
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  {language === 'en' ? 'Start Analysis' : 'بدء التحليل'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'en' ? 'Analysis Results' : 'نتائج التحليل'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center py-8">
              {language === 'en' 
                ? 'No code analyzed yet. Submit code for analysis above.'
                : 'لم يتم تحليل كود بعد. أرسل الكود للتحليل أعلاه.'
              }
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MCPAshra;
