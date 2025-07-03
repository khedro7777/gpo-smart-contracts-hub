
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Video, Play, Film, Zap } from 'lucide-react';

const MCPManim = () => {
  const { language } = useLanguage();

  const videoTypes = [
    {
      icon: <Video className="h-6 w-6" />,
      title: language === 'en' ? 'Mathematical Videos' : 'فيديوهات رياضية',
      description: language === 'en' ? 'Create mathematical animations' : 'إنشاء رسوم متحركة رياضية'
    },
    {
      icon: <Film className="h-6 w-6" />,
      title: language === 'en' ? 'Educational Content' : 'محتوى تعليمي',
      description: language === 'en' ? 'Generate educational videos' : 'إنتاج فيديوهات تعليمية'
    },
    {
      icon: <Play className="h-6 w-6" />,
      title: language === 'en' ? 'Presentations' : 'العروض التقديمية',
      description: language === 'en' ? 'Create animated presentations' : 'إنشاء عروض تقديمية متحركة'
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: language === 'en' ? 'Code Visualization' : 'تصور الكود',
      description: language === 'en' ? 'Visualize programming concepts' : 'تصور مفاهيم البرمجة'
    }
  ];

  return (
    <DashboardLayout role="client">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {language === 'en' ? 'Video Generator (Manim)' : 'منشئ الفيديو (Manim)'}
            </h1>
            <p className="text-muted-foreground">
              {language === 'en' 
                ? 'Create educational and mathematical animations'
                : 'إنشاء رسوم متحركة تعليمية ورياضية'
              }
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {videoTypes.map((video, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <div className="flex justify-center text-red-600 mb-2">
                  {video.icon}
                </div>
                <CardTitle className="text-lg">{video.title}</CardTitle>
                <CardDescription>{video.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  {language === 'en' ? 'Create Video' : 'إنشاء فيديو'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'en' ? 'Recent Videos' : 'الفيديوهات الأخيرة'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center py-8">
              {language === 'en' 
                ? 'No videos created yet. Start by creating your first video above.'
                : 'لم يتم إنشاء فيديوهات بعد. ابدأ بإنشاء أول فيديو أعلاه.'
              }
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MCPManim;
