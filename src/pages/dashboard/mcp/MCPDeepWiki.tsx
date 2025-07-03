
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { BookOpen, Search, Brain, FileText } from 'lucide-react';

const MCPDeepWiki = () => {
  const { language } = useLanguage();

  const wikiFeatures = [
    {
      icon: <Search className="h-6 w-6" />,
      title: language === 'en' ? 'Knowledge Search' : 'البحث المعرفي',
      description: language === 'en' ? 'Deep search through knowledge bases' : 'البحث العميق في قواعد المعرفة'
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: language === 'en' ? 'AI Analysis' : 'التحليل الذكي',
      description: language === 'en' ? 'AI-powered content analysis' : 'تحليل المحتوى بالذكاء الاصطناعي'
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: language === 'en' ? 'Content Extraction' : 'استخراج المحتوى',
      description: language === 'en' ? 'Extract key information from articles' : 'استخراج المعلومات الرئيسية من المقالات'
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: language === 'en' ? 'Research Assistant' : 'مساعد البحث',
      description: language === 'en' ? 'Comprehensive research support' : 'دعم بحثي شامل'
    }
  ];

  return (
    <DashboardLayout role="client">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {language === 'en' ? 'Deep Wiki' : 'ويكي عميق'}
            </h1>
            <p className="text-muted-foreground">
              {language === 'en' 
                ? 'AI-powered knowledge extraction and research'
                : 'استخراج المعرفة والبحث بالذكاء الاصطناعي'
              }
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'en' ? 'Knowledge Search' : 'البحث المعرفي'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input 
                placeholder={language === 'en' ? 'Enter topic to research...' : 'أدخل الموضوع للبحث...'}
                className="flex-1"
              />
              <Button>
                <BookOpen className="h-4 w-4 mr-2" />
                {language === 'en' ? 'Research' : 'بحث'}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {wikiFeatures.map((feature, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <div className="flex justify-center text-indigo-600 mb-2">
                  {feature.icon}
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  {language === 'en' ? 'Explore' : 'استكشاف'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'en' ? 'Research History' : 'سجل البحث'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center py-8">
              {language === 'en' 
                ? 'No research conducted yet. Start exploring knowledge above.'
                : 'لم يتم إجراء بحث بعد. ابدأ استكشاف المعرفة أعلاه.'
              }
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MCPDeepWiki;
